export type Skill = {
    name: string;
    description: string;
    logo?: string;
    link?: string;
};

export type SkillCategory = {
    category: string;
    items: Skill[];
};

import ncpLogo from "../assets/ncp_logo.png";
import mybatisLogo from "../assets/mybatis_logo.png";

export const categorizedSkills: SkillCategory[] = [
    {
        category: "프로그래밍 언어",
        items: [
            {
                name: "Java",
                description: "객체지향 언어이며 백엔드 개발에 널리 쓰입니다.",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
                link: "https://www.oracle.com/java/",
            },
            {
                name: "JavaScript",
                description: "웹 개발의 표준 스크립트 언어입니다.",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                link: "https://developer.mozilla.org/ko/docs/Web/JavaScript",
            },
        ],
    },
    {
        category: "프론트엔드",
        items: [
            {
                name: "HTML5",
                description: "웹 페이지의 구조를 설계하는 마크업 언어입니다.",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
                link: "https://developer.mozilla.org/ko/docs/Web/HTML",
            },
            {
                name: "CSS3",
                description:
                    "웹 페이지의 스타일을 지정하는 스타일시트 언어입니다.",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
                link: "https://developer.mozilla.org/ko/docs/Web/CSS",
            },
            {
                name: "React",
                description: "SPA 개발을 위한 프론트엔드 라이브러리입니다.",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                link: "https://reactjs.org/",
            },
            {
                name: "JSP",
                description: "Java 기반의 서버 사이드 템플릿 기술입니다.",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
                link: "https://www.oracle.com/java/technologies/jspt.html",
            },
            {
                name: "jQuery",
                description:
                    "DOM 제어 및 Ajax 처리에 특화된 JavaScript 라이브러리입니다.",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg",
                link: "https://jquery.com/",
            },
            {
                name: "Vite",
                description: "빠르고 간결한 프론트엔드 빌드 도구입니다.",
                logo: "https://vitejs.dev/logo.svg",
                link: "https://vitejs.dev/",
            },
            {
                name: "Ajax",
                description:
                    "페이지 전체 새로고침 없이 서버와 통신하는 기술입니다.",
                logo: "https://upload.wikimedia.org/wikipedia/commons/a/a1/AJAX_logo_by_gengns.svg",
                link: "https://developer.mozilla.org/ko/docs/Web/Guide/AJAX",
            },
            {
                name: "Axios",
                description:
                    "Promise 기반의 HTTP 비동기 통신 라이브러리입니다.",
                logo: "https://axios-http.com/assets/logo.svg",
                link: "https://axios-http.com/",
            },
        ],
    },
    {
        category: "백엔드 & 프레임워크",
        items: [
            {
                name: "Spring/Spring Boot",
                description: "Java 기반의 백엔드 프레임워크입니다.",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
                link: "https://spring.io/projects/spring-boot",
            },
            {
                name: "MyBatis",
                description:
                    "SQL 매핑을 지원하는 Java 퍼시스턴스 프레임워크입니다.",
                logo: mybatisLogo,
                link: "https://mybatis.org/mybatis-3/",
            },
        ],
    },
    {
        category: "데이터베이스",
        items: [
            {
                name: "OracleDB",
                description:
                    "Oracle 사의 고성능 상용 관계형 데이터베이스입니다.",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
                link: "https://www.oracle.com/database/",
            },
            {
                name: "MySQL(MariaDB)",
                description: "가볍고 빠른 오픈소스 관계형 DB입니다.",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
                link: "https://www.mysql.com/",
            },
            {
                name: "Redis",
                description:
                    "인메모리 기반의 Key-Value 구조 데이터 저장소로, 캐싱 및 세션 관리에 널리 사용됩니다.",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
                link: "https://redis.io/",
            },
        ],
    },
    {
        category: "클라우드 & 인프라",
        items: [
            {
                name: "Naver Cloud Platform (NCP)",
                description:
                    "네이버에서 제공하는 국내 대표 클라우드 플랫폼입니다.",
                logo: ncpLogo,
                link: "https://www.ncloud.com/",
            },
            {
                name: "Google Cloud Platform (GCP)",
                description:
                    "Google에서 제공하는 글로벌 클라우드 플랫폼으로, AI/ML, 데이터 분석, 서버리스 등 다양한 서비스를 지원합니다.",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
                link: "https://cloud.google.com/",
            },
            {
                name: "Docker",
                description: "애플리케이션 컨테이너화를 위한 플랫폼입니다.",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
                link: "https://www.docker.com/",
            },
            {
                name: "Jenkins",
                description:
                    "자동화된 CI/CD 파이프라인 구축을 위한 도구입니다.",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
                link: "https://www.jenkins.io/",
            },
            {
                name: "Nginx",
                description: "고성능 웹 서버 및 리버스 프록시 서버입니다.",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
                link: "https://www.nginx.com/",
            },
        ],
    },
    {
        category: "개발 도구",
        items: [
            {
                name: "Git / GitHub",
                description:
                    "버전 관리 시스템과 이를 기반으로 한 원격 저장소 플랫폼입니다.",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
                link: "https://github.com/",
            },
            {
                name: "Figma",
                description:
                    "디자인 협업 및 UI 프로토타입 도구로, 팀 기반 작업에 최적화되어 있습니다.",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
                link: "https://www.figma.com/",
            },
            {
                name: "ERD-Cloud",
                description:
                    "웹 기반 ERD(Entity Relationship Diagram) 설계 도구입니다.",
                logo: "https://www.erdcloud.com/favicon.ico",
                link: "https://www.erdcloud.com/",
            },
        ],
    },
];
