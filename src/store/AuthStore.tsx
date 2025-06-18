// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
// import api from "../api"; // Axios 인스턴스 임포트

// interface AuthState {
//     accessToken: string | null;
//     isAuthenticated: boolean;
//     user: { username: string } | null;
//     login: (accessToken: string, username: string) => void;
//     logout: () => Promise<void>;
//     setAccessToken: (token: string) => void;
//     // 카카오 로그인 여부 상태 추가 (선택 사항)
//     isKakaoLogin: boolean;
//     setKakaoLoginStatus: (status: boolean) => void;
// }

// const useAuthStore = create<AuthState>()(
//     persist(
//         (set, get) => ({
//             accessToken: null,
//             isAuthenticated: false,
//             user: null,
//             isKakaoLogin: false, // 기본값 false

//             login: (accessToken, username) => {
//                 set({
//                     accessToken,
//                     isAuthenticated: true,
//                     user: { username },
//                     // 일반 로그인 시 isKakaoLogin은 false로 설정
//                     isKakaoLogin: false,
//                 });
//                 console.log("로그인 성공. 사용자:", username);
//             },

//             // ✅ Access Token만 설정하는 함수 (OAuth2RedirectHandler에서 사용)
//             setAccessToken: (token: string) => {
//                 set({ accessToken: token, isAuthenticated: true });
//                 // 카카오 로그인인지 여부는 이 함수 호출 시점에는 알 수 없음.
//                 // OAuth2RedirectHandler에서 로그인 시 isKakaoLogin을 true로 설정하는 로직 필요
//             },

//             // ✅ 카카오 로그인 상태 설정 함수
//             setKakaoLoginStatus: (status: boolean) => {
//                 set({ isKakaoLogin: status });
//             },

//             logout: async () => {
//                 const { accessToken, user, isKakaoLogin } = get();

//                 try {
//                     if (accessToken) {
//                         if (isKakaoLogin) {
//                             // ✅ 카카오 로그아웃 API 호출
//                             await api.post("/api/auth/kakao/logout", null, {
//                                 headers: {
//                                     Authorization: `Bearer ${accessToken}`,
//                                 },
//                             });
//                             console.log(
//                                 `카카오 사용자 ${
//                                     user?.username || "Unknown"
//                                 } 로그아웃 성공 (백엔드).`
//                             );
//                         } else {
//                             // ✅ 일반 사용자 로그아웃 API 호출 (refreshToken 쿠키는 withCredentials로 자동 전송)
//                             await api.post("/api/auth/logout", null, {
//                                 headers: {
//                                     Authorization: `Bearer ${accessToken}`,
//                                 },
//                             });
//                             console.log(
//                                 `일반 사용자 ${
//                                     user?.username || "Unknown"
//                                 } 로그아웃 성공 (백엔드).`
//                             );
//                         }
//                     } else {
//                         console.warn(
//                             "로그아웃 시도: Access Token이 없습니다. 클라이언트 상태만 초기화합니다."
//                         );
//                     }
//                 } catch (error) {
//                     console.error("백엔드 로그아웃 실패:", error);
//                     alert(
//                         "로그아웃 처리 중 오류가 발생했지만, 클라이언트 세션이 종료됩니다."
//                     );
//                 } finally {
//                     // ✅ 클라이언트 상태 초기화 (어떤 방식으로 로그인했든)
//                     set({
//                         accessToken: null,
//                         isAuthenticated: false,
//                         user: null,
//                         isKakaoLogin: false, // 로그아웃 시 카카오 로그인 상태도 초기화
//                     });
//                     console.log("클라이언트 로그아웃 상태 초기화.");
//                     // ✅ 로그아웃 성공 후 로그인 페이지로 리다이렉트
//                     window.location.href = "/login";
//                 }
//             },
//         }),
//         {
//             name: "auth-storage",
//             storage: createJSONStorage(() => localStorage),
//             partialize: (state) => ({
//                 accessToken: state.accessToken,
//                 isAuthenticated: state.isAuthenticated,
//                 user: state.user,
//                 isKakaoLogin: state.isKakaoLogin, // ✅ isKakaoLogin 상태도 저장
//             }),
//         }
//     )
// );

// export default useAuthStore;

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import api from "../api"; // Axios 인스턴스 임포트

interface User {
    username: string;
    nickname?: string;
}

interface AuthState {
    accessToken: string | null;
    isAuthenticated: boolean;
    user: User | null;
    isKakaoLogin: boolean;
    login: (accessToken: string, user: User) => void;
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

            login: (accessToken, user) => {
                set({
                    accessToken,
                    isAuthenticated: true,
                    user,
                    isKakaoLogin: false,
                });
                console.log(
                    "\uB85C\uADF8\uC778 \uC131\uACF5. \uC0AC\uC6A9\uC790:",
                    user
                );
            },

            setAccessToken: (token: string) => {
                set({ accessToken: token, isAuthenticated: true });
            },

            setKakaoLoginStatus: (status: boolean) => {
                set({ isKakaoLogin: status });
            },

            updateUser: (newUser) => {
                set({ user: newUser });
                console.log(
                    "\uC0AC\uC6A9\uC790 \uC815\uBCF4 \uC5C5\uB370\uC774\uD2B8:",
                    newUser
                );
            },

            refreshAccessToken: async () => {
                try {
                    const res = await api.post(
                        "/api/auth/refresh-token",
                        null,
                        {
                            withCredentials: true,
                        }
                    );
                    const newAccessToken = res.data.accessToken;
                    set({ accessToken: newAccessToken, isAuthenticated: true });
                    console.log("Access Token \uAC31\uC2E0 \uC131\uACF5");
                    return newAccessToken;
                } catch (error) {
                    console.error(
                        "Access Token \uAC31\uC2E0 \uC2E4\uD328:",
                        error
                    );
                    set({
                        accessToken: null,
                        isAuthenticated: false,
                        user: null,
                        isKakaoLogin: false,
                    });
                    return null;
                }
            },

            logout: async () => {
                const { accessToken, user, isKakaoLogin } = get();

                try {
                    if (accessToken) {
                        if (isKakaoLogin) {
                            await api.post("/api/auth/kakao/logout", null, {
                                headers: {
                                    Authorization: `Bearer ${accessToken}`,
                                },
                            });
                            console.log(
                                `\uCE74\uCE74\uC624 \uC0AC\uC6A9\uC790 ${
                                    user?.username || "Unknown"
                                } \uB85C\uADF8\uC544\uC6C3 \uC131\uACF5`
                            );
                        } else {
                            await api.post("/api/auth/logout", null, {
                                headers: {
                                    Authorization: `Bearer ${accessToken}`,
                                },
                            });
                            console.log(
                                `\uC77C\uBC18 \uC0AC\uC6A9\uC790 ${
                                    user?.username || "Unknown"
                                } \uB85C\uADF8\uC544\uC6C3 \uC131\uACF5`
                            );
                        }
                    } else {
                        console.warn(
                            "\uB85C\uADF8\uC544\uC6C3 \uC2DC\uB3C4: Access Token\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."
                        );
                    }
                } catch (error) {
                    console.error(
                        "\uBC31\uC5C5\uC5D0 \uB300\uD55C \uB85C\uADF8\uC544\uC6C3 \uC2E4\uD328:",
                        error
                    );
                    alert(
                        "\uB85C\uADF8\uC544\uC6C3 \uCC98\uB9AC \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC9C0\uB9CC, \uD074\uB77C\uC774\uC5B8\uD2B8 \uC138\uC158\uC774 \uC885\uB8CC\uB429\uB2C8\uB2E4."
                    );
                } finally {
                    set({
                        accessToken: null,
                        isAuthenticated: false,
                        user: null,
                        isKakaoLogin: false,
                    });
                    console.log(
                        "\uD074\uB77C\uC774\uC5B8\uD2B8 \uB85C\uADF8\uC544\uC6C3 \uC0C1\uD0DC \uCD08\uAE30\uD654."
                    );
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
