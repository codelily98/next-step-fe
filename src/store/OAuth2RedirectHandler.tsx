// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import useAuthStore from "../store/AuthStore";
// import styles from "../css/store/OAuth2RedirectHandler.module.css";

// const OAuth2RedirectHandler: React.FC = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const login = useAuthStore((state) => state.login);
//     const setKakaoLoginStatus = useAuthStore(
//         (state) => state.setKakaoLoginStatus
//     );

//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const queryParams = new URLSearchParams(location.search);
//         const accessToken = queryParams.get("accessToken");
//         const username = queryParams.get("username");
//         const error = queryParams.get("error");

//         if (accessToken) {
//             console.log("OAuth2 로그인 성공! Access Token:", accessToken);

//             const timer = setTimeout(() => {
//                 login(accessToken, username || "카카오 사용자");
//                 setKakaoLoginStatus(true);
//                 setIsLoading(false);
//                 navigate("/");
//             }, 1000);

//             return () => clearTimeout(timer);
//         } else if (error) {
//             console.error("OAuth2 로그인 실패:", error);
//             setIsLoading(false);
//             navigate(`/login?error=${encodeURIComponent(error)}`);
//         } else {
//             console.warn("OAuth2 리다이렉션에 토큰 또는 에러 정보가 없습니다.");
//             setIsLoading(false);
//             navigate("/login?error=unknown_oauth2_error");
//         }
//     }, [location, navigate, login, setKakaoLoginStatus]);

//     return (
//         <>
//             {isLoading && (
//                 // ⭐ 클래스 이름 적용 방식 변경: styles.클래스이름
//                 <div className={styles["modal-overlay"]}>
//                     {" "}
//                     {/* 하이픈이 있을 경우 대괄호 표기법 사용 */}
//                     <div className={styles["modal-content"]}>
//                         <div className={styles.spinner}></div>{" "}
//                         {/* 하이픈이 없을 경우 점 표기법 사용 가능 */}
//                         <p className={styles.p}>소셜 로그인 처리 중입니다.</p>
//                         <p className={styles.p}>잠시만 기다려 주세요...</p>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default OAuth2RedirectHandler;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore";
import styles from "../css/store/OAuth2RedirectHandler.module.css";

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
        const error = queryParams.get("error");

        if (accessToken) {
            console.log("OAuth2 로그인 성공! Access Token:", accessToken);

            const fetchUserInfo = async () => {
                try {
                    const res = await fetch("/api/user/me", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });

                    if (!res.ok) throw new Error("Failed to fetch user info");
                    const data = await res.json();

                    login(accessToken, {
                        username: data.username,
                        nickname: data.nickname,
                        profileImageUrl: data.profileImageUrl,
                    });
                    setKakaoLoginStatus(true);
                    navigate("/");
                } catch (err) {
                    console.error("유저 정보 요청 실패", err);
                    navigate("/login?error=user_info_fetch_failed");
                } finally {
                    setIsLoading(false);
                }
            };

            fetchUserInfo();
        } else if (error) {
            console.error("OAuth2 로그인 실패:", error);
            setIsLoading(false);
            navigate(`/login?error=${encodeURIComponent(error)}`);
        } else {
            console.warn("OAuth2 리다이렉션에 토큰 또는 에러 정보가 없습니다.");
            setIsLoading(false);
            navigate("/login?error=unknown_oauth2_error");
        }
    }, [location, navigate, login, setKakaoLoginStatus]);

    return (
        <>
            {isLoading && (
                <div className={styles["modal-overlay"]}>
                    <div className={styles["modal-content"]}>
                        <div className={styles.spinner}></div>
                        <p className={styles.p}>소셜 로그인 처리 중입니다.</p>
                        <p className={styles.p}>잠시만 기다려 주세요...</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default OAuth2RedirectHandler;
