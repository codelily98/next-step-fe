// src/pages/OAuth2RedirectHandler.tsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore"; // AuthStore 경로 확인

const OAuth2RedirectHandler: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const setAccessToken = useAuthStore((state) => state.setAccessToken); // AccessToken만 설정하는 함수 사용

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const accessToken = queryParams.get("accessToken");
        const error = queryParams.get("error"); // 실패 시 에러 메시지 처리

        if (accessToken) {
            console.log("OAuth2 로그인 성공! Access Token:", accessToken);
            setAccessToken(accessToken); // Zustand 스토어에 Access Token 저장 및 인증 상태 true로 변경
            localStorage.setItem("accessToken", accessToken); // Axios 인터셉터용 로컬 스토리지에도 저장

            // 백엔드에서 사용자 이름까지 넘겨준다면 이곳에서 login 함수 호출 가능
            // 예: const username = queryParams.get("username");
            // login(accessToken, username || '카카오 사용자');

            // Access Token을 받았으므로 메인 페이지 등으로 리다이렉트
            navigate("/");
        } else if (error) {
            console.error("OAuth2 로그인 실패:", error);
            // 에러 메시지와 함께 로그인 페이지로 리다이렉트
            navigate(`/login?error=${encodeURIComponent(error)}`);
        } else {
            console.warn("OAuth2 리다이렉션에 토큰 또는 에러 정보가 없습니다.");
            navigate("/login?error=unknown_oauth2_error");
        }
    }, [location, navigate, setAccessToken]); // 의존성 배열에 setAccessToken 추가

    return (
        <div>
            <p>소셜 로그인 처리 중입니다. 잠시만 기다려 주세요...</p>
        </div>
    );
};

export default OAuth2RedirectHandler;
