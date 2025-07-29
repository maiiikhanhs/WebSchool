import { db } from "../config/db";
import type { RowDataPacket } from "mysql2";
import type { ResultSetHeader } from "mysql2/promise";

export const nguoiDungController = {
  async getUserByEmailAndPassword(email: string, password: string) {
    const [rows] = await db.execute<RowDataPacket[]>(
      "SELECT * FROM NGUOI_DUNG WHERE email = ? AND password = ? LIMIT 1",
      [email, password]
    );
    return rows.length > 0 ? rows[0] : null;
  },

  async getUserByEmail(email: string) {
    const [rows] = await db.execute<RowDataPacket[]>(
      "SELECT * FROM NGUOI_DUNG WHERE email = ? LIMIT 1",
      [email]
    );
    return rows.length ? rows[0] : null;
  },

  async changePassword(email: string, currentPassword: string, newPassword: string) {
    const user = await nguoiDungController.getUserByEmailAndPassword(email, currentPassword);
    if (!user) {
      return { success: false, message: "Email hoặc mật khẩu hiện tại không đúng!" };
    }

    const [result] = await db.execute<ResultSetHeader>(
      "UPDATE NGUOI_DUNG SET password = ? WHERE email = ?",
      [newPassword, email]
    );

    return result.affectedRows > 0
      ? { success: true, message: "Đổi mật khẩu thành công!" }
      : { success: false, message: "Không thể đổi mật khẩu, vui lòng thử lại!" };
  },

  async updateUserInfo(username: string, email: string, fullName: string, gender: string, dob: string, phone: string) {
    const [result] = await db.execute<ResultSetHeader>(
      "UPDATE NGUOI_DUNG SET email = ?, ho_ten = ?, gioi_tinh = ?, ngay_sinh = ?, so_dien_thoai = ? WHERE username = ?",
      [email, fullName, gender, dob, phone, username]
    );

    return result.affectedRows > 0
      ? { success: true, message: "Cập nhật thông tin thành công!" }
      : { success: false, message: "Cập nhật thất bại, vui lòng thử lại!" };
  },

  async createUser(username: string, email: string, password: string, fullName: string, gender: string, dob: string, phone: string) {
    const [result] = await db.execute<ResultSetHeader>(
      "INSERT INTO NGUOI_DUNG (username, email, password, ho_ten, gioi_tinh, ngay_sinh, so_dien_thoai) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [username, email, password, fullName, gender, dob, phone]
    );

    return result.affectedRows > 0
      ? { success: true, message: "Người dùng đã được tạo thành công!" }
      : { success: false, message: "Không thể tạo người dùng, vui lòng thử lại!" };
  },

  async deleteUser(username: string) {
    const [result] = await db.execute<ResultSetHeader>(
      "DELETE FROM NGUOI_DUNG WHERE username = ?",
      [username]
    );

    return result.affectedRows > 0
      ? { success: true, message: "Người dùng đã được xóa thành công!" }
      : { success: false, message: "Không thể xóa người dùng, vui lòng thử lại!" };
  }
};