import { useEffect, useState } from "react";
import { projects, Project } from "../data/projects";
import { motion } from "framer-motion";
import ProjectModal from "../components/ProjectModal";
import styles from "../css/pages/Projects.module.css";

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null
    );

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className={styles.container}>
            <motion.h2
                className={styles.title}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                프로젝트 포트폴리오
            </motion.h2>
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
        </section>
    );
};

export default Projects;
