import type { Context } from "hono";

import { db } from '../config/db';

export const getAllNganh = async (c: Context) => {
    const [rows] = await db.execute('SELECT * FROM NGANH');
    return c.json(rows);
};

export const createNganh = async (c: Context) => {
    const body = await c.req.json();
    await db.execute('INSERT INTO NGANH (ma_nganh, ten_nganh) VALUES (?, ?)', [body.ma_nganh, body.ten_nganh]);
    return c.json({ message: 'Ngành học đã được tạo' });
};

// Cập nhật thông tin ngành
export const updateNganh = async (c: Context) => {
    const { ma_nganh } = c.req.param();
    const body = await c.req.json();
    await db.execute(
      "UPDATE nganh SET ten_nganh = ? WHERE ma_nganh = ?",
      [body.ten_nganh, ma_nganh]
    );
    return c.json({ message: "Ngành đã được cập nhật" });
  };
  
  // Xóa ngành
  export const deleteNganh = async (c: Context) => {
    const { ma_nganh } = c.req.param();
    await db.execute("DELETE FROM nganh WHERE ma_nganh = ?", [ma_nganh]);
    return c.json({ message: "Ngành đã được xóa" });
  };