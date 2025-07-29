import type { Context } from "hono";
import { db } from "../config/db";

export const getAllCongTy = async (c: Context) => {
  try {
    const [rows] = await db.execute(`
      select * from CONG_TY
    `);
    return c.json(rows);
  } catch (error) {
    return c.json({ error: "Lỗi khi lấy danh sách công ty" }, 500);
  }
};

export const getCongTyById = async (c: Context) => {
  const id = c.req.param("ma_cty");
  try {
    const [rows] = await db.query(`
      SELECT * FROM CONG_TY CT
      WHERE CT.ma_cty = ?
    `, [id]);

    if (Array.isArray(rows) && rows.length > 0) {
      return c.json(rows[0]);
    } else {
      return c.json({ error: "Không tìm thấy công ty" }, 404);
    }
  } catch (error) {
    return c.json({ error: "Lỗi khi lấy công ty" }, 500);
  }
};

export const createCongTy = async (c: Context) => {
  const { ma_cty, ten_cty, dia_chi, nguoi_dai_dien, ma_nganh } = await c.req.json();
  try {
    await db.query(`
      INSERT INTO CONG_TY (ma_cty, ten_cty, dia_chi, nguoi_dai_dien, ma_nganh)
      VALUES (?, ?, ?, ?, ?)
    `, [ma_cty, ten_cty, dia_chi, nguoi_dai_dien, ma_nganh]);

    return c.json({ message: "Đã tạo công ty" }, 201);
  } catch (error) {
    return c.json({ error: "Lỗi khi tạo công ty" }, 500);
  }
};

export const updateCongTy = async (c: Context) => {
  const id = c.req.param("ma_cty");
  const { ten_cty, dia_chi, nguoi_dai_dien, ma_nganh } = await c.req.json();
  try {
    await db.query(`
      UPDATE CONG_TY SET ten_cty = ?, dia_chi = ?, nguoi_dai_dien = ?, ma_nganh = ? WHERE ma_cty = ?
    `, [ten_cty, dia_chi, nguoi_dai_dien, ma_nganh, id]);

    return c.json({ message: "Đã cập nhật công ty" });
  } catch (error) {
    return c.json({ error: "Lỗi khi cập nhật công ty" }, 500);
  }
};

export const deleteCongTy = async (c: Context) => {
  const id = c.req.param("ma_cty");
  try {
    await db.query("DELETE FROM CONG_TY WHERE ma_cty = ?", [id]);
    return c.json({ message: "Đã xoá công ty" });
  } catch (error) {
    return c.json({ error: "Lỗi khi xoá công ty" }, 500);
  }
};
