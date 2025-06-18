import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import api from "../api"; // Axios 인스턴스 임포트

interface User {
    username: string;
    nickname?: string;
    profileImageUrl?: string; // ✅ 추가
}

interface AuthState {
    accessToken: string | null;
    isAuthenticated: boolean;
    user: User | null;
    isKakaoLogin: boolean;
    login: (accessToken: string, user: User, isKakaoLogin?: boolean) => void;
    logout: () => Promise<void>;
    setAccessToken: (token: string) => void;
    setKakaoLoginStatus: (status: boolean) => void;
    updateUser: (newUser: User) => void;
    refreshAccessToken: () => Promise<string | null>;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            accessToken: null,
            isAuthenticated: false,
            user: null,
            isKakaoLogin: false,

            login: (accessToken, user, isKakaoLogin = false) => {
                set({
                    accessToken,
                    isAuthenticated: true,
                    user,
                    isKakaoLogin,
                });
                console.log("로그인 성공. 사용자:", user);
            },

            setAccessToken: (token: string) => {
                if (token) {
                    set({ accessToken: token, isAuthenticated: true });
                } else {
                    set({ accessToken: null, isAuthenticated: false });
                }
            },

            setKakaoLoginStatus: (status: boolean) => {
                set({ isKakaoLogin: status });
            },

            updateUser: (newUser) => {
                set({ user: newUser });
                console.log("사용자 정보 업데이트:", newUser);
            },

            refreshAccessToken: async () => {
                console.warn(
                    "❗ 수동 호출은 필요하지 않습니다. 서버 필터에서 자동 재발급됩니다."
                );
                return null;
            },

            logout: async () => {
                const { accessToken, user, isKakaoLogin } = get();

                try {
                    if (accessToken) {
                        const endpoint = isKakaoLogin
                            ? "/api/auth/kakao/logout"
                            : "/api/auth/logout";

                        await api.post(endpoint, null, {
                            headers: { Authorization: `Bearer ${accessToken}` },
                        });

                        console.log(
                            `${isKakaoLogin ? "카카오" : "일반"} 사용자 ${
                                user?.username || "Unknown"
                            } 로그아웃 성공`
                        );
                    }
                } catch (error) {
                    console.error("❌ 로그아웃 API 호출 실패:", error);
                } finally {
                    set({
                        accessToken: null,
                        isAuthenticated: false,
                        user: null,
                        isKakaoLogin: false,
                    });
                    console.log("클라이언트 세션 초기화 완료");
                    window.location.href = "/login";
                }
            },
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                accessToken: state.accessToken,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                isKakaoLogin: state.isKakaoLogin,
            }),
        }
    )
);

export default useAuthStore;
