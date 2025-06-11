import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore"; // Zustand 스토어 임포트
import styles from "../css/components/Header.module.css";

const Header = () => {
    const { isAuthenticated, logout } = useAuthStore();
    const [isOpen, setIsOpen] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsOpen((prev) => !prev);
    const closeMenu = () => setIsOpen(false);

    const navigate = useNavigate(); // 라우터 훅 사용

    // 로그아웃 버튼 클릭 시 호출될 함수
    const handleLogoutClick = async () => {
        closeMenu(); // 먼저 메뉴를 닫습니다. (만약 메뉴가 열려있다면)
        await logout(); // Zustand 스토어의 logout 함수 호출 (백엔드 API 호출 포함)
        navigate("/"); // 로그아웃 후 로그인 페이지로 리다이렉트
    };

    // 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                isOpen &&
                headerRef.current &&
                !headerRef.current.contains(e.target as Node)
            ) {
                closeMenu();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <header className={styles.header} ref={headerRef}>
            <Link to="/" className={styles.logo} onClick={closeMenu}>
                CodeLily
            </Link>

            <button
                className={`${styles.hamburger} ${isOpen ? styles.open : ""}`}
                onClick={toggleMenu}
            >
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
            </button>

            <nav className={`${styles.nav} ${isOpen ? styles.active : ""}`}>
                <Link
                    to="/"
                    className={`${styles.link} ${styles.a}`}
                    onClick={closeMenu}
                >
                    홈
                </Link>
                <Link
                    to="/about"
                    className={`${styles.link} ${styles.a}`}
                    onClick={closeMenu}
                >
                    소개
                </Link>
                <Link
                    to="/projects"
                    className={`${styles.link} ${styles.a}`}
                    onClick={closeMenu}
                >
                    프로젝트
                </Link>
                {isAuthenticated ? (
                    <Link
                        to="/info"
                        className={`${styles.link} ${styles.a}`}
                        onClick={closeMenu}
                    >
                        마이페이지
                    </Link>
                ) : (
                    <></>
                )}
                {isAuthenticated ? (
                    <div
                        className={`${styles.link} ${styles.login}`}
                        onClick={handleLogoutClick}
                    >
                        로그아웃
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className={`${styles.link} ${styles.login}`}
                        onClick={closeMenu}
                    >
                        로그인
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Header;
