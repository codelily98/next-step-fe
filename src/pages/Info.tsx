import { useEffect } from "react";
import styles from "../css/pages/Info.module.css";
import useAuthStore from "../store/AuthStore";
import { useNavigate } from "react-router-dom";

const Info = () => {
    // AuthStore에서 필요한 상태들을 가져옵니다.
    const { isAuthenticated, user, accessToken } = useAuthStore();
    const username = user?.username; // user가 null일 경우를 대비하여 옵셔널 체이닝 사용

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            alert("로그인이 필요한 서비스입니다.");
            navigate("/login");
        }

        window.scrollTo(0, 0);
    });

    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>
                <span className={styles.strong}>{username}</span>님
            </h1>

            {/* ⭐ 토큰 값 표시 ⭐ */}
            {isAuthenticated && ( // 로그인 상태일 때만 토큰 표시
                <div className={styles.tokenInfo}>
                    <p className={styles.tokenTitle}>
                        성공적으로 Token이 발급되었습니다.
                    </p>
                    <p className={styles.p}>
                        <strong className={styles.strong}>Access Token:</strong>{" "}
                        <span className={styles.tokenValue}>
                            {accessToken || "없음"}
                        </span>
                    </p>
                    <p className={styles.p}>
                        <strong className={styles.strong}>
                            Refresh Token:
                        </strong>{" "}
                        <span className={styles.tokenValue}>
                            {"서버에서 Cookie로 발급"}
                        </span>
                    </p>
                    {/* 필요하다면 토큰 디코딩 값도 표시 가능 */}
                </div>
            )}
        </div>
    );
};

export default Info;
