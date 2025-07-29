import { useEffect, useState } from "react";
import "../../styles/sinhvien/ProjectResult.css";

const ProjectResult = () => {
  const [projects, setProjects] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}"); // Lấy thông tin sinh viên từ LocalStorage
  const ma_sv = user.username?.toUpperCase(); // Chuyển username về dạng viết hoa để khớp dữ liệu

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/do-an");
        const data = await response.json();
        // Lọc danh sách chỉ lấy đồ án của sinh viên đang đăng nhập
        const filteredProjects = data.filter((project: any) => project.ma_sv.toUpperCase() === ma_sv);
        setProjects(filteredProjects);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };

    if (ma_sv) {
      fetchProjects();
    }
  }, [ma_sv]);

  return (
    <div className="project1-result1-container1">
      <div className="header1">
        <div className="filter1">
          <label htmlFor="doan1-radio">Loại đợt:</label>
          <button className="button2">Đồ án</button>
        </div>
      </div>

      <div className="register1-section11">
        <h2 className="project1-title">Kết quả đăng kí đồ án</h2>
      </div>

      <div className="content1">
        <div className="grid1-icon1">▦</div>
        <div className="table1-container1">
          <table>
            <thead>
              <tr>
                <th>Tên đề tài</th>
                <th>Công nghệ</th>
                <th>Giảng viên hướng dẫn</th>
                <th>Thời gian báo cáo</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 ? (
                projects.map((project: any) => (
                  <tr key={project.ma_da}>
                    <td>{project.ten_de_tai}</td>
                    <td>{project.cong_nghe}</td>
                    <td>{project.ten_giang_vien || "Chưa có"}</td>
                    <td>{project.ngay_bao_cao ? new Date(project.ngay_bao_cao).toLocaleDateString() : "Chưa có"}</td>
                    <td className={project.trang_thai === "Chờ duyệt" ? "pending" : ""}>
                      {project.trang_thai}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>Chưa có đồ án nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectResult;
