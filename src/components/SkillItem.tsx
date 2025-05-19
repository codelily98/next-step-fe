import styles from "../css/components/Skill.module.css";

type SkillItemProps = {
    name: string;
    onClick: () => void;
};

const SkillItem = ({ name, onClick }: SkillItemProps) => {
    return (
        <div className={styles.skillItem} onClick={onClick}>
            {name}
        </div>
    );
};

export default SkillItem;
