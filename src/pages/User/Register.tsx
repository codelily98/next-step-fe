// src/pages/RegisterPage.tsx
import React, { useState } from "react";
import api from "../../api/index";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css"; // CSS 모듈 임포트

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await api.post("/auth/register", {
                username,
                password,
            });
            console.log("회원가입 성공:", response.data);
            setSuccess("회원가입에 성공했습니다! 로그인 페이지로 이동합니다.");
            setUsername("");
            setPassword("");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err: any) {
            console.error("회원가입 실패:", err);
            if (
                err.response &&
                err.response.data &&
                err.response.data.message
            ) {
                setError(err.response.data.message);
            } else if (err.response && err.response.status === 400) {
                setError("이미 존재하는 사용자 이름입니다.");
            } else {
                setError("회원가입 중 오류가 발생했습니다.");
            }
        }
    };

    return (
        <div className={styles.registerContainer}>
            {" "}
            {/* 클래스 이름 적용 */}
            <h2 className={styles.title}>회원가입</h2> {/* 클래스 이름 적용 */}
            <form onSubmit={handleRegister}>
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
                    회원가입
                </button>{" "}
                {/* 클래스 이름 적용 */}
            </form>
            {error && <p className={styles.errorMessage}>{error}</p>}{" "}
            {/* 클래스 이름 적용 */}
            {success && <p className={styles.successMessage}>{success}</p>}{" "}
            {/* 클래스 이름 적용 */}
            <p>
                이미 계정이 있으신가요?{" "}
                <a href="/login" className={styles.link}>
                    로그인
                </a>{" "}
                {/* 클래스 이름 적용 */}
            </p>
        </div>
    );
};

export default RegisterPage;
