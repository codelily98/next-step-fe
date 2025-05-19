import styles from "../css/components/Skill.module.css";

type SkillModalProps = {
    name: string;
    description: string;
    logo?: string;
    link?: string;
    onClose: () => void;
};

const SkillModal = ({
    name,
    description,
    logo,
    link,
    onClose,
}: SkillModalProps) => {
    return (
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                {logo && <img src={logo} alt={name} className={styles.logo} />}
                <h3>{name}</h3>
                <p>{description}</p>
                <div className={styles.function}>
                    {link && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.link}
                        >
                            공식 사이트 방문
                        </a>
                    )}
                    <button onClick={onClose} className={styles.closeBtn}>
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SkillModal;
