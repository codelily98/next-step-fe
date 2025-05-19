import { useState } from "react";
import { projects, Project } from "../data/projects";
import ProjectModal from "../components/ProjectModal";
import styles from "../css/pages/Projects.module.css";

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null
    );

    // const [isCreatePostOpen, setIsCreatePostOpen] = useState(false); // 글쓰기 모달 열림 여부

    // const handleCreatePost = () => {
    //     setIsCreatePostOpen(true);
    // };

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>프로젝트 포트폴리오</h2>
            <div className={styles.grid}>
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className={styles.card}
                        onClick={() => setSelectedProject(project)}
                    >
                        <img src={project.image} alt={project.title} />
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                    </div>
                ))}
            </div>

            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}

            {/* 글쓰기 버튼 
            <button className={styles.writeButton} onClick={handleCreatePost}>
                글쓰기
            </button>
            */}

            {/* 글쓰기 모달
            {isCreatePostOpen && (
                <CreatePost onClose={() => setIsCreatePostOpen(false)} />
            )}
            */}
        </section>
    );
};

export default Projects;
