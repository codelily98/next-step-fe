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
import api from "../api";

const Info = () => {
    const { isAuthenticated, user, accessToken } = useAuthStore();
    const username = user?.username;

    const [nickname, setNickname] = useState(username || "");
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const [success, setSuccess] = useState<string | null>(null); // ✅ 성공 메시지 상태
    const [error, setError] = useState<string | null>(null); // 🔸 유효성/중복 에러
    const [checking, setChecking] = useState(false); // 🔸 중복 확인 중 상태

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            alert("로그인이 필요한 서비스입니다.");
            navigate("/login");
        }

        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (profileImage) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(profileImage);
        } else {
            setPreview(null);
        }
    }, [profileImage]);

    // ✅ 닉네임 유효성 + 중복 검사
    const validateNickname = async (): Promise<boolean> => {
        const trimmed = nickname.trim();

        // 유효성 검사
        if (trimmed.length < 2 || trimmed.length > 15) {
            setError("닉네임은 2자 이상 15자 이하여야 합니다.");
            setSuccess(null);
            return false;
        }

        // 기존 닉네임과 같으면 중복 검사 생략
        if (trimmed === username) {
            setError(null);
            setSuccess(null);
            return true;
        }

        try {
            setChecking(true);
            await api.post("/api/user/check-nickname", { nickname: trimmed });
            setError(null);
            setSuccess("사용 가능한 닉네임입니다."); // ✅ 성공 메시지
            return true;
        } catch (err: any) {
            setSuccess(null);
            if (err.response?.status === 409) {
                setError("이미 사용 중인 닉네임입니다.");
            } else {
                setError("닉네임 확인 중 오류가 발생했습니다.");
            }
            return false;
        } finally {
            setChecking(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isValid = await validateNickname();
        if (!isValid) return;

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
            // 새 닉네임을 상태에 반영하려면 store.updateUser() 호출 가능
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
                <label className={styles.label}>프로필 사진 변경</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setProfileImage(e.target.files?.[0] || null)
                    }
                    className={styles.input}
                />

                {preview && (
                    <img
                        src={preview}
                        alt="미리보기"
                        className={styles.preview}
                    />
                )}

                <label className={styles.label}>닉네임 변경</label>
                <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    onBlur={validateNickname}
                    className={styles.input}
                />
                {checking && (
                    <p className={styles.checking}>
                        닉네임 중복 확인 요청중...
                    </p>
                )}
                {error && <p className={styles.error}>{error}</p>}
                {success && !error && (
                    <p className={styles.success}>{success}</p>
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
