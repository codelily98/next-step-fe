// src/store/AuthStore.tsx
import { create } from "zustand";

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    user: { username: string } | null;
    login: (
        accessToken: string,
        refreshToken: string,
        username: string
    ) => void;
    logout: () => void;
    setAccessToken: (token: string) => void;
}

const useAuthStore = create<AuthState>((set) => ({
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    isAuthenticated: !!localStorage.getItem("accessToken"), // 새로고침 시에도 로그인 상태 유지
    user: localStorage.getItem("username")
        ? { username: localStorage.getItem("username")! }
        : null,

    login: (accessToken, refreshToken, username) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("username", username);
        set({
            accessToken,
            refreshToken,
            isAuthenticated: true,
            user: { username },
        });
    },

    logout: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("username");
        set({
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            user: null,
        });
    },

    setAccessToken: (token: string) => {
        localStorage.setItem("accessToken", token);
        set({ accessToken: token });
    },
}));

export default useAuthStore;
