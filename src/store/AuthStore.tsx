import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import api from "../api";

interface User {
    username: string;
    nickname?: string;
    profileImageUrl?: string;
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
    updateUser: (newUser: Partial<User>, newToken?: string) => void;
    refreshAccessToken: () => Promise<string | null>;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            accessToken: null,
            isAuthenticated: false,
            user: null,
            isKakaoLogin: false,

            // ✅ 로그인 시 전체 유저 객체를 넘김
            login: (accessToken, user, isKakaoLogin = false) => {
                set({
                    accessToken,
                    isAuthenticated: true,
                    user,
                    isKakaoLogin,
                });
                console.log("✅ 로그인 성공:", user);
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

            // ✅ 업데이트된 필드만 병합하며, 토큰도 갱신 가능
            updateUser: (newUser, newToken) => {
                const current = get().user || { username: "" };
                const merged = { ...current, ...newUser };

                set({
                    user: merged,
                    ...(newToken && {
                        accessToken: newToken,
                        isAuthenticated: true,
                    }),
                });

                console.log("🔄 사용자 정보 업데이트:", merged);
            },

            refreshAccessToken: async () => {
                console.warn(
                    "❗ 자동 재발급 구조에서는 수동 호출이 필요 없습니다."
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
