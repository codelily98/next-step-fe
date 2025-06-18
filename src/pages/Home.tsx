import { useEffect } from "react";
import styles from "../css/pages/Home.module.css";
import useAuthStore from "../store/AuthStore";

const Home = () => {
    // AuthStore에서 필요한 상태들을 가져옵니다.
    const { isAuthenticated, user } = useAuthStore();
    const username = user?.username; // user가 null일 경우를 대비하여 옵셔널 체이닝 사용

    useEffect(() => {
        // About 페이지 진입 시
        document.body.style.backgroundColor = "#111";

        // 페이지를 벗어날 때 배경 초기화 (원래 색으로 되돌리기)
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.label}>
                    <img
                        className={styles.logo}
                        src="./favicon.svg"
                        alt="logo"
                    />
                    <div className={styles.title}>Next Step: CodeLily</div>
                </div>
            </header>

            {/* ⭐ 로그인 상태에 따라 다른 환영 메시지 표시 ⭐ */}
            <h1 className={styles.h1}>
                {isAuthenticated && username ? (
                    <>
                        <span className={styles.strong}>{username}</span>님,
                        환영합니다!
                    </>
                ) : (
                    <>Next Step: CodeLily에 오신 것을 환영합니다!</>
                )}
            </h1>

            <p className={styles.p}>
                이 사이트는{" "}
                <strong className={styles.strong}>웹 개발자 CodeLily</strong>의
                포트폴리오 페이지입니다.
            </p>
            <p className={styles.p}>
                우선 <strong className={styles.strong}>소개</strong>{" "}
                페이지에서는,{" "}
                <strong className={styles.strong}>기술 스택</strong>,{" "}
                <strong className={styles.strong}>자격증</strong> 등 다양한
                정보를 한눈에 확인하실 수 있습니다.{" "}
                <strong className={styles.strong}>프로젝트</strong> 페이지에서는
                다양한 <strong className={styles.strong}>프로젝트</strong>를
                확인하실 수 있으며, 해당 프로젝트를 클릭시에 상세정보를 확인할
                수 있습니다.
            </p>

            <p className={styles.p}>
                전체 사이트는{" "}
                <strong className={styles.strong}>React + TypeScript</strong>로
                개발되었으며,{" "}
                <strong className={styles.strong}>Spring Boot</strong> 백엔드와{" "}
                <strong className={styles.strong}>JWT 인증</strong>,{" "}
                <strong className={styles.strong}>OAuth 2.0 로그인</strong>,{" "}
                <strong className={styles.strong}>Redis</strong>,{" "}
                <strong className={styles.strong}>Docker</strong> 등을 사용하여
                실무 수준의 구성을 갖추었습니다.
            </p>

            <p className={styles.p}>
                이 페이지는 <strong className={styles.strong}>GCP</strong>에
                배포되어 있으며,{" "}
                <strong className={styles.strong}>CI/CD 파이프라인</strong>을
                통해 자동 배포됩니다.
            </p>
        </div>
    );
};

export default Home;
