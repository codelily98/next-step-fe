import { useEffect, useState, useRef } from "react";
import SkillModal from "../components/SkillModal";
import SkillItem from "../components/SkillItem";
import profileImage from "../assets/profile.jpg";
import styles from "../css/pages/About.module.css";
import { categorizedSkills, Skill } from "../data/skills";

const About = () => {
    const skillsRef = useRef<HTMLDivElement>(null);

    const scrollToSkills = () => {
        skillsRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        document.body.style.backgroundColor = "#000";
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);

    const [selected, setSelected] = useState<Skill | null>(null);

    return (
        <section className={styles.about}>
            <h1 className={styles.title}>
                <span className={styles.highlight}>끈기와 책임감</span>으로
                성장하는 개발자,
                <span className={styles.name}> 김태훈</span>입니다.
            </h1>

            <div className={styles.intro}>
                <img
                    src={profileImage}
                    alt="프로필"
                    className={styles.profile}
                />
                <div className={styles.description}>
                    <h2>안녕하세요 👋</h2>
                    <p>
                        네이버 클라우드 플랫폼 교육을 이수하고, 웹 개발자로 도약
                        중인 김태훈입니다.
                    </p>
                    <div className={styles.keywords}>
                        <span onClick={scrollToSkills}>#React</span>
                        <span onClick={scrollToSkills}>#Typescript</span>
                        <span onClick={scrollToSkills}>#Spring</span>
                        <span onClick={scrollToSkills}>#SpringBoot</span>
                        <span onClick={scrollToSkills}>#Zustand</span>
                        <span onClick={scrollToSkills}>#CI/CD</span>
                        <span onClick={scrollToSkills}>#NCP</span>
                        <span onClick={scrollToSkills}>#GCP</span>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h3>Contact</h3>
                <p>
                    <strong>Mail</strong>: codelily98@naver.com
                </p>
                <p>
                    <strong>Phone</strong>: +82 10-3798-9811
                </p>
                <p>
                    <strong>Address</strong>: 서울특별시 서대문구 통일로39가길
                    57
                </p>
                <p>
                    <strong>GitHub</strong>:{" "}
                    <a
                        className={styles.line}
                        href="https://github.com/codelily98"
                        target="_blank"
                        rel="noreferrer"
                    >
                        codelily98 - GitHub
                    </a>
                </p>
            </div>

            <div className={styles.section}>
                <h3>Career</h3>
                <p>
                    와이엠씨(주) (2022.06.21 ~ 2023.07.01)
                    <br />
                    TS 사업부 설비 엔지니어 근무
                </p>
            </div>

            <div className={styles.section}>
                <h3>Education</h3>
                <p>대신고등학교 졸업 (2017.02)</p>
                <p>대진대학교 휴먼로봇융합전공 졸업 (2023.02)</p>
                <p>가천대원격 사회복지전공 졸업 예정 (2025.02)</p>
                <p>
                    [네이버 클라우드] AlaaS 개발자 양성 수료 (2024.07 ~ 2025.01)
                </p>
            </div>

            <div className={styles.section}>
                <h3>Certificates</h3>
                <table className={styles.certTable}>
                    <thead>
                        <tr>
                            <th>자격증명</th>
                            <th>취득일</th>
                            <th>주관</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>NCP 기술자격증</td>
                            <td>2025.02.14</td>
                            <td>네이버 클라우드 플랫폼</td>
                        </tr>
                        <tr>
                            <td>사회복지사 2급</td>
                            <td>2025.02.04</td>
                            <td>보건복지부</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div ref={skillsRef} className={styles.skillsSection}>
                <h3 className={styles.skillCategory}>Skills</h3>
                {categorizedSkills.map((group) => (
                    <div key={group.category} className={styles.skillGroup}>
                        <h4 className={styles.subSkillCategory}>
                            {group.category}
                        </h4>
                        <div className={styles.skillGrid}>
                            {group.items.map((skill) => (
                                <SkillItem
                                    key={skill.name}
                                    name={skill.name}
                                    onClick={() => setSelected(skill)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {selected && (
                <SkillModal
                    name={selected.name}
                    description={selected.description}
                    logo={selected.logo}
                    link={selected.link}
                    onClose={() => setSelected(null)}
                />
            )}
        </section>
    );
};

export default About;
