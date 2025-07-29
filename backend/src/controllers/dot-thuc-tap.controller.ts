import { Context } from "hono";
import { db } from "../config/db";

export const getAllDotThucTap = async (c: Context) => {
  try {
    const [rows] = await db.query("SELECT * FROM DOT_DANG_KY WHERE loai_dot = 'Thực tập'");
    return c.json(rows);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
};

export const getDotThucTapById = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const [rows] = await db.query("SELECT * FROM DOT_DANG_KY WHERE ma_dot = ? AND loai_dot = 'Thực tập'", [id]);
    return rows.length ? c.json(rows[0]) : c.json({ message: "Not found" }, 404);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
};

export const createDotThucTap = async (c: Context) => {
  try {
    const body = await c.req.json();
    const { ten_dot, loai_dot, thoi_gian_bat_dau, thoi_gian_ket_thuc, trang_thai, ma_tk } = body;
    await db.query("INSERT INTO DOT_DANG_KY (ten_dot, loai_dot, thoi_gian_bat_dau, thoi_gian_ket_thuc, trang_thai, ma_tk) VALUES (?, 'Thực tập', ?, ?, ?, ?)", [
      ten_dot,
      loai_dot,
      thoi_gian_bat_dau,
      thoi_gian_ket_thuc,
      trang_thai,
      ma_tk,
    ]);
    return c.json({ message: "Created successfully" }, 201);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
};

export const updateDotThucTap = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { ten_dot, thoi_gian_bat_dau, thoi_gian_ket_thuc, trang_thai, ma_tk } = body;
    await db.query("UPDATE DOT_DANG_KY SET ten_dot = ?, thoi_gian_bat_dau = ?, thoi_gian_ket_thuc = ?, trang_thai = ?, ma_tk = ? WHERE ma_dot = ? AND loai_dot = 'Thực tập'", [
      ten_dot,
      thoi_gian_bat_dau,
      thoi_gian_ket_thuc,
      trang_thai,
      ma_tk,
    ]);
    return c.json({ message: "Updated successfully" });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
};

export const deleteDotThucTap = async (c: Context) => {
  try {
    const id = c.req.param("id");
    await db.query("DELETE FROM DOT_DANG_KY WHERE ma_dot = ? AND loai_dot = 'Thực tập'", [id]);
    return c.json({ message: "Deleted successfully" });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
};
