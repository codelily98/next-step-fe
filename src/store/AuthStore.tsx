import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"; // createJSONStorage 임포트 추가
import api from "../api"; // Axios 인스턴스 임포트

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
    logout: () => Promise<void>;
    setAccessToken: (token: string) => void;
}

// persist 미들웨어를 사용하여 Zustand 스토어를 정의합니다.
const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            // set과 get 함수를 모두 사용하기 위해 get을 추가
            accessToken: null, // persist가 초기값을 localStorage에서 가져오므로 null로 설정
            refreshToken: null, // persist가 초기값을 localStorage에서 가져오므로 null로 설정
            isAuthenticated: false, // persist가 초기값을 localStorage에서 가져오므로 false로 설정
            user: null, // persist가 초기값을 localStorage에서 가져오므로 null로 설정

            login: (accessToken, refreshToken, username) => {
                // persist 미들웨어가 알아서 localStorage에 저장하므로,
                // 여기서 직접 localStorage.setItem 호출은 제거합니다.
                set({
                    accessToken,
                    refreshToken,
                    isAuthenticated: true,
                    user: { username },
                });
                console.log("로그인 성공. 사용자:", username);
            },

            logout: async () => {
                // Zustand의 현재 상태에서 accessToken과 refreshToken을 가져옵니다.
                const { accessToken, refreshToken, user } = get(); // get() 함수를 사용

                try {
                    if (accessToken && refreshToken) {
                        await api.post("/api/auth/logout", null, {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                                "Refresh-Token": refreshToken,
                            },
                        });
                        console.log(
                            `사용자 ${
                                user?.username || "Unknown"
                            } 로그아웃 성공 (백엔드).`
                        );
                    } else {
                        console.warn(
                            "로그아웃 시도: Access Token 또는 Refresh Token이 없습니다."
                        );
                    }
                } catch (error) {
                    console.error("백엔드 로그아웃 실패:", error);
                    // 백엔드에서 로그아웃 실패하더라도 (예: 이미 토큰 만료),
                    // 프론트에서는 로컬 토큰을 삭제하여 로그아웃 상태로 만듭니다.
                    alert(
                        "로그아웃 처리 중 오류가 발생했지만, 세션이 종료됩니다."
                    );
                } finally {
                    // 성공/실패 여부와 상관없이 Zustand 상태 초기화 (persist가 localStorage도 초기화)
                    set({
                        accessToken: null,
                        refreshToken: null,
                        isAuthenticated: false,
                        user: null,
                    });
                    console.log("클라이언트 로그아웃 상태 초기화.");
                    // 로그아웃 후 리다이렉트는 컴포넌트에서 처리
                }
            },

            setAccessToken: (token: string) => {
                // persist 미들웨어가 알아서 localStorage에 저장하므로,
                // 여기서 직접 localStorage.setItem 호출은 제거합니다.
                set({ accessToken: token });
            },
        }),
        {
            name: "auth-storage", // localStorage에 저장될 키 이름 (필수)
            storage: createJSONStorage(() => localStorage), // 사용할 스토리지 지정
            // 스토리지에 저장하고 싶은 상태만 선택적으로 지정할 수도 있습니다.
            // partialize: (state) => ({
            //     accessToken: state.accessToken,
            //     refreshToken: state.refreshToken,
            //     isAuthenticated: state.isAuthenticated,
            //     user: state.user // user 객체도 저장
            // }),
        }
    )
);

export default useAuthStore;
