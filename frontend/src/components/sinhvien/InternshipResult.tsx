import { useEffect, useState } from "react";
import "../../styles/sinhvien/InternshipResult.css";

const InternshipResult = () => {
  const [internships, setInternships] = useState<any[]>([]);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await fetch("/api/thuc-tap");
        const data = await response.json();
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        if (!user.username) {
          console.warn("Không tìm thấy username trong localStorage");
          return;
        }

        data.forEach((internship: any) => {
          console.log("internship.ma_sv:", internship.ma_sv);
        });

        const filteredData = data.filter(
          (internship: any) =>
            internship.ma_sv.toLowerCase() === user.username.toLowerCase()
        );

        setInternships(filteredData);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };

    fetchInternships();
  }, []);

  return (
    <div className="internship-result-container">
      <div className="header">
        <div className="filter">
          <label htmlFor="thuctap-radio">Loại đợt:</label>
          <button className="button2">Thực tập</button>
        </div>
        <div className="date-info">
          <p>Ngày bắt đầu: <strong>20-01-2025</strong></p>
          <p>Ngày kết thúc: <strong>22-01-2025</strong></p>
        </div>
      </div>

      <div className="content">
        <h2 className="title">Kết quả đăng kí thực tập</h2>
        <table>
          <thead>
            <tr>
              <th>Tên Công ty</th>
              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
              <th>Ghi chú</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {internships.length > 0 ? (
              internships.map((internship: any) => (
                <tr key={internship.ma_tt}>
                  <td>{internship.ten_cong_ty}</td>
                  <td>{new Date(internship.thoi_gian_bat_dau).toLocaleDateString("vi-VN")}</td>
                  <td>{new Date(internship.thoi_gian_ket_thuc).toLocaleDateString("vi-VN")}</td>
                  <td>-</td>
                  <td className="status approved">Đã duyệt</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InternshipResult;
