import { useRef, useEffect, useState } from "react";
import styles from "../css/pages/Info.module.css";
import useAuthStore from "../store/AuthStore";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Info = () => {
    const { isAuthenticated, user, accessToken, setAccessToken, login } =
        useAuthStore();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const username = user?.username;

    const [nickname, setNickname] = useState("");
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [checking, setChecking] = useState(false);

    const navigate = useNavigate();

    const clearProfileImage = () => {
        setProfileImage(null);
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const fetchUserInfo = async () => {
        try {
            const res = await api.get("/api/user/me", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setNickname(res.data.nickname || "");
        } catch (err) {
            console.error("사용자 정보 불러오기 실패", err);
        }
    };

    useEffect(() => {
        if (!isAuthenticated) {
            alert("로그인이 필요한 서비스입니다.");
            navigate("/login");
            return;
        }

        fetchUserInfo();
        window.scrollTo(0, 0);
    }, [isAuthenticated, accessToken, navigate]);

    useEffect(() => {
        if (profileImage) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(profileImage);
        } else {
            setPreview(null);
        }
    }, [profileImage]);

    const validateNickname = async (): Promise<boolean> => {
        const trimmed = nickname.trim();

        if (trimmed.length < 2 || trimmed.length > 15) {
            setError("닉네임은 2자 이상 15자 이하여야 합니다.");
            setSuccess(null);
            return false;
        }

        try {
            setChecking(true);
            const res = await api.post(
                "/api/user/check-nickname",
                { nickname: trimmed },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setSuccess(res.data);
            setError(null);
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
        formData.append("nickname", nickname.trim());
        if (profileImage) formData.append("profileImage", profileImage);

        try {
            const res = await api.put("/api/user", formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            const {
                accessToken: newToken,
                nickname: newNickname,
                profileImageUrl,
            } = res.data;

            // ✅ 상태 반영
            setSuccess("정보가 성공적으로 수정되었습니다.");
            setError(null);
            setProfileImage(null);
            setPreview(null);

            // ✅ 토큰 및 사용자 정보 업데이트
            setAccessToken(newToken);
            useAuthStore.getState().updateUser({
                username: username ?? "",
                nickname: newNickname,
                profileImageUrl,
            });
        } catch (err) {
            console.error(err);
            alert("수정 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>
                <span className={styles.strong}>{username}</span>님
                {user?.profileImageUrl && (
                    <div className={styles.profileWrap}>
                        <img
                            src={user.profileImageUrl}
                            alt="프로필 이미지"
                            className={styles.profileImage}
                        />
                    </div>
                )}
            </h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>프로필 사진 변경</label>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setProfileImage(e.target.files?.[0] || null)
                    }
                    className={styles.input}
                />

                {preview && (
                    <div className={styles.previewContainer}>
                        <img
                            src={preview}
                            alt="미리보기"
                            className={styles.preview}
                        />
                        <button
                            type="button"
                            onClick={clearProfileImage}
                            className={styles.deleteButton}
                        >
                            이미지 삭제
                        </button>
                    </div>
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
                    <p className={styles.checking}>닉네임 중복 확인 중...</p>
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
