import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Info from "./pages/Info";
import LoginPage from "./pages/User/LoginPage";
import RegisterPage from "./pages/User/Register";
import OAuth2RedirectHandler from "./store/OAuth2RedirectHandler";
// import useAuthStore from "./store/AuthStore"; // AuthStore 임포트

// // 인증이 필요한 라우트를 감싸는 PrivateRoute 컴포넌트
// const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
//     children,
// }) => {
//     const { isAuthenticated } = useAuthStore(); // useAuthStore에서 isAuthenticated 가져오기
//     return isAuthenticated ? children : <Navigate to="/login" />;
// };

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/info" element={<Info />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                {/* ✅ 카카오 로그인 성공/실패 시 백엔드에서 리다이렉트될 경로 */}
                <Route
                    path="/oauth2/callback"
                    element={<OAuth2RedirectHandler />}
                />
            </Routes>
        </>
    );
}

export default App;
