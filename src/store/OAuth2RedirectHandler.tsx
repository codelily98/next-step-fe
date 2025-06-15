import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore";

const OAuth2RedirectHandler: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // ✅ login 함수와 setKakaoLoginStatus 함수를 함께 가져옴
    const login = useAuthStore((state) => state.login);
    const setKakaoLoginStatus = useAuthStore(
        (state) => state.setKakaoLoginStatus
    );

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const accessToken = queryParams.get("accessToken");
        // ✅ 백엔드에서 username을 함께 넘겨주도록 하는 것이 좋습니다.
        const username = queryParams.get("username");
        const error = queryParams.get("error");

        if (accessToken) {
            console.log("OAuth2 로그인 성공! Access Token:", accessToken);
            // ✅ AuthStore의 login 함수를 사용하여 accessToken과 username 모두 저장
            // 백엔드에서 username이 오지 않는다면 '카카오 사용자' 등으로 기본값 설정
            login(accessToken, username || "카카오 사용자");
            // ✅ 카카오 로그인임을 명시적으로 설정
            setKakaoLoginStatus(true);

            navigate("/");
        } else if (error) {
            console.error("OAuth2 로그인 실패:", error);
            navigate(`/login?error=${encodeURIComponent(error)}`);
        } else {
            console.warn("OAuth2 리다이렉션에 토큰 또는 에러 정보가 없습니다.");
            navigate("/login?error=unknown_oauth2_error");
        }
    }, [location, navigate, login, setKakaoLoginStatus]); // ✅ 의존성 배열 업데이트

    return (
        <div>
            <p>소셜 로그인 처리 중입니다. 잠시만 기다려 주세요...</p>
        </div>
    );
};

export default OAuth2RedirectHandler;
