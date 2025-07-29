import { useState, useEffect } from "react";
import "../../styles/sinhvien/Internship.css";

interface InternshipData {
  ma_tt: string;
  thoi_gian_bat_dau: string;
  thoi_gian_ket_thuc: string;
  ma_sv: string;
  ma_cty: string;
  ma_dot: string;
  ten_sinh_vien: string;
  ten_cong_ty: string;
}

const Internship = () => {
  const [selectedInternship, setSelectedInternship] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [internships, setInternships] = useState<InternshipData[]>([]);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await fetch("/api/thuc-tap");
        if (!response.ok) throw new Error("Lỗi khi tải danh sách thực tập");
        const data: InternshipData[] = await response.json();
        setInternships(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInternships();
  }, []);

  const handleCheckboxChange = (ma_tt: string) => {
    setSelectedInternship(ma_tt === selectedInternship ? null : ma_tt);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2500);
  };

  return (
    <div className="internship-container">
      <div className={`success-message ${showMessage ? "show" : ""}`}>
        ✅ Đăng ký thực tập thành công!
      </div>

      <div className="header">
        <div className="filter">
          <label htmlFor="thuctap-radio">Loại đợt:</label>
          <button className="button2">Thực tập</button>
        </div>
      </div>

      <div className="content">
        <div className="grid-icon">▦</div>
        <div className="table-container">
          <div className="title">
            <span className="icon">📅</span>
            <span className="title-text">Đăng kí thực tập</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Công ty</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày kết thúc</th>
                <th>Đăng ký</th>
              </tr>
            </thead>
            <tbody>
              {internships.length > 0 ? (
                internships.map((internship) => (
                  <tr key={internship.ma_tt}>
                    <td>{internship.ten_cong_ty}</td>
                    <td>{new Date(internship.thoi_gian_bat_dau).toLocaleDateString()}</td>
                    <td>{new Date(internship.thoi_gian_ket_thuc).toLocaleDateString()}</td>
                    <td>
                      <input
                        type="checkbox"
                        id={`internship-${internship.ma_tt}`}
                        title="Chọn đăng ký thực tập"
                        checked={selectedInternship === internship.ma_tt}
                        onChange={() => handleCheckboxChange(internship.ma_tt)}
                      />
                      <label htmlFor={`internship-${internship.ma_tt}`}></label>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center" }}>
                    Không có đợt thực tập nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Internship;
