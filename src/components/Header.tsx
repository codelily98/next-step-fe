import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/components/Header.module.css";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsOpen((prev) => !prev);
    const closeMenu = () => setIsOpen(false);

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
                <Link
                    to="/login"
                    className={`${styles.link} ${styles.login}`}
                    onClick={closeMenu}
                >
                    로그인
                </Link>
            </nav>
        </header>
    );
};

export default Header;
