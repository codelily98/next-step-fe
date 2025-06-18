import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { Project } from "../data/projects";
import { stackColors } from "../data/stackColors";
import { useEffect, useState, ReactNode } from "react";
import styles from "../css/components/ProjectModal.module.css";

type Props = {
    project: Project;
    onClose: () => void;
};

// Bold 또는 링크 변환
const parseText = (text: string) => {
    if (text.includes("링크 : ")) {
        const parts = text.split("링크 : ");
        return (
            <>
                {parseBold(parts[0])}
                <a
                    href={parts[1]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.notionLink}
                >
                    시연영상 바로가기
                </a>
            </>
        );
    } else {
        return parseBold(text);
    }
};

// Bold 변환
const parseBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, idx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={idx}>{part.slice(2, -2)}</strong>;
        } else {
            return <span key={idx}>{part}</span>;
        }
    });
};

// Markdown Content 변환
export const parseMarkdownContent = (content: string): ReactNode[] => {
    const lines = content.trim().split("\n");

    let result: ReactNode[] = [];
    let currentList: { depth: number; content: string }[] = [];
    let listDepth: number = 0;
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // 공백 줄
        if (line.trim() === "") {
            if (inList) {
                result.push(renderList(currentList, listDepth, i));
                currentList = [];
                inList = false;
            }
            result.push(
                <div key={`space-${i}`} className={styles.notionSpacing}></div>
            );
            continue;
        }

        // img 태그가 있는 경우 (가장 먼저 체크)
        if (line.startsWith("<img")) {
            if (inList) {
                result.push(renderList(currentList, listDepth, i));
                currentList = [];
                inList = false;
            }
            const purifiedHtml = DOMPurify.sanitize(line);
            result.push(
                <div key={`img-${i}`} className={styles.notionImage}>
                    {parse(purifiedHtml)}
                </div>
            );
            continue;
        }

        // 헤더
        if (line.startsWith("## ")) {
            if (inList) {
                result.push(renderList(currentList, listDepth, i));
                currentList = [];
                inList = false;
            }
            result.push(
                <h2
                    key={`h2-${i}`}
                    className={styles.notionH2}
                    style={{ color: "#4ecdc4" }}
                >
                    {line.substring(3)}
                </h2>
            );
            continue;
        }
        if (line.startsWith("### ")) {
            if (inList) {
                result.push(renderList(currentList, listDepth, i));
                currentList = [];
                inList = false;
            }
            result.push(
                <h3
                    key={`h3-${i}`}
                    className={styles.notionH3}
                    style={{ color: "#4ecdc4" }}
                >
                    {line.substring(4)}
                </h3>
            );
            continue;
        }

        // 인용구
        if (line.startsWith("> ")) {
            if (inList) {
                result.push(renderList(currentList, listDepth, i));
                currentList = [];
                inList = false;
            }
            result.push(
                <blockquote key={`quote-${i}`} className={styles.notionQuote}>
                    {parseText(line.substring(2))}
                </blockquote>
            );
            continue;
        }

        // 리스트 (하위 리스트 포함)
        const listMatch = line.match(/^(\s*)- (.*)$/);
        if (listMatch) {
            const space = listMatch[1];
            const content = listMatch[2];

            const depth = Math.floor(space.length / 2);

            if (!inList) {
                listDepth = depth;
                inList = true;
            }

            currentList.push({ depth, content });
            continue;
        }

        // 일반 문단
        if (inList) {
            result.push(renderList(currentList, listDepth, i));
            currentList = [];
            inList = false;
        }

        result.push(
            <p key={`p-${i}`} className={styles.notionParagraph}>
                {parseText(line)}
            </p>
        );
    }

    if (inList) {
        result.push(renderList(currentList, listDepth, "final"));
    }

    return result;
};

// 리스트 렌더링 (하위 리스트 지원)
const renderList = (
    items: { depth: number; content: string }[],
    baseDepth: number,
    key: any
) => {
    const renderItems = (
        items: { depth: number; content: string }[],
        depth: number
    ): ReactNode => {
        const list: ReactNode[] = [];
        let i = 0;

        while (i < items.length) {
            const item = items[i];

            if (item.depth === depth) {
                const content = item.content.trim();

                if (content.startsWith("<img")) {
                    // 이미지가 리스트 안에 있는 경우
                    const purifiedHtml = DOMPurify.sanitize(content);
                    list.push(
                        <li key={i} className={styles.notionListItem}>
                            <div className={styles.notionGif}>
                                {parse(purifiedHtml)}
                            </div>
                        </li>
                    );
                } else {
                    // 일반 텍스트인 경우
                    list.push(
                        <li key={i} className={styles.notionListItem}>
                            {parseText(content)}
                        </li>
                    );
                }
                i++;
            } else if (item.depth > depth) {
                // 중첩 리스트 처리
                const nestedItems: { depth: number; content: string }[] = [];

                while (i < items.length && items[i].depth >= depth + 1) {
                    nestedItems.push(items[i]);
                    i++;
                }

                // 마지막 list 항목에 중첩 ul 추가
                if (list.length > 0) {
                    const last = list[list.length - 1];
                    list[list.length - 1] = (
                        <>
                            {last}
                            <ul className={styles.notionList}>
                                {renderItems(nestedItems, depth + 1)}
                            </ul>
                        </>
                    );
                }
            } else {
                break;
            }
        }

        return list;
    };

    return (
        <ul key={`list-${key}`} className={styles.notionList}>
            {renderItems(items, baseDepth)}
        </ul>
    );
};

const ProjectModal = ({ project, onClose }: Props) => {
    const [contentElements, setContentElements] = useState<ReactNode[]>([]);

    useEffect(() => {
        setContentElements(parseMarkdownContent(project.content));

        window.scrollTo(0, 0);
    }, [project.content]);

    return (
        <div className={styles.backdrop} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.title}>{project.title}</h2>

                <div className={styles.meta}>
                    <p>
                        <strong>📅 기간</strong> {project.period}
                    </p>
                    <p>
                        <strong>👥 인원</strong> {project.members}
                    </p>
                    <p>
                        <strong>🔗 GitHub</strong>{" "}
                        <ul>
                            {project.github.map((url, index) => (
                                <li key={index}>
                                    <a
                                        className={styles.url}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {url}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </p>
                    <p>
                        <strong>📱 기술스택</strong>
                    </p>
                </div>

                <div className={styles.stack}>
                    {project.stack.map((tech) => (
                        <span
                            key={tech}
                            className={styles.techBadge}
                            style={{
                                backgroundColor: stackColors[tech] || "#444",
                                color: "#fff",
                            }}
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                <img
                    src={project.image}
                    alt={project.title}
                    className={styles.thumbnail}
                />

                <p className={styles.description}>{project.description}</p>

                <div className={styles.notionContent}>{contentElements}</div>

                <button onClick={onClose} className={styles.closeBtn}>
                    닫기
                </button>
            </div>
        </div>
    );
};

export default ProjectModal;
