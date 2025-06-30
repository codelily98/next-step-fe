export type Project = {
    id: number;
    title: string;
    description: string;
    image: string;
    period: string;
    members: string;
    stack: string[];
    github: string[];
    content: string;
};

export const projects: Project[] = [
    {
        id: 1,
        title: "Next Step: Codelily",
        description:
            "개인 기술 역량을 소개하고 프로젝트를 전시하는 포트폴리오 웹사이트입니다.",
        image: "https://storage.googleapis.com/next-step-assets/next-step.png",
        period: "2025.05 ~ 2025.06",
        members: "1명",
        stack: [
            "TypeScript",
            "React",
            "Java",
            "HTML5",
            "CSS3",
            "Zustand",
            "SpringBoot",
            "MySQL",
            "Redis",
            "JWT",
            "OAuth2.0",
            "Docker",
            "Jenkins",
            "Nginx",
            "GCP",
            "GitHub Actions",
            "Kakao API",
        ],
        github: [
            "https://github.com/codelily98/next-step-fe",
            "https://github.com/codelily98/next-step-be",
        ],
        content: `
## 기술 스택
<img src="https://storage.googleapis.com/next-step-assets/next-step/stack.png" />

## 주요 기능
- 소개 페이지 (Home)
- 자기소개 / 기술 스택 / 자격증 소개 (About)
- 프로젝트 등록 및 상세 보기 (Projects)
- 관리자 전용 프로젝트 CRUD
- 로그인 (JWT, OAuth2.0: Kakao)
- 토큰 자동 갱신 및 Redis 기반 세션 관리
- 반응형 UI 및 Notion 스타일 Markdown 렌더링

## 담당 역할
- 전체 기획 및 설계
- 프론트엔드 개발 (React, Zustand, Module.css)
  - Notion 스타일 프로젝트 상세 모달 구현
  - Markdown → JSX 커스텀 파서 구현
  - Axios Interceptor를 통한 access/refresh token 관리
- 백엔드 개발 (Spring Boot)
  - JWT 및 OAuth2 로그인 구현
  - Redis 기반 Refresh Token 저장 및 보안 강화
  - 이미지 업로드(GCP Storage) 및 대용량 파일 대응
- 인프라 및 배포
  - GCP Compute Engine + Docker Compose 배포
  - Nginx 리버스 프록시 구성
  - Jenkins 기반 CI/CD 구축 (FE)
  - GitHub Actions 기반 CI/CD 구축 (BE)

## 기술적 성과
- RefreshToken을 HttpOnly 쿠키로 저장하여 XSS 대응
- Redis 캐시 기반 사용자 정보 빠른 응답 구현
- Notion과 유사한 UI/UX 구현 (자동 리스트, 블록 스타일)
- GCP 기반 퍼블릭 배포 및 도메인 연동
  - 도메인 : https://www.portfolio-nextstep.info

## 문제 해결
- 상태 관리 라이브러리 선택과 구조 설계 고민 → Zustand 채택 후 간결하게 구현
- JWT 갱신 보안 취약성 대응 → 쿠키 기반 처리로 보안 강화
- CI/CD 파이프라인에서 GCP IAM 권한 오류 → 서비스 계정 권한 세분화로 해결

## 배운 점
- 전체 서비스 구조를 혼자 구축하며 실무에 가까운 경험
- 보안, 배포, 인증 등 전반적인 웹 서비스 운영 역량 강화
- Markdown 렌더링, 이미지 최적화, 애니메이션 등 UI/UX 개선 중요성 체득
`,
    },
    {
        id: 2,
        title: "모이고(moeego)",
        description:
            "특정 분야의 사용자와 달인을 연결하는 서비스 매칭 플랫폼 사이트입니다.",
        image: "https://storage.googleapis.com/next-step-assets/moeego.png",
        period: "2024.11.07 ~ 2025.01.06",
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
            "OAuth2.0",
            "React",
            "Nginx",
            "node.js",
            "SPA",
            "JPA",
            "NCP",
            "Jenkins",
            "Docker",
            "GitHub",
            "ERD Cloud",
            "Figma",
            "Kakao API",
        ],
        github: ["https://github.com/Bit-Final-Project"],
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
**백엔드 개발**
- ERD 작성
- Flow Chart 작성
- 웹페이지 백로그 작성
- 회원기능 구현
**CI/CD**
- NCP Server에 Docker와 Jenkins를 이용한 FE/BE 배포

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
- Nginx 설정 변경으로 공인 IP 유출 차단

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
        id: 3,
        title: "멍캣(mungcat)",
        description:
            "반려동물 커뮤니티 기능과 게시판, 쇼핑몰 기능을 갖춘 사이트입니다.",
        image: "https://storage.googleapis.com/next-step-assets/mung-cat.png",
        period: "2024.10.14 ~ 2024.10.21",
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
            "Kakao API",
        ],
        github: ["https://github.com/MiniTeamProject/miniSpringWeb"],
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
<img src="https://storage.googleapis.com/next-step-assets/mungcat/main.png" />
- <img src="https://storage.googleapis.com/next-step-assets/mungcat/main_moblie.png" />
- <img src="https://storage.googleapis.com/next-step-assets/mungcat/main_menu_moblie.png" />
`,
    },
    {
        id: 4,
        title: "SA.0.SA (404)",
        description:
            "초보 개발자를 위한 정보 공유 및 일정/위치 관리 기능이 있는 커뮤니티 사이트입니다.",
        image: "https://storage.googleapis.com/next-step-assets/saosa.png",
        period: "2024.09.23 ~ 2024.09.30",
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
            "Kakao API",
            "Google Calendar API",
        ],
        github: ["https://github.com/codelily98/miniWeb"],
        content: `
## ERD

<img src="https://storage.googleapis.com/next-step-assets/saosa/404 ERD.png" />

## 기능

- 회원
  - 회원가입(이메일 인증)
  - 로그인/로그아웃
  - 정보수정(프로필, 닉네임, 주소, 비밀번호, 전화번호)
  - 회원탈퇴
- 커뮤니티
  - 글 목록 보기(공지사항, 인기글, 최신글)
  - 글 상세보기
  - 글/댓글 작성/수정/삭제(이미지 첨부)
- 뉴스
  - 네이버 뉴스 페이지로 이동
- 캘린더
  - 구글 캘린더 API 적용
- 지도
  - 카카오 지도 API 적용 (강남 비트캠프 기준 지도 출력)
- 검색
  - 커뮤니티 내용 검색 기능

**역할 (BE/FE)**

- 프로젝트 팀장
  - 프로젝트 구조 및 기능 설계/구현
  - ERD 설계 및 usecase 작성
- BE
  - 회원 및 커뮤니티 기능 구현
  - MyBatis + NCP DB 연동 및 이미지 업로드
  - 카카오 로그인 적용
- FE
  - 전체 페이지 구성 및 스마트 에디터 적용
- CI/CD
  - NCP 서버 + Docker + Jenkins를 이용한 배포

## 성과

- MVC 프로젝트 설계 및 개발 숙달
- 다양한 API 사용 경험
- CI/CD 파이프라인 구축 경험

## 프로젝트 리뷰

- Keep: 팀원 역할 분담, 스마트 에디터 성공 적용
- Problem: 에디터 적용 난이도, API 기능 활용 부족

## 느낀점

- MVC 구조에 대한 실전 경험
- 반응형 미지원 문제 인식 → 다른 프로젝트에서 구현 예정

## 실행화면
### 메인화면
- 로그아웃
<img src="https://storage.googleapis.com/next-step-assets/saosa/404 main.png" />
- 로그인
<img src="https://storage.googleapis.com/next-step-assets/saosa/404 main-login.png" />

### 마이페이지
- 기본
<img src="https://storage.googleapis.com/next-step-assets/saosa/404 mypage.png" />
- 닉네임 변경
<img src="https://storage.googleapis.com/next-step-assets/saosa/404 mypage-nickname-update.png" />
- 회원정보 변경
<img src="https://storage.googleapis.com/next-step-assets/saosa/404 mypage-info-update.png" />

### 커뮤니티
- 글목록
<img src="https://storage.googleapis.com/next-step-assets/saosa/404 community.png" />
- 글 상세보기 & 댓글 작성
<img src="https://storage.googleapis.com/next-step-assets/saosa/404 readpage.png" />
- 글 작성 (SmartEditor 2.0)
<img src="https://storage.googleapis.com/next-step-assets/saosa/404 writepage.png" />

### 기능
- 지도
<img src="https://storage.googleapis.com/next-step-assets/saosa/404 map.png" />
- 캘린더
<img src="https://storage.googleapis.com/next-step-assets/saosa/404 calendar.png" />
`,
    },
    {
        id: 5,
        title: "구름(gooreum)",
        description:
            "반려견의 일과를 사진으로 기록하고 가족과 공유할 수 있는 사진 기록 웹사이트입니다.",
        image: "https://storage.googleapis.com/next-step-assets/gooreum.png", // 대표 이미지 URL 직접 교체 가능
        period: "2024.09.07 ~ 2024.09.08",
        members: "1명",
        stack: [
            "Java",
            "JDBC",
            "OracleDB",
            "HTML5",
            "CSS3",
            "JavaScript",
            "SweetAlert2",
        ],
        github: ["https://github.com/codelily98/CloudWeb.git"], // 실제 주소로 교체
        content: `
### 나의 강아지 기록 사이트

내가 키우는 강아지의 사진 보관소를 만들면 어떨까라는 생각으로 프로젝트를 구상하였습니다. 내 반려동물의 일과를 사진으로 기록하고 가족과 공유가 가능한 사이트를 만들었습니다.

## 기능

- 회원
  - 회원가입
  - 로그인/로그아웃
  - 회원탈퇴
  - 정보수정(닉네임, 주소, 비밀번호, 전화번호)

## 역할 (BE/FE)

- **BE**
  - 프로젝트 구조 및 기능 설계/구현
  - Oracle DB 테이블 설계 및 구현
  - 회원 기능 구현 (회원가입/탈퇴, 로그인/로그아웃, 정보수정)

- **FE**
  - HTML5를 이용한 사이트 구조 설계 및 구현
  - CSS3를 이용한 사이트 디자인
  - SweetAlert2 적용
  - 동적 페이지 구현

## 성과

- HTML에 대한 이해와 프로젝트 적용 경험
- CSS에 대한 이해와 프로젝트 적용 경험
- JDBC를 활용한 Oracle DB 연동
- 실제 접속이 가능하고 기능이 있는 사이트 개발 경험

## 프로젝트 리뷰

- **Keep**
  - 동적 페이지 구현

- **Problem**
  - 재사용성이 떨어지는 프로젝트와 코드 구조

## 느낀점

- HTML과 CSS를 배우고 프로젝트에 적용하면서 프론트 엔드 설계와 구현에 흥미가 생겼습니다.
- Javascript와 DOM 문법을 활용해서 서버에 데이터를 요청하는 실제 동작 기능을 개발하면서 웹 개발에 대한 흥미가 높아졌습니다.

## 실행화면
- 메인화면
<img src="https://storage.googleapis.com/next-step-assets/gooreum/main.png" />
- 로그인
<img src="https://storage.googleapis.com/next-step-assets/gooreum/login.png" />
<img src="https://storage.googleapis.com/next-step-assets/gooreum/login-success.png" />
- 마이페이지
<img src="https://storage.googleapis.com/next-step-assets/gooreum/info.png" />
`,
    },
    {
        id: 6,
        title: "미니 게시판",
        description:
            "JDBC와 Oracle DB를 활용한 콘솔 기반의 게시판 프로젝트입니다. 글 작성과 댓글 기능이 구현되어 있습니다.",
        image: "https://storage.googleapis.com/next-step-assets/miniboard.png",
        period: "2024.02 ~ 2024.03",
        members: "1명",
        stack: ["Java", "OracleDB", "JDBC"],
        github: ["https://github.com/codelily98/mini_project"], // 실제 주소로 교체
        content: `
## 미니 게시판

간단한 게시판 프로젝트를 구상하였습니다. 글을 작성하고 댓글을 달 수 있는 게시판을 구현했습니다.

## 기술스택

<img src="https://storage.googleapis.com/next-step-assets/miniboard/stack.png" />

## ERD

<img src="https://storage.googleapis.com/next-step-assets/miniboard/erd.png" />

## FLOWCHART

<img src="https://storage.googleapis.com/next-step-assets/miniboard/flowchart.png" />

## 기능

- 회원
  - 회원가입
  - 로그인/로그아웃
  - 정보수정
  - 회원탈퇴
- 게시판
  - 글 작성/수정/삭제
  - 댓글 작성/수정/삭제

## 프로젝트 구조

src
│
├── board
│   ├── bean
│   │   ├── BoardCommentsDTO.java
│   │   ├── BoardPostsDTO.java
│   │   └── UsersStatusDTO.java
│   │
│   ├── dao
│   │   ├── BoardCommentsDAO.java
│   │   ├── BoardPostsDAO.java
│   │   └── UsersStatusDAO.java
│   │
│   ├── main
│   │   └── BoardMain.java
│   │
│   ├── service
│   │   ├── Board.java (interface)
│   │   └── BoardService.java
│   │
│   ├── boardcomments
│   │   └── service
│   │       ├── BoardCommentsDelete.java
│   │       ├── BoardCommentsList.java
│   │       ├── BoardCommentsUpdate.java
│   │       └── BoardCommentsWrite.java
│   │
│   ├── boardposts
│   │   └── service
│   │       ├── BoardPostsDelete.java
│   │       ├── BoardPostsList.java
│   │       ├── BoardPostsService.java
│   │       ├── BoardPostsUpdate.java
│   │       └── BoardPostsWrite.java
│   │
│   └── usersstatus
│       └── service
│           ├── UsersStatusDelete.java
│           ├── UsersStatusLogin.java
│           ├── UsersStatusLogOut.java
│           ├── UsersStatusService.java
│           ├── UsersStatusUpdate.java
│           └── UsersStatusWrite.java

## 역할 (BE/FE)

- **BE**
  - 프로젝트 구조 및 기능 설계/구현
  - Oracle DB 테이블 설계 및 구현
  - 회원 기능 구현 (회원가입/탈퇴, 로그인/로그아웃, 정보수정)
  - 커뮤니티 기능 구현 (글/댓글 작성/수정/삭제)

## 성과

- JDBC를 활용한 Oracle DB 연동
- Java 인터페이스 기반 프로그램 구조 이해

## 프로젝트 리뷰

- **Keep**  
  - 성공적인 DB 연동

- **Problem**  
  - 콘솔 기반이라 가독성과 활용성이 떨어짐  
    - 추후 HTML/CSS를 학습하여 개선 예정

## 느낀점

- Java의 인터페이스와 구조화를 통해 프로그램 구성 방식 이해
- JDBC와 DB 연동, 입력 기반 로직 구현 경험

## 실행화면
- **메인화면**
<img src="https://storage.googleapis.com/next-step-assets/miniboard/run/main.png" />
- **회원가입**
<img src="https://storage.googleapis.com/next-step-assets/miniboard/run/register.png" />
- **로그인**
<img src="https://storage.googleapis.com/next-step-assets/miniboard/run/login-success.png" />
<img src="https://storage.googleapis.com/next-step-assets/miniboard/run/login-fail.png" />
- **마이페이지**
<img src="https://storage.googleapis.com/next-step-assets/miniboard/run/info.png" />
<img src="https://storage.googleapis.com/next-step-assets/miniboard/run/info-update.png" />
- **게시판**
<img src="https://storage.googleapis.com/next-step-assets/miniboard/run/board-menu.png" />
- 게시글 목록
<img src="https://storage.googleapis.com/next-step-assets/miniboard/run/board-list.png" />
- 게시글 상세보기
<img src="https://storage.googleapis.com/next-step-assets/miniboard/run/board-details.png" />
- 게시글 작성
<img src="https://storage.googleapis.com/next-step-assets/miniboard/run/board-write.png" />
- 게시글 수정
<img src="https://storage.googleapis.com/next-step-assets/miniboard/run/board-update.png" />
- 게시글 삭제
<img src="https://storage.googleapis.com/next-step-assets/miniboard/run/board-delete.png" />
- 댓글 작성
<img src="https://storage.googleapis.com/next-step-assets/miniboard/run/board-comment.png" />
- 댓글 수정
<img src="https://storage.googleapis.com/next-step-assets/miniboard/run/board-update.png" />
- 댓글 삭제
<img src="https://storage.googleapis.com/next-step-assets/miniboard/run/board-delete.png" />
`,
    },
];
