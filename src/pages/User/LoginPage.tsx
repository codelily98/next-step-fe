import React, { useState, useEffect } from "react";
import api from "../../api/index";
import useAuthStore from "../../store/AuthStore";
import { useNavigate, Link, useLocation } from "react-router-dom";
import styles from "../../css/pages/User/LoginPage.module.css";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();
    const location = useLocation();

    const API_BASE_URL =
        import.meta.env.VITE_APP_API_BASE_URL ||
        "https://api.portfolio-nextstep.info";

    // OAuth2 에러 메시지 처리 (기존 로직 유지)
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const oauthError = queryParams.get("error");

        if (oauthError) {
            setError(decodeURIComponent(oauthError));
        } else {
            if (!error) {
                setError(null);
            }
        }
    }, [location.search]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await api.post("/api/auth/login", {
                username,
                password,
            });
            const { accessToken } = response.data;

            login(accessToken, username);

            setTimeout(() => {
                setIsLoading(false);
                navigate("/");
            }, 1000);
        } catch (err: any) {
            console.error("로그인 실패:", err);
            if (err.response && err.response.status === 401) {
                setError("아이디 또는 비밀번호가 일치하지 않습니다.");
            } else if (
                err.response &&
                err.response.data &&
                err.response.data.message
            ) {
                setError(err.response.data.message);
            } else {
                setError("로그인 중 오류가 발생했습니다.");
            }
            setIsLoading(false);
        }
    };

    const handleKakaoLogin = () => {
        window.location.href = `${API_BASE_URL}/oauth2/authorization/kakao`;
    };

    // ✅ Link (a 태그) 클릭 이벤트 핸들러 추가
    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isLoading) {
            e.preventDefault(); // 로딩 중이면 링크 클릭 막기
        }
    };

    return (
        <div className={styles.container}>
            {isLoading && (
                <div className={styles["modal-overlay"]}>
                    <div className={styles["modal-content"]}>
                        <div className={styles.spinner}></div>
                        <p className={styles.p}>로그인 처리 중입니다.</p>
                        <p className={styles.p}>잠시만 기다려 주세요...</p>
                    </div>
                </div>
            )}

            <div className={styles.loginContainer}>
                <header className={styles.header}>
                    <Link className={styles.label} to="/">
                        <img
                            className={styles.logo}
                            src="./favicon.svg"
                            alt="logo"
                        />
                        <div className={styles.mainTitle}>
                            Next Step: CodeLily
                        </div>
                    </Link>
                </header>
                <form className={styles.formDiv} onSubmit={handleLogin}>
                    <div className={styles.formGroup}>
                        <label htmlFor="username">아이디:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">비밀번호:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isLoading}
                    >
                        로그인
                    </button>
                </form>
                <div className={styles.result}>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                </div>

                <div className={styles.linkBox}>
                    <p className={styles.linkText}>계정이 없으신가요? </p>
                    {/* ✅ Link 컴포넌트에 onClick과 className 추가 */}
                    <Link
                        to="/register"
                        className={`${styles.link} ${
                            isLoading ? styles.disabledLink : ""
                        }`}
                        onClick={handleLinkClick}
                    >
                        회원가입
                    </Link>
                </div>

                <div className={styles.kakaoLoginBox}>
                    <button
                        onClick={handleKakaoLogin}
                        className={styles.kakaoLoginButton}
                        disabled={isLoading}
                    >
                        카카오 로그인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
