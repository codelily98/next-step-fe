import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { Project } from "../data/projects";
import styles from "../css/components/NotionMarkdown.module.css"; // CSS 모듈 임포트

interface NotionMarkdownProps {
    project: Project;
    //onClose: () => void;
}

const NotionMarkdown: React.FC<NotionMarkdownProps> = ({
    project,
    //onClose,
}) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.description}>{project.description}</p>

            <div className={styles.metadata}>
                <div className={styles.metadataItem}>
                    <span className={styles.metadataLabel}>기간:</span>
                    <span className={styles.metadataValue}>
                        {project.period}
                    </span>
                </div>
                <div className={styles.metadataItem}>
                    <span className={styles.metadataLabel}>인원:</span>
                    <span className={styles.metadataValue}>
                        {project.members}
                    </span>
                </div>
                <div className={styles.metadataItem}>
                    <span className={styles.metadataLabel}>GitHub:</span>
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                    >
                        {project.github}
                    </a>
                </div>
            </div>

            <div className={styles.stack}>
                <span className={styles.metadataLabel}>기술 스택:</span>
                <div className={styles.tags}>
                    {project.stack.map((tech, index) => (
                        <span key={index} className={styles.tag}>
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {project.content && (
                <div className={styles.content}>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw, rehypeSanitize]}
                        components={{
                            h2: ({ node, ...props }) => (
                                <h2 className={styles.h2} {...props} />
                            ),
                            h3: ({ node, ...props }) => (
                                <h3 className={styles.h3} {...props} />
                            ),
                            p: ({ node, ...props }) => (
                                <p className={styles.p} {...props} />
                            ),
                            ul: ({ node, ...props }) => (
                                <ul className={styles.ul} {...props} />
                            ),
                            ol: ({ node, ...props }) => (
                                <ol className={styles.ol} {...props} />
                            ),
                            li: ({ node, ...props }) => (
                                <li className={styles.li} {...props} />
                            ),
                            a: ({ node, ...props }) => (
                                <a
                                    className={styles.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    {...props}
                                />
                            ),
                            code: ({
                                node,
                                inline,
                                className,
                                ...props
                            }: any) =>
                                inline ? (
                                    <code
                                        className={styles.inlineCode}
                                        {...props}
                                    />
                                ) : (
                                    <div className={styles.codeBlock}>
                                        <code {...props} />
                                    </div>
                                ),
                            strong: ({ node, ...props }) => (
                                <strong className={styles.strong} {...props} />
                            ),
                        }}
                    >
                        {project.content}
                    </ReactMarkdown>
                </div>
            )}
        </div>
    );
};

export default NotionMarkdown;
