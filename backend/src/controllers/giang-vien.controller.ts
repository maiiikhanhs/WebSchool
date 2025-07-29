import type { Context } from "hono";

import { db } from "../config/db";

export const getAllGiangVien = async (c: Context) => {
    const [rows] = await db.execute('SELECT * FROM GIANG_VIEN');
    return c.json(rows);
};

export const getGiangVienByNganh = async (c: Context) => {
    const { ma_nganh } = c.req.param();
    const [rows] = await db.execute('SELECT * FROM GIANG_VIEN WHERE ma_nganh = ?', [ma_nganh]);
    return c.json(rows);
};

export const getGiangVienByID = async (c: Context) => {
    const { ma_gv } = c.req.param();
    const [rows] = await db.execute('SELECT * FROM GIANG_VIEN WHERE ma_gv = ?', [ma_gv]);
    return c.json(rows);
};

export const createGiangVien = async (c: Context) => {
    const body = await c.req.json();
    await db.execute(
        'INSERT INTO GIANG_VIEN (ma_gv, username, chuc_danh, ma_nganh) VALUES (?, ?, ?, ?)',
        [body.ma_gv, body.username, body.chuc_danh, body.ma_nganh]
    );
    return c.json({ message: 'Giảng viên đã được tạo' });
};

// Cập nhật thông tin giảng viên
export const updateGiangVien = async (c: Context) => {
    const { ma_gv } = c.req.param();
    const body = await c.req.json();
    await db.execute(
      "UPDATE giang_vien SET username = ?, chuc_danh = ?, ma_nganh = ? WHERE ma_gv = ?",
      [body.username, body.chuc_danh, body.ma_nganh, ma_gv]
    );
    return c.json({ message: "Giảng viên đã được cập nhật" });
  };
  
  // Xóa giảng viên
  export const deleteGiangVien = async (c: Context) => {
    const { ma_gv } = c.req.param();
    await db.execute("DELETE FROM GIANG_VIEN WHERE ma_gv = ?", [ma_gv]);
    return c.json({ message: "Giảng viên đã được xóa" });
  };