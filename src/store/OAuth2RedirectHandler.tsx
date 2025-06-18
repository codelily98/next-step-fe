import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore";
import styles from "../css/store/OAuth2RedirectHandler.module.css";
import api from "../api";

const OAuth2RedirectHandler: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const setKakaoLoginStatus = useAuthStore(
        (state) => state.setKakaoLoginStatus
    );
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const accessToken = queryParams.get("accessToken");
        const usernameFromQuery = queryParams.get("username");
        const error = queryParams.get("error");

        if (accessToken) {
            console.log("✅ OAuth2 로그인 성공 - AccessToken:", accessToken);

            const fetchUserInfo = async () => {
                try {
                    const res = await api.get("/api/user/me", {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });

                    const { username, nickname, profileImageUrl } = res.data;

                    login(
                        accessToken,
                        { username, nickname, profileImageUrl },
                        true
                    );
                    setKakaoLoginStatus(true);
                    navigate("/");
                } catch (err) {
                    console.warn(
                        "⚠️ 사용자 정보 조회 실패. fallback으로 username 사용"
                    );

                    if (usernameFromQuery) {
                        login(
                            accessToken,
                            { username: usernameFromQuery },
                            true
                        );
                        setKakaoLoginStatus(true);
                        navigate("/");
                    } else {
                        console.error(
                            "❌ 사용자 정보 및 fallback 모두 실패",
                            err
                        );
                        navigate("/login?error=user_info_fetch_failed");
                    }
                } finally {
                    setIsLoading(false);
                }
            };

            fetchUserInfo();
        } else if (error) {
            console.error("❌ OAuth2 로그인 실패:", error);
            setIsLoading(false);
            navigate(`/login?error=${encodeURIComponent(error)}`);
        } else {
            console.warn("⚠️ 리다이렉트 파라미터 없음");
            setIsLoading(false);
            navigate("/login?error=unknown_oauth2_error");
        }
    }, [location, navigate, login, setKakaoLoginStatus]);

    return isLoading ? (
        <div className={styles["modal-overlay"]}>
            <div className={styles["modal-content"]}>
                <div className={styles.spinner}></div>
                <p className={styles.p}>소셜 로그인 처리 중입니다.</p>
                <p className={styles.p}>잠시만 기다려 주세요...</p>
            </div>
        </div>
    ) : null;
};

export default OAuth2RedirectHandler;
