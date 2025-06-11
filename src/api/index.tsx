import axios from "axios";

const API_BASE_URL =
    import.meta.env.VITE_APP_API_BASE_URL ||
    "https://api.portfolio-nextstep.info";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키나 인증정보 포함 (필수)
});

// 요청 인터셉터: 모든 요청에 Access Token 추가
api.interceptors.request.use(
    (config) => {
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

// 응답 인터셉터 (선택 사항)
// api.interceptors.response.use(...)

export default api;
