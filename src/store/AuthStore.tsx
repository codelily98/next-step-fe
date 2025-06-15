import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import api from "../api"; // Axios 인스턴스 임포트

interface AuthState {
    accessToken: string | null;
    // refreshToken: string | null; // Refresh Token은 이제 localStorage에 저장하지 않으므로 제거
    isAuthenticated: boolean;
    user: { username: string } | null;
    login: (
        accessToken: string,
        // refreshToken: string, // 이제 로그인 시 Refresh Token을 인자로 받지 않습니다.
        username: string
    ) => void;
    logout: () => Promise<void>;
    setAccessToken: (token: string) => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            accessToken: null,
            // refreshToken: null, // 제거
            isAuthenticated: false,
            user: null,

            // 로그인 시 Access Token만 받아서 저장
            login: (accessToken, username) => {
                // refreshToken 인자 제거
                set({
                    accessToken,
                    // refreshToken: null, // 제거
                    isAuthenticated: true,
                    user: { username },
                });
                console.log("로그인 성공. 사용자:", username);
            },

            logout: async () => {
                const { accessToken, user } = get(); // refreshToken 제거

                try {
                    if (accessToken) {
                        // Access Token만 확인
                        await api.post("/api/auth/logout", null, {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                                // "Refresh-Token": refreshToken, // Refresh Token 헤더 제거 (백엔드는 쿠키를 기대)
                            },
                        });
                        console.log(
                            `사용자 ${
                                user?.username || "Unknown"
                            } 로그아웃 성공 (백엔드).`
                        );
                    } else {
                        console.warn(
                            "로그아웃 시도: Access Token이 없습니다." // 경고 메시지 변경
                        );
                    }
                } catch (error) {
                    console.error("백엔드 로그아웃 실패:", error);
                    alert(
                        "로그아웃 처리 중 오류가 발생했지만, 세션이 종료됩니다."
                    );
                } finally {
                    set({
                        accessToken: null,
                        // refreshToken: null, // 제거
                        isAuthenticated: false,
                        user: null,
                    });
                    console.log("클라이언트 로그아웃 상태 초기화.");
                }
            },

            setAccessToken: (token: string) => {
                set({ accessToken: token });
            },
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
            // 스토리지에 저장하고 싶은 상태만 선택적으로 지정
            // Refresh Token은 이제 localStorage에 저장하지 않으므로 partialize를 명시하는 것이 좋습니다.
            partialize: (state) => ({
                accessToken: state.accessToken,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
            }),
        }
    )
);

export default useAuthStore;
