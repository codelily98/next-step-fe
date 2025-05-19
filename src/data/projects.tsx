export type Project = {
    id: number;
    title: string;
    description: string;
    image: string;
    period: string;
    members: string;
    stack: string[];
    github: string;
    content: string;
};

export const projects: Project[] = [
    {
        id: 1,
        title: "모이고(moeego)",
        description:
            "특정 분야의 사용자와 달인을 연결하는 서비스 매칭 플랫폼 사이트입니다.",
        image: "https://storage.googleapis.com/next-step-assets/moeego.png",
        period: "2024.11 ~ 2025.01",
        members: "7명",
        stack: [
            "Java",
            "JavaScript",
            "HTML5",
            "CSS3",
            "SpringBoot",
            "JDBC",
            "MySQL",
            "JWT",
            "React",
            "nginx",
            "node.js",
            "SPA",
            "JPA",
            "NCP",
            "Jenkins",
            "Docker",
            "GitHub",
            "ERD Cloud",
            "Figma",
        ],
        github: "https://github.com/Bit-Final-Project",
        content: `
## 기술 스택
<img src="https://storage.googleapis.com/next-step-assets/moeego/stack.png" />

## 기능 요구사항
<img src="https://storage.googleapis.com/next-step-assets/moeego/requirements.png" />

## 유즈케이스
<img src="https://storage.googleapis.com/next-step-assets/moeego/usecase1.png" />
<img src="https://storage.googleapis.com/next-step-assets/moeego/usecase2.png" />
<img src="https://storage.googleapis.com/next-step-assets/moeego/usecase3.png" />

## 웹페이지 백로그
<img src="https://storage.googleapis.com/next-step-assets/moeego/backlog.png" />

## 아키텍쳐 설계
<img src="https://storage.googleapis.com/next-step-assets/moeego/implement.png" />

## 배포 로직
<img src="https://storage.googleapis.com/next-step-assets/moeego/ci_cd.png" />

## 주요 기능
### 회원
**사용자**
- 회원가입/달인 회원가입
- 로그인/로그아웃
- 달인 신청
- 마이페이지 (찜한 달인, 계정 설정, 활동내역)
**달인**
- 달인 소개 작성/수정
- 서비스 등록/수정
**관리자**
- 대시보드
- 달인권한 관리 (승인/박탈)
- 회원관리
- 이벤트 및 공지 관리

### 커뮤니티
- 글 작성/수정/삭제
- 댓글/답글 작성/수정/삭제

### 달인 찾기
- 검색 기능 (서비스/지역/키워드)
- 달인 상세 보기
- 달인 서비스 예약

## 담당 역할
- FE 팀장
**프론트엔드 개발**
- 페이지 레이아웃 설계 및 구현
- context 및 store 설계 및 구현
- router 설계 및 구현
- JWT를 위한 공통 요청 API 설계 및 구현
- 페이징에 무한 스크롤 도입
- 캘린더 API 설계 및 구현
- 회원(일반/달인) 전체 기능 구현
- 달인 찾기 전체 기능 구현
**백엔드 지원**
- ERD 작성
- Flow Chart 작성
- 웹페이지 백로그 작성
**CI/CD**
- NCP Server에 Docker와 Jenkins를 이용한 FE 배포

## 기술적 성과
- JWT를 이용한 로그인 정보 저장
- 웹훅과 비동기 통신을 활용하여 빠른 응답 속도 확보
- UI 반응성 향상과 서버 부하 감소
- 도메인(https://www.moeego.site)을 사용한 CI/CD 구축
- 배포 시 보안 설정 강화

## 문제 해결
- 배포 시 외부 SSH 접근과 네트워크 스캔으로 인한 서버 감염 문제 해결
- 서버 재생성 및 네트워크 ACL 설정 강화
- SSH 차단 정책으로 외부 접근 차단
- nginx 설정 변경으로 공인 IP 유출 차단

## 프로젝트 배운 점
- 명확한 역할 구분과 Git Flow 전략을 통한 효과적인 협업
- JWT 같은 새로운 기술을 프로젝트에 성공적으로 적용
- 서버 배포와 보안 문제 해결을 통한 실무 경험 획득

## 시연영상
### 웹환경
- 메인화면
  - 메인화면 기능 시연 및 다크 모드
    - 링크 : https://youtu.be/-24gT7ZM4bs

- 회원기능
  - 일반 회원
    - 회원의 기본 기능(가입 및 로그인, 마이페이지) 시연
      - 링크 : https://youtu.be/6PXhsEq_TOE
  - 달인 회원
    - 달인 회원가입 및 전환, 달인의 서비스 등록 시연
      - 링크 : https://youtu.be/PLcxF8Jtp-M
    - 등록된 달인 및 서비스 찾기 및 서비스 별 예약 및 리뷰 시연
      - 링크 : https://youtu.be/fzGbQOkqp_I
  - 커뮤니티
    - 커뮤니티 페이지의 기본 기능(글 작성, 수정, 삭제, 댓글 작성, 수정 삭제) 시연
      - 링크 : https://youtu.be/gi1FI7_eRTU
  - 관리자
    - 관리자 페이지의 기능(회원 관리, 공지 및 이벤트 관리) 시연
      - 링크 : https://youtu.be/sMkyjUsCzjQ

**모바일 환경 시연영상**

  - 메인화면
    - 메인화면 기능 시연 및 다크 모드
      - [모바일 .gif 재생]
        - <img src="https://storage.googleapis.com/next-step-assets/moeego/gif/main_moblie.gif" />
            
  - 회원기능
    - SNS 로그인
      - [sns 로그인 .gif]
        - <img src="https://storage.googleapis.com/next-step-assets/moeego/gif/sns_naver.gif" />
        - <img src="https://storage.googleapis.com/next-step-assets/moeego/gif/sns_kakao.gif" />
  - 일반회원
    - 회원의 기본 기능(가입 및 로그인, 마이페이지) 시연
      - [일반회원 .gif 재생]
        - <img src="https://storage.googleapis.com/next-step-assets/moeego/gif/user_moblie.gif" />
  - 달인회원
    - 달인 회원가입 및 전환, 달인의 서비스 등록 시연
      - [달인회원 .gif 재생]
    - 등록된 달인 및 서비스 찾기 및 서비스 별 예약 및 리뷰 시연
      - [달인회원 .gif 재생]
        - <img src="https://storage.googleapis.com/next-step-assets/moeego/gif/pro_moblie.gif" />
  - 커뮤니티
    - 커뮤니티 페이지의 기본 기능(글 작성, 수정, 삭제, 댓글 작성, 수정 삭제) 시연
      - [커뮤니티 .gif 재생]
        - <img src="https://storage.googleapis.com/next-step-assets/moeego/gif/community_moblie.gif" />
`,
    },
    {
        id: 2,
        title: "멍캣(mungcat)",
        description:
            "반려동물 커뮤니티 기능과 게시판, 쇼핑몰 기능을 갖춘 사이트입니다.",
        image: "https://storage.googleapis.com/next-step-assets/mungcat.png",
        period: "2024.08 ~ 2024.10",
        members: "4명",
        stack: [
            "Java",
            "JavaScript",
            "HTML5",
            "CSS3",
            "Spring",
            "JDBC",
            "MySQL",
            "MyBatis",
            "NCP",
            "Jenkins",
            "Docker",
            "Git",
            "GitHub",
            "ERD Cloud",
        ],
        github: "https://github.com/MiniTeamProject/miniSpringWeb",
        content: `
## 기술 스택
<img src="https://storage.googleapis.com/next-step-assets/mungcat/stack.png" />

## ERD
<img src="https://storage.googleapis.com/next-step-assets/mungcat/erd.png" />

## 유즈케이스
<img src="https://storage.googleapis.com/next-step-assets/mungcat/usecase1.png" />
<img src="https://storage.googleapis.com/next-step-assets/mungcat/usecase2.png" />

## 기능
- 회원
  - 회원가입(이메일 인증)
  - 로그인/로그아웃
  - 정보수정(프로필, 닉네임, 주소, 비밀번호, 전화번호)
  - 회원탈퇴
  - 구매목록
  - 장바구니
- 멍캣광장
  - 글 목록 보기(인기글, 최신글)
  - 글 상세보기
  - 글/댓글/답글 작성/수정/삭제(이미지 첨부)
- 멍캣마켓
  - 상품 보기(인기 상품, 최신 상품)
  - 상품 상세 보기
  - 상품 구매
- 관리자
  - 상품 등록/수정/삭제
  - 공지사항 작성/수정/삭제
- 검색
  - 카테고리에 따른 검색 기능(멍캣광장, 멍캣마켓)

## 역할 (BE/FE)
- **프로젝트 팀장**
  - Git Flow 전략 도입
  - 프로젝트 구조 및 기능 설계/구현
  - ERD 설계 및 Usecase 작성
- **BE**
  - 회원 기능 구현 (회원가입/탈퇴, 로그인/로그아웃, 정보수정, 구매목록, 장바구니)
  - 커뮤니티 기능 구현 (글/댓글/답글 작성/수정/삭제)
  - 관리자 상품 기능 구현 (상품 등록/수정/삭제)
  - MyBatis를 활용한 NCP MySQL DB 연동 (db.properties 작성)
  - NCP Object 스토리지 이미지 업로드 기능 구현
  - Kakao/Naver login API 적용
- **FE**
  - 사이트 프론트 페이지 기능 구현 및 반응형 디자인 (전체)
  - florala 에디터 적용
- **CI/CD**
  - NCP Server에 Docker와 Jenkins를 이용한 FE/BE 배포 (Apache WAS)
  - http 형태로 배포

## 성과
- MyBatis를 이용한 DB 연동 숙달
- Spring 프로젝트 설계 및 개발 숙달
- Kakao와 Naver API 프로젝트 적용 경험
- 팀원들과의 Git을 통한 코드 리뷰와 프로젝트 관리 (Git Flow 전략) 경험
- NCP와 Jenkins/Docker를 활용한 CI/CD 경험
- florala 에디터 적용 경험

## 프로젝트 리뷰
- **Keep**
  - Git Flow 전략을 도입하여 팀 프로젝트를 진행
  - 반응형 웹 설계 및 작성
- **Problem**
  - https가 아닌 http 배포
  - 도메인을 사용하지 못함
  - 팀원들의 개인 사정으로 인한 프로젝트 이탈 및 시간 배분 문제

## 느낀점
- 지금까지 배웠던 것을 활용하고, Spring 기반 프로젝트에 적용할 수 있었습니다.
- 기본적인 CI/CD에 대해서 이해하고 활용할 수 있었습니다.
- 반응형 웹에 대해서 이해하고 반응형 페이지를 설계/작성할 수 있었습니다.

## 📝 실행 화면
### 메인화면
- <img src="https://storage.googleapis.com/next-step-assets/mungcat/main.png" />
- <img src="https://storage.googleapis.com/next-step-assets/mungcat/main_moblie.png" />
- <img src="https://storage.googleapis.com/next-step-assets/mungcat/main_menu_moblie.png" />
`,
    },
    {
        id: 3,
        title: "404(sa0sa)",
        description: "검색 기능을 제공하는 개발자 커뮤니티 사이트입니다.",
        image: "https://storage.googleapis.com/next-step-assets/404.png",
        period: "2024.06 ~ 2024.07",
        members: "3명",
        stack: [
            "Java",
            "JavaScript",
            "HTML5",
            "CSS3",
            "eclipse",
            "JDBC",
            "MySQL",
            "MyBatis",
            "NCP",
            "Jenkins",
            "Docker",
            "Git",
            "GitHub",
            "ERD Cloud",
        ],
        github: "https://github.com/codelily98/miniWeb",
        content: "",
    },
    {
        id: 4,
        title: "구름",
        description: "반려견의 일상 사진과 소개를 담은 개인 웹사이트입니다.",
        image: "https://storage.googleapis.com/next-step-assets/gooroom.png",
        period: "2024.05 ~ 2024.06",
        members: "1명",
        stack: [
            "Java",
            "JavaScript",
            "HTML5",
            "CSS3",
            "eclipse",
            "JDBC",
            "OracleDB",
            "Git",
            "GitHub",
            "ERD Cloud",
        ],
        github: "https://github.com/codelily98/gooroom",
        content: "",
    },
    {
        id: 5,
        title: "미니 게시판",
        description: "Java 기반 CRUD 게시판 프로젝트입니다.",
        image: "https://storage.googleapis.com/next-step-assets/mini.png",
        period: "2024.04",
        members: "1명",
        stack: [
            "Java",
            "JDBC",
            "OracleDB",
            "eclipse",
            "Git",
            "GitHub",
            "ERD Cloud",
        ],
        github: "https://github.com/codelily98/mini_project",
        content: "",
    },
];
