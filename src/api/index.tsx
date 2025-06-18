import axios, { AxiosError, AxiosRequestConfig } from "axios";
import type { AxiosRequestHeaders } from "axios";
import useAuthStore from "../store/AuthStore";

const API_BASE_URL =
    import.meta.env.VITE_APP_API_BASE_URL ||
    "https://api.portfolio-nextstep.info";

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // ✅ refreshToken을 포함한 쿠키 자동 전송
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ 요청 인터셉터: accessToken 자동 첨부
api.interceptors.request.use(
    (config) => {
        const accessToken = useAuthStore.getState().accessToken;

        if (!config.headers) {
            config.headers = {} as AxiosRequestHeaders;
        }

        if (accessToken) {
            (config.headers as AxiosRequestHeaders)[
                "Authorization"
            ] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ 응답 인터셉터: accessToken 갱신 감지 및 상태 저장
api.interceptors.response.use(
    (response) => {
        // ✅ accessToken이 응답 body에 있으면 상태 업데이트
        if (
            response.data &&
            typeof response.data === "object" &&
            "accessToken" in response.data &&
            typeof response.data.accessToken === "string"
        ) {
            const newAccessToken = response.data.accessToken;
            useAuthStore.getState().setAccessToken(newAccessToken);
            // 요청 재시도는 필요 없음 (자동 처리 됨)
        }

        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {
            _retry?: boolean;
        };

        // ✅ accessToken 재시도 로직 (만약 필터에서 응답 안 줄 경우 대비)
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            originalRequest.url !== `${API_BASE_URL}/api/auth/refresh-token`
        ) {
            originalRequest._retry = true;

            try {
                const res = await axios.post(
                    `${API_BASE_URL}/api/auth/refresh-token`,
                    {},
                    { withCredentials: true }
                );

                const newAccessToken = res.data.accessToken;
                if (newAccessToken) {
                    useAuthStore.getState().setAccessToken(newAccessToken);

                    originalRequest.headers = {
                        ...(originalRequest.headers || {}),
                        Authorization: `Bearer ${newAccessToken}`,
                    };

                    return api(originalRequest);
                }
            } catch (refreshError) {
                console.error("❌ 토큰 갱신 실패:", refreshError);
                useAuthStore.getState().logout();
            }
        }

        return Promise.reject(error);
    }
);

export default api;
