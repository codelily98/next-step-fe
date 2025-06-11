// src/api/index.ts (또는 src/utils/api.ts)
import axios from "axios";

// 백엔드 API의 기본 URL을 설정합니다.
// 개발 환경에서는 로컬 백엔드 주소를 사용하고, 배포 시에는 실제 서버 주소로 변경합니다.
// .env 파일을 사용하여 환경 변수로 관리하는 것이 좋습니다.
const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"; // 또는 React App의 경우 process.env.REACT_APP_API_BASE_URL

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// 필요한 경우, 토큰 인터셉터를 추가할 수 있습니다.
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('accessToken'); // 또는 AuthStore에서 가져옴
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;
