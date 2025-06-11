// src/api/index.ts (또는 src/utils/api.ts)
import axios from "axios";

// Vite에서는 import.meta.env를 사용하고, 환경 변수 이름 앞에 VITE_ 접두사가 붙어야 합니다.
const API_BASE_URL =
    import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:8080";

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
