import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

type User = {
    id: string;
    email: string;
    nickname: string;
    role: string;
};

type AuthState = {
    user: User | null;
    isLoggedIn: boolean;
    setUser: (user: User) => void;
    logout: () => void;
};

// persist 옵션 타입을 추가로 확장해서 타입 충돌 해결
type AuthStore = PersistOptions<
    AuthState,
    {
        user: User | null;
        isLoggedIn: boolean;
    }
>;

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isLoggedIn: false,
            setUser: (user) => set({ user, isLoggedIn: true }),
            logout: () => set({ user: null, isLoggedIn: false }),
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user,
                isLoggedIn: state.isLoggedIn,
            }),
        } as AuthStore // 🔥 여기서 타입 확장 강제 지정
    )
);
