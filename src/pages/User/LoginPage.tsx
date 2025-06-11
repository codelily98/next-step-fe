// src/pages/LoginPage.tsx
import React, { useState } from "react";
import api from "../../api/index";
import useAuthStore from "../../store/AuthStore";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css"; // CSS 모듈 임포트

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await api.post("/auth/login", {
                username,
                password,
            });
            const { accessToken, refreshToken } = response.data;
            console.log("로그인 성공:", response.data);

            login(accessToken, refreshToken, username);

            navigate("/");
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
        }
    };

    return (
        <div className={styles.loginContainer}>
            {" "}
            {/* 클래스 이름 적용 */}
            <h2 className={styles.title}>로그인</h2> {/* 클래스 이름 적용 */}
            <form onSubmit={handleLogin}>
                <div className={styles.formGroup}>
                    {" "}
                    {/* 클래스 이름 적용 */}
                    <label htmlFor="username">아이디:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    {" "}
                    {/* 클래스 이름 적용 */}
                    <label htmlFor="password">비밀번호:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.submitButton}>
                    로그인
                </button>{" "}
                {/* 클래스 이름 적용 */}
            </form>
            {error && <p className={styles.errorMessage}>{error}</p>}{" "}
            {/* 클래스 이름 적용 */}
            <p>
                계정이 없으신가요?{" "}
                <a href="/register" className={styles.link}>
                    회원가입
                </a>{" "}
                {/* 클래스 이름 적용 */}
            </p>
        </div>
    );
};

export default LoginPage;
