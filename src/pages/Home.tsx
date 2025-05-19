import { useEffect } from "react";
import styles from "../css/pages/Home.module.css";

const Home = () => {
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
            <h1 className={styles.h1}>방문을 환영합니다!</h1>
            <p className={styles.p}>
                이 사이트는 웹 개발자로서의 저를 소개하는 포트폴리오
                페이지입니다.
            </p>
            <p className={styles.p}>
                포트폴리오는 <strong className={styles.strong}>홈</strong>,{" "}
                <strong className={styles.strong}>소개</strong>,
                <strong className={styles.strong}> 프로젝트</strong>의 세 가지
                메뉴로 구성되어 있으며, 각 페이지는{" "}
                <strong className={styles.strong}>반응형 웹</strong>
                으로 제작되어 다양한 디바이스에서 편리하게 확인하실 수 있습니다.
            </p>
            <p className={styles.p}>
                전체 사이트는{" "}
                <strong className={styles.strong}>React + TypeScript</strong>{" "}
                기반으로 개발되었으며,{" "}
                <strong className={styles.strong}>Vite</strong>를 통해 빠르게
                빌드되도록 구성하였습니다. 또한{" "}
                <strong className={styles.strong}>SCSS 모듈 방식</strong>을
                활용하여 컴포넌트별로 스타일을 분리하고, 유지보수성을
                높였습니다.
            </p>
            <p className={styles.p}>
                클라이언트의 전역 상태 관리는{" "}
                <strong className={styles.strong}>Zustand</strong>를 사용하여
                가볍고 직관적인 방식으로 구성했으며,{" "}
                <strong className={styles.strong}>persist 미들웨어</strong>를
                활용해 인증 및 프로젝트 상태를{" "}
                <strong className={styles.strong}>localStorage</strong>에
                유지하도록 처리하였습니다.
            </p>
            <p className={styles.p}>
                백엔드 구현에는{" "}
                <strong className={styles.strong}>Spring Boot</strong>를
                사용하고 있으며,
                <strong className={styles.strong}> JWT(Json Web Token)</strong>
                을 이용한 사용자 인증을 처리하며,{" "}
                <strong className={styles.strong}>카카오</strong> 및{" "}
                <strong>구글</strong> 소셜 로그인을 위한{" "}
                <strong className={styles.strong}>OAuth 2.0</strong> 인증 방식도
                함께 적용하고 있습니다.
            </p>
            <p className={styles.p}>
                데이터 관리는 <strong className={styles.strong}>MariaDB</strong>
                와 <strong>Redis</strong>를 연동하여 처리하고 있으며, 전체
                프로젝트는{" "}
                <strong className={styles.strong}>반응형 UX/UI</strong>와 실무에
                가까운 <strong className={styles.strong}>풀스택 구성</strong>을
                목표로 제작되었습니다.
            </p>
        </div>
    );
};

export default Home;
