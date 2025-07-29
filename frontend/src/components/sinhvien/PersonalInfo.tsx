import { useState, useEffect } from "react";
import "../../styles/sinhvien/PersonalInfo.css";
import UpdateForm from "./UpdateForm";

export default function PersonalInfo() {
  const [currentPage, setCurrentPage] = useState("personal-info");
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
    major: "Chưa cập nhật",
    majorCode: "N/A",
    studentId: "N/A",
    class: "Chưa cập nhật",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser.email) {
      setPersonalInfo((prev) => ({
        ...prev,
        fullName: storedUser.ho_ten || "",
        gender: storedUser.gioi_tinh || "",
        dob: storedUser.ngay_sinh ? storedUser.ngay_sinh.split("T")[0] : "",
        phone: storedUser.so_dien_thoai || "",
        email: storedUser.email || "",
        studentId: storedUser.username || "N/A",
      }));

      fetch(`/api/sinh-vien/${storedUser.username}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            const sinhVien = data[0];
            setPersonalInfo((prev) => ({
              ...prev,
              major: sinhVien.ten_nganh || "Chưa cập nhật",
              majorCode: sinhVien.ma_nganh || "N/A",
              class: sinhVien.lop || "Chưa cập nhật",
            }));
          }
        })
        .catch((err) => console.error("Lỗi khi lấy thông tin sinh viên:", err));
    }
  }, []);

  const fieldLabels: Record<string, string> = {
    fullName: "Họ và tên",
    gender: "Giới tính",
    dob: "Ngày sinh",
    phone: "Số điện thoại",
    email: "Email",
    major: "Chuyên ngành",
    majorCode: "Mã ngành",
    studentId: "Mã sinh viên",
    class: "Lớp",
  };

  const renderContent = () => {
    if (currentPage === "update-form") {
      return <UpdateForm setCurrentPage={setCurrentPage} />;
    }
    return (
      <div className="personal-info-container">
        <h2 className="title">Thông tin cá nhân</h2>
        <div className="info-grid">
          {Object.entries(personalInfo).map(([key, value]) => (
            <div className="info-item" key={key}>
              <label>{fieldLabels[key] || key}</label>
              <input type="text" value={value} readOnly />
            </div>
          ))}
        </div>
        <div className="button-group">
          <button onClick={() => setCurrentPage("update-form")}>Cập nhật thông tin</button>
        </div>
      </div>
    );
  };

  return renderContent();
}
