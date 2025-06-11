// src/api/index.ts
import axios from "axios";
// import useAuthStore from "../store/AuthStore";

const API_BASE_URL =
    import.meta.env.VITE_APP_API_BASE_URL || "https://portfolio-nextstep.info";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// 요청 인터셉터: 모든 요청에 Access Token 추가
api.interceptors.request.use(
    (config) => {
        // Zustand 스토어에서 직접 토큰을 가져오는 대신, localStorage에서 가져옵니다.
        // Zustand 스토어의 `accessToken`은 localStorage를 미러링하므로, 여기서는 localStorage에서 직접 읽는 것이 더 안전합니다.
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터 추가 (선택 사항): 토큰 만료 시 자동 로그아웃 처리 등을 여기에 추가할 수 있습니다.
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     // 예시: 401 Unauthorized 에러 발생 시 (토큰 만료 등)
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       // 여기에 Refresh Token을 사용하여 Access Token을 갱신하는 로직을 추가할 수 있습니다.
//       // 실패하면 useAuthStore.getState().logout() 호출
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
