import type { Context } from "hono";
import { db } from "../config/db";

export const getAllDoAn = async (c: Context) => {
  try {
    const [rows] = await db.query(`
      SELECT DA.*, GV.username AS ten_giang_vien, SV.username AS ten_sinh_vien
      FROM DO_AN DA
      LEFT JOIN GIANG_VIEN GV ON DA.ma_gv = GV.ma_gv
      LEFT JOIN SINH_VIEN SV ON DA.ma_sv = SV.ma_sv
    `);
    return c.json(rows);
  } catch (error) {
    return c.json({ error: "Lỗi khi lấy danh sách đồ án" }, 500);
  }
};

export const getDoAnById = async (c: Context) => {
  const { id } = c.req.param();
  try {
    const [rows] = await db.query(`
      SELECT DA.*, GV.username AS ten_giang_vien, SV.username AS ten_sinh_vien
      FROM DO_AN DA
      WHERE DA.ma_da = ?
    `, [id]);

    if (Array.isArray(rows) && rows.length > 0) {
      return c.json(rows[0]);
    } else {
      return c.json({ error: "Không tìm thấy đồ án" }, 404);
    }
  } catch (error) {
    return c.json({ error: "Lỗi khi lấy đồ án" }, 500);
  }
};

export const createDoAn = async (c: Context) => {
  const { ma_da, ten_de_tai, trang_thai, ngay_bao_cao, ma_sv, ma_gv, ma_dot } = await c.req.json();
  try {
    await db.query(`
      INSERT INTO DO_AN (ma_da, ten_de_tai,trang_thai,ngay_bao_cao, ma_sv, ma_gv,ma_dot)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [ma_da, ten_de_tai, trang_thai, ngay_bao_cao, ma_sv, ma_gv, ma_dot]);

    return c.json({ message: "Đã tạo đồ án" }, 201);
  } catch (error) {
    return c.json({ error: "Lỗi khi tạo đồ án" }, 500);
  }
};

export const updateDoAn = async (c: Context) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  if (!id || Object.keys(body).length === 0) {
    return c.json({ error: "Thiếu dữ liệu đầu vào" }, 400);
  }

  try {
    const fields = Object.keys(body)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(body);

    if (!fields) {
      return c.json({ error: "Không có dữ liệu để cập nhật" }, 400);
    }

    values.push(id);
    const [result]: any = await db.query(`UPDATE DO_AN SET ${fields} WHERE ma_da = ?`, values);

    if (result.affectedRows === 0) {
      return c.json({ error: "Không tìm thấy đồ án" }, 404);
    }

    return c.json({ message: "Đã cập nhật đồ án" });
  } catch (error) {
    console.error("❌ Lỗi SQL khi cập nhật đồ án:", error);
    return c.json({ error: "Lỗi server", details: error }, 500);
  }
};


export const deleteDoAn = async (c: Context) => {
  const { id } = c.req.param();
  try {
    await db.query("DELETE FROM DO_AN WHERE ma_da = ?", [id]);
    return c.json({ message: "Đã xoá đồ án" });
  } catch (error) {
    return c.json({ error: "Lỗi khi xoá đồ án" }, 500);
  }
};
