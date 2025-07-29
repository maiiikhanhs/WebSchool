import React, { useEffect, useState } from "react";
import "../../styles/giangvien/ProjectApproval.css";

interface Project {
    ma_da: string;
    ten_de_tai: string;
    trang_thai: string;
    ma_sv: string;
    ten_sinh_vien: string;
}

const ProjectApproval: React.FC = () => {
    const [students, setStudents] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [updateMessage, setUpdateMessage] = useState<string | null>(null);

    // Phân trang
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5;

    const fetchProjects = async () => {
        try {
            const response = await fetch("/api/do-an");
            if (!response.ok) throw new Error("Không thể lấy dữ liệu");
            const data = await response.json();
            setStudents(data);
        } catch (err) {
            setError("Lỗi khi tải dữ liệu");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleApproval = async (id: string, newStatus: string) => {
        try {
            console.log(`🛠️ Đang cập nhật trạng thái cho đồ án ${id}...`);

            const response = await fetch(`/api/do-an/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ trang_thai: newStatus }),
            });

            if (!response.ok) throw new Error("Không thể cập nhật trạng thái");

            console.log(`✅ Cập nhật thành công: ${id} -> ${newStatus}`);
            setUpdateMessage(`Đã cập nhật trạng thái thành ${newStatus}`);

            await fetchProjects();
        } catch (error) {
            console.error("❌ Lỗi khi cập nhật trạng thái:", error);
            setUpdateMessage("Lỗi khi cập nhật trạng thái");
        }
    };

    // Xử lý phân trang
    const totalPages = Math.ceil(students.length / itemsPerPage);
    const displayedStudents = students.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (loading) return <p className="loading-message">Đang tải dữ liệu...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="container">
            <h2 className="title">Danh Sách Sinh Viên Hướng Dẫn</h2>

            {updateMessage && <p className="update-message">{updateMessage}</p>}

            <table className="student-table">
                <thead>
                    <tr>
                        <th>Stt</th>
                        <th>Họ và tên</th>
                        <th>Mã sinh viên</th>
                        <th>Đề tài đồ án</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedStudents.map((student, index) => (
                        <tr key={student.ma_da}>
                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                            <td className="student-name">
                                <a href="#">{student.ten_sinh_vien}</a>
                            </td>
                            <td>{student.ma_sv}</td>
                            <td>{student.ten_de_tai}</td>
                            <td className={student.trang_thai === "Đã duyệt" ? "approved" : "rejected"}>
                                {student.trang_thai}
                            </td>
                            <td>
                                <button className="approve-btn" onClick={() => handleApproval(student.ma_da, "Đã duyệt")}>
                                    Duyệt
                                </button>
                                <button className="reject-btn" onClick={() => handleApproval(student.ma_da, "Từ chối")}>
                                    Từ chối
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Nút chuyển trang */}
            <div className="pagination">
                <button className="pagination-btn" onClick={goToPreviousPage} disabled={currentPage === 1}>
                    ⬅ Trang trước
                </button>
                <span>Trang {currentPage} / {totalPages}</span>
                <button className="pagination-btn" onClick={goToNextPage} disabled={currentPage === totalPages}>
                    Trang sau ➡
                </button>
            </div>
        </div>
    );
};

export default ProjectApproval;
