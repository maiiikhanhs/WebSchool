import { useState, useEffect } from "react";
import "../../styles/sinhvien/UpdateForm.css";

export default function UpdateForm({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
    major: "",
    majorCode: "",
    studentId: "",
    class: "",
  });

  useEffect(() => {
    if (storedUser.email) {
      setFormData((prev) => ({
        ...prev,
        fullName: storedUser.ho_ten || "",
        gender: storedUser.gioi_tinh || "",
        dob: storedUser.ngay_sinh ? storedUser.ngay_sinh.split("T")[0] : "",
        phone: storedUser.so_dien_thoai || "",
        email: storedUser.email || "",
        studentId: storedUser.username || "",
      }));

      fetch(`/api/sinh-vien/${storedUser.username}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            const sinhVien = data[0];
            setFormData((prev) => ({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/nguoi-dung/capnhat", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.studentId,
          email: formData.email,
          fullName: formData.fullName,
          gender: formData.gender,
          dob: formData.dob,
          phone: formData.phone,
        }),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem("user", JSON.stringify(formData));
        alert("Cập nhật thành công!");
        setCurrentPage("personal-info");
      } else {
        alert(result.message || "Cập nhật thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      alert("Đã xảy ra lỗi, vui lòng thử lại!");
    }
  };

  return (
    <div className="update-form-container">
      <div className="update-form-header">Cập nhật thông tin</div>
      <div className="update-form-body">
        <div className="update-form-group">
          <label htmlFor="fullName">Họ và tên</label>
          <input id="fullName" type="text" value={formData.fullName} onChange={handleChange} />
        </div>

        <div className="update-form-group">
          <label htmlFor="gender">Giới tính</label>
          <input id="gender" type="text" value={formData.gender} onChange={handleChange} />
        </div>

        <div className="update-form-group">
          <label htmlFor="dob">Ngày sinh</label>
          <input id="dob" type="date" value={formData.dob} onChange={handleChange} />
        </div>

        <div className="update-form-group">
          <label htmlFor="phone">Số điện thoại</label>
          <input id="phone" type="text" value={formData.phone} onChange={handleChange} />
        </div>

        <div className="update-form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={formData.email} onChange={handleChange} />
        </div>

        <div className="update-form-group">
          <label htmlFor="major">Chuyên ngành</label>
          <input id="major" type="text" value={formData.major} readOnly />
        </div>

        <div className="update-form-actions">
          <button className="update-form-save-btn" onClick={handleSave}>
            Lưu thay đổi
          </button>
          <button className="update-form-cancel-btn" onClick={() => setCurrentPage("personal-info")}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}
