import type { Context } from "hono";
import { db } from "../config/db";

export const getAllDotDoAn = async (c: Context) => {
  try {
    const [rows] = await db.query("SELECT * FROM DOT_DANG_KY WHERE loai_dot = 'Đồ án'");
    return c.json(rows);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
};

export const getDotDoAnById = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const [rows] = await db.query("SELECT * FROM DOT_DANG_KY WHERE ma_dot = ? AND loai_dot = 'Đồ án'", [id]);
    return rows.length ? c.json(rows[0]) : c.json({ message: "Not found" }, 404);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
};

export const createDotDoAn = async (c: Context) => {
  try {
    const body = await c.req.json().catch(() => {
      throw new Error("Invalid JSON format");
    });

    const { ma_dot, ten_dot, loai_dot, thoi_gian_bat_dau, thoi_gian_ket_thuc, trang_thai, ma_tk } = body;
    await db.query(
      "INSERT INTO DOT_DANG_KY (ma_dot, ten_dot, loai_dot, thoi_gian_bat_dau, thoi_gian_ket_thuc, trang_thai, ma_tk) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [ma_dot, ten_dot, loai_dot, thoi_gian_bat_dau, thoi_gian_ket_thuc, trang_thai, ma_tk]
    );

    return c.json({ message: "Đồ án mới đã được tạo" }, 201);
  } catch (error) {
    console.error("Lỗi khi tạo đợt đồ án:", error);
    return c.json({ error: error.message }, 500);
  }
};



export const updateDotDoAn = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { ten_dot, thoi_gian_bat_dau, thoi_gian_ket_thuc, trang_thai, ma_tk } = body;

    await db.query(
      "UPDATE DOT_DANG_KY SET ten_dot = ?, thoi_gian_bat_dau = ?, thoi_gian_ket_thuc = ?, trang_thai = ?, ma_tk = ? WHERE ma_dot = ? AND loai_dot = 'Đồ án'",
      [ten_dot, thoi_gian_bat_dau, thoi_gian_ket_thuc, trang_thai, ma_tk, id]
    );

    return c.json({ message: "Updated successfully" });
  } catch (error) {
    console.error("Lỗi SQL:", error);
    return c.json({ error: error.message }, 500);
  }
};


export const deleteDotDoAn = async (c: Context) => {
  try {
    const id = c.req.param("id");
    await db.query("DELETE FROM DOT_DANG_KY WHERE ma_dot = ? AND loai_dot = 'Đồ án'", [id]);
    return c.json({ message: "Deleted successfully" });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
};
