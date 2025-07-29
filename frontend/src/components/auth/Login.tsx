import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login/Auth.css";

const TRUONG_KHOA_URL = import.meta.env.VITE_TRUONG_KHOA_URL

export default function Login() {
    useEffect(() => {
        document.title = 'Login';
    }, []);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Email hoặc mật khẩu không đúng!");
                return;
            }

            const user = data.user;

            // 🛠 Lưu toàn bộ dữ liệu user vào localStorage
            localStorage.setItem("user", JSON.stringify(user));
            console.log(localStorage.getItem("user"));

            // Điều hướng theo vai trò
            switch (user.role) {
                case "truong_khoa":
                    window.location.href = TRUONG_KHOA_URL;
                    break;
                case "giang_vien":
                    navigate("/dashboard/giangvien");
                    break;
                case "sinh_vien":
                    navigate("/dashboard/sinhvien");
                    break;
                default:
                    setError("Vai trò không hợp lệ!");
            }

        } catch (error) {
            setError("Lỗi kết nối đến server!");
        }
    };


    return (
        <div className="auth-container">
            <div className="header-login">
                <h1 className="faculty">KHOA CÔNG NGHỆ THÔNG TIN</h1>
                <h3 className="university">TRƯỜNG ĐẠI HỌC THỦY LỢI</h3>
            </div>
            <div className="auth-box">
                <h2>ĐĂNG NHẬP</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleLogin}>
                    <label>Email</label>
                    <input type="email" placeholder="Nhập email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <label>Password</label>
                    <input type="password" placeholder="Nhập mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <button type="submit" className="btn-login">ĐĂNG NHẬP</button>
                </form>
                <a href="#">Quên mật khẩu?</a>
            </div>
        </div>
    );
}