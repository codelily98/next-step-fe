import axios, { AxiosError, AxiosRequestConfig } from "axios";
import useAuthStore from "../store/AuthStore";

const API_BASE_URL =
    import.meta.env.VITE_APP_API_BASE_URL ||
    "https://api.portfolio-nextstep.info";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // ✅ refreshToken 쿠키 포함
});

// 요청 인터셉터: Access Token 자동 첨부
api.interceptors.request.use(
    (config) => {
        // ✅ localStorage 대신 Zustand 스토어의 accessToken 사용
        const accessToken = useAuthStore.getState().accessToken;
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터: accessToken 만료 시 자동 재발급 및 재요청
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {
            _retry?: boolean;
        };

        // 토큰 만료로 401이 발생했고, 아직 재시도한 적 없는 요청이라면
        // refresh-token 엔드포인트 자체에 대한 401은 재시도하지 않음 (무한 루프 방지)
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            originalRequest.url !== `${API_BASE_URL}/api/auth/refresh-token`
        ) {
            originalRequest._retry = true;

            try {
                // refresh-token 쿠키 포함 요청으로 accessToken 재발급 시도
                const res = await axios.post(
                    `${API_BASE_URL}/api/auth/refresh-token`,
                    {},
                    { withCredentials: true }
                );

                const newAccessToken = res.data.accessToken;
                if (newAccessToken) {
                    // ✅ 새 accessToken을 Zustand 스토어에도 업데이트
                    useAuthStore.getState().setAccessToken(newAccessToken);
                    // localStorage.setItem("accessToken", newAccessToken); // Zustand persist가 처리하므로 불필요

                    // 헤더 업데이트 후 요청 재시도
                    originalRequest.headers = {
                        ...originalRequest.headers,
                        Authorization: `Bearer ${newAccessToken}`,
                    };

                    return api(originalRequest);
                }
            } catch (refreshError) {
                console.error("❌ 토큰 갱신 실패:", refreshError);
                // 갱신 실패 시 useAuthStore의 logout 액션 호출
                useAuthStore.getState().logout();
                // logout 액션 내부에서 localStorage 제거 및 페이지 이동 처리해야 함
            }
        }

        return Promise.reject(error);
    }
);

export default api;
