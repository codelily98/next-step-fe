import { useEffect, useState } from "react";
import SkillModal from "../components/SkillModal";
import SkillItem from "../components/SkillItem";
import profileImage from "../assets/profile.jpg";
import styles from "../css/pages/About.module.css";
import { categorizedSkills, Skill } from "../data/skills";

const About = () => {
    useEffect(() => {
        // About 페이지 진입 시
        document.body.style.backgroundColor = "#000";

        // 페이지를 벗어날 때 배경 초기화 (원래 색으로 되돌리기)
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);

    const [selected, setSelected] = useState<Skill | null>(null);

    return (
        <section className={styles.about}>
            <h1 className={styles.title}>김태훈 포트폴리오입니다.</h1>

            <div className={styles.intro}>
                <img
                    src={profileImage}
                    alt="프로필"
                    className={styles.profile}
                />
                <div className={styles.description}>
                    <h2>맡은 일은 끝까지 책임지는 개발 꿈나무 김태훈입니다.</h2>
                    <p>
                        네이버 클라우드 플랫폼 교육을 이수하고 웹 개발자로서의
                        발전을 꿈꾸는 김태훈입니다.
                    </p>
                </div>
            </div>

            <div className={styles.section}>
                <h3>Contact</h3>
                <p>
                    <strong>Mail</strong> : codelily98@naver.com
                </p>
                <p>
                    <strong>Phone</strong> : +82 10-3798-9811
                </p>
                <p>
                    <strong>Address</strong> : 서울특별시 서대문구 통일로39가길
                    57
                </p>
                <p>
                    <strong>Git</strong> :{" "}
                    <a
                        className={styles.line}
                        href="https://github.com/codelily98"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitHub codelily98 - Overview
                    </a>
                </p>
            </div>

            <div className={styles.section}>
                <h3>Career</h3>
                <p>
                    와이엠씨(주) 2022.06.21 ~ 2023.07.01
                    <br />
                    TS 사업부에서 설비 엔지니어로 근무
                </p>
            </div>

            <div className={styles.section}>
                <h3>Education</h3>
                <p>대신고등학교 2017.02 - 졸업</p>
                <p>대진대학교 휴먼로봇융합전공 2023.02 - 졸업</p>
                <p>가천대원격평생교육원 사회복지전공 2025.02 - 졸업</p>
                <p>
                    [네이버 클라우드] 클라우드 기반 AlaaS 개발자 양성 2024.07 ~
                    2025.01 - 수료
                </p>
            </div>

            <div className={styles.section}>
                <h3>Certificate</h3>
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
                            <td>2025년 2월 14일</td>
                            <td>네이버 클라우드 플랫폼</td>
                        </tr>
                        <tr>
                            <td>사회복지사 2급</td>
                            <td>2025년 2월 4일</td>
                            <td>보건복지부</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className={styles.skillsSection}>
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
