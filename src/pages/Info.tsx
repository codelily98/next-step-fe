// import { useEffect } from "react";
// import styles from "../css/pages/Info.module.css";
// import useAuthStore from "../store/AuthStore";
// import { useNavigate } from "react-router-dom";

// const Info = () => {
//     // AuthStore에서 필요한 상태들을 가져옵니다.
//     const { isAuthenticated, user, accessToken } = useAuthStore();
//     const username = user?.username; // user가 null일 경우를 대비하여 옵셔널 체이닝 사용

//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!isAuthenticated) {
//             alert("로그인이 필요한 서비스입니다.");
//             navigate("/login");
//         }

//         window.scrollTo(0, 0);
//     });

//     return (
//         <div className={styles.container}>
//             <h1 className={styles.h1}>
//                 <span className={styles.strong}>{username}</span>님
//             </h1>

//             {/* ⭐ 토큰 값 표시 ⭐ */}
//             {isAuthenticated && ( // 로그인 상태일 때만 토큰 표시
//                 <div className={styles.tokenInfo}>
//                     <p className={styles.tokenTitle}>
//                         성공적으로 Token이 발급되었습니다.
//                     </p>
//                     <p className={styles.p}>
//                         <strong className={styles.strong}>Access Token:</strong>{" "}
//                         <span className={styles.tokenValue}>
//                             {accessToken || "없음"}
//                         </span>
//                     </p>
//                     <p className={styles.p}>
//                         <strong className={styles.strong}>
//                             Refresh Token:
//                         </strong>{" "}
//                         <span className={styles.tokenValue}>
//                             {"서버에서 Cookie로 발급"}
//                         </span>
//                     </p>
//                     {/* 필요하다면 토큰 디코딩 값도 표시 가능 */}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Info;

import { useEffect, useState } from "react";
import styles from "../css/pages/Info.module.css";
import useAuthStore from "../store/AuthStore";
import { useNavigate } from "react-router-dom";
import api from "../api"; // axios 인스턴스

const Info = () => {
    const { isAuthenticated, user, accessToken } = useAuthStore();
    const username = user?.username;

    const [nickname, setNickname] = useState(username || "");
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            alert("로그인이 필요한 서비스입니다.");
            navigate("/login");
        }

        window.scrollTo(0, 0);
    }, [isAuthenticated, navigate]);

    // 프로필 이미지 미리보기 처리
    useEffect(() => {
        if (profileImage) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(profileImage);
        } else {
            setPreview(null);
        }
    }, [profileImage]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nickname", nickname);
        if (profileImage) {
            formData.append("profileImage", profileImage);
        }

        try {
            await api.put("/api/user", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            alert("정보가 성공적으로 수정되었습니다.");
            // 상태 초기화 또는 새로고침
        } catch (err) {
            console.error(err);
            alert("수정 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>
                <span className={styles.strong}>{username}</span>님
            </h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                    닉네임 변경:
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className={styles.input}
                    />
                </label>

                <label>
                    프로필 사진 변경:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setProfileImage(e.target.files?.[0] || null)
                        }
                        className={styles.input}
                    />
                </label>

                {preview && (
                    <img
                        src={preview}
                        alt="미리보기"
                        className={styles.preview}
                    />
                )}

                <button type="submit" className={styles.button}>
                    저장
                </button>
            </form>

            {isAuthenticated && (
                <div className={styles.tokenInfo}>
                    <p className={styles.tokenTitle}>
                        성공적으로 Token이 발급되었습니다.
                    </p>
                    <p className={styles.p}>
                        <strong className={styles.strong}>Access Token:</strong>{" "}
                        <span className={styles.tokenValue}>
                            {accessToken || "없음"}
                        </span>
                    </p>
                    <p className={styles.p}>
                        <strong className={styles.strong}>
                            Refresh Token:
                        </strong>{" "}
                        <span className={styles.tokenValue}>
                            {"서버에서 Cookie로 발급"}
                        </span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default Info;
