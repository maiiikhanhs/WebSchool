import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Import các component của Sinh viên
import DashboardSinhvien from "./components/sinhvien/DashboardSinhvien";
// Import các component của Giảng viên
import DashboardGiangVien from "./components/giangvien/DashboardGiangVien";

// Import các component liên quan đến xác thực
import Login from "./components/auth/Login";
import ChangePassword from "./components/auth/ChangePassword";
import Unauthorized from "./components/auth/Unauthorized";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Hàm lấy vai trò người dùng từ localStorage
const getUserRole = () => {
  const user = localStorage.getItem("user");
  if (!user) return null;
  try {
    return JSON.parse(user).role;
  } catch (error) {
    return null;
  }
};

function App() {
  const [userRole, setUserRole] = useState<string | null>(getUserRole());

  useEffect(() => {
    const handleStorageChange = () => setUserRole(getUserRole());

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Điều hướng mặc định */}
        <Route
          path="/"
          element={
            userRole === "sinh_vien" ? <Navigate to="/dashboard/sinhvien" replace />
              : userRole === "giang_vien" ? <Navigate to="/dashboard/giangvien" replace />
                : userRole === "truong_khoa" ? <Navigate to="/login" replace />
                  : <Navigate to="/login" replace />
          }
        />

        {/* Trang đăng nhập */}
        <Route path="/login" element={<Login />} />

        {/* Trang đổi mật khẩu */}
        <Route path="/change-password" element={<ChangePassword />} />

        {/* Trang lỗi quyền truy cập */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Bảo vệ các trang dành riêng cho Sinh viên */}
        <Route element={<ProtectedRoute allowedRoles={["sinh_vien"]} />}>
          <Route path="/dashboard/sinhvien" element={<DashboardSinhvien />} />
        </Route>

        {/* Bảo vệ các trang dành riêng cho Giảng viên */}
        <Route element={<ProtectedRoute allowedRoles={["giang_vien"]} />}>
          <Route path="/dashboard/giangvien" element={<DashboardGiangVien />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;