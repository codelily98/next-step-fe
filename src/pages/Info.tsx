import { useRef, useEffect, useState } from "react";
import styles from "../css/pages/Info.module.css";
import useAuthStore from "../store/AuthStore";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Info = () => {
    const { isAuthenticated, user, accessToken, setAccessToken, login } =
        useAuthStore();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const username = user?.username;

    const [nickname, setNickname] = useState("");
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [checking, setChecking] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const clearProfileImage = () => {
        setProfileImage(null);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const fetchUserInfo = async (token: string) => {
        try {
            const res = await api.get("/api/user/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const { username, nickname, profileImageUrl } = res.data;
            login(token, { username, nickname, profileImageUrl });
            setNickname(nickname || "");
        } catch {
            toast.error("사용자 정보를 불러오는 데 실패했습니다.");
        }
    };

    useEffect(() => {
        if (!isAuthenticated) {
            toast.warn("로그인이 필요한 서비스입니다.");
            navigate("/login");
            return;
        }
        fetchUserInfo(accessToken || "");
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
            toast.error("닉네임은 2자 이상 15자 이하여야 합니다.");
            return false;
        }

        try {
            setChecking(true);
            const res = await api.post(
                "/api/user/check-nickname",
                { nickname: trimmed },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            toast.success(res.data);
            return true;
        } catch (err: unknown) {
            if ((err as any).response?.status === 409) {
                toast.error("이미 사용 중인 닉네임입니다.");
            } else {
                toast.error("닉네임 확인 중 오류가 발생했습니다.");
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
            setLoading(true);
            const res = await api.put("/api/user", formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            const { accessToken: newToken } = res.data;
            setAccessToken(newToken);
            await fetchUserInfo(newToken);
            toast.success("프로필이 성공적으로 수정되었습니다.");
            clearProfileImage();
        } catch {
            toast.error("수정 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`${styles.container} fade-in`}>
            <ToastContainer position="top-center" autoClose={2000} />
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
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className={styles.input}
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        const maxSizeMB = 50;
                        const allowedTypes = [
                            "image/jpeg",
                            "image/png",
                            "image/webp",
                            "image/gif",
                        ];

                        if (!allowedTypes.includes(file.type)) {
                            toast.error(
                                "JPG, PNG, WEBP, GIF 형식만 업로드 가능"
                            );
                            e.target.value = "";
                            setProfileImage(null);
                            return;
                        }

                        if (file.size > maxSizeMB * 1024 * 1024) {
                            toast.error(
                                "50MB 이하의 이미지만 업로드 가능합니다."
                            );
                            e.target.value = "";
                            setProfileImage(null);
                            return;
                        }

                        setProfileImage(file);
                    }}
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

                {checking && <p className={styles.checking}>중복 확인 중...</p>}

                <button
                    type="submit"
                    className={styles.button}
                    disabled={loading}
                >
                    {loading ? "저장 중..." : "저장"}
                </button>
            </form>
        </div>
    );
};

export default Info;
