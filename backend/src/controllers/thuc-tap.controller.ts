import type { Context } from "hono";
import { db } from "../config/db";

export const getAllThucTap = async (c: Context) => {
    try {
        const [rows] = await db.query(`
            SELECT TT.*, 
                   SV.username AS ten_sinh_vien, 
                   C.ten_cty AS ten_cong_ty
            FROM THUC_TAP TT
            LEFT JOIN SINH_VIEN SV ON TT.ma_sv = SV.ma_sv
            LEFT JOIN CONG_TY C ON TT.ma_cty = C.ma_cty;
        `);
        return c.json(rows);
    } catch (error) {
        return c.json({ error: "Lỗi khi lấy danh sách thực tập" }, 500);
    }
};

export const getThucTapById = async (c: Context) => {
    const { id } = c.req.param();
    try {
        const [rows] = await db.query(`
            SELECT TT.*, 
                   SV.username AS ten_sinh_vien, 
                   C.ten_cty AS ten_cong_ty
            FROM THUC_TAP TT
            LEFT JOIN SINH_VIEN SV ON TT.ma_sv = SV.ma_sv
            LEFT JOIN CONG_TY C ON TT.ma_cty = C.ma_cty
            WHERE TT.ma_tt = ?;
        `, [id]);

        return Array.isArray(rows) && rows.length > 0
            ? c.json(rows[0])
            : c.json({ error: "Không tìm thấy thông tin thực tập" }, 404);
    } catch (error) {
        return c.json({ error: "Lỗi khi lấy thông tin thực tập" }, 500);
    }
};

export const createThucTap = async (c: Context) => {
    const { ma_tt, thoi_gian_bat_dau, thoi_gian_ket_thuc, ma_sv, ma_cty, ma_dot } = await c.req.json();
    try {
        const [existing] = await db.query(`SELECT ma_tt FROM THUC_TAP WHERE ma_tt = ?`, [ma_tt]);

        if (Array.isArray(existing) && existing.length > 0) {
            return c.json({ error: "Mã thực tập đã tồn tại" }, 400);
        }

        await db.query(`
            INSERT INTO THUC_TAP (ma_tt, thoi_gian_bat_dau, thoi_gian_ket_thuc, ma_sv, ma_cty, ma_dot)
            VALUES (?, ?, ?, ?, ?, ?);
        `, [ma_tt, thoi_gian_bat_dau, thoi_gian_ket_thuc, ma_sv, ma_cty, ma_dot]);

        return c.json({ message: "Đã tạo thực tập" }, 201);
    } catch (error) {
        return c.json({ error: "Lỗi khi tạo thực tập" }, 500);
    }
};

export const updateThucTap = async (c: Context) => {
    const { id } = c.req.param();
    const { thoi_gian_bat_dau, thoi_gian_ket_thuc, ma_sv, ma_cty, ma_dot } = await c.req.json();
    try {
        const [existing] = await db.query(`SELECT ma_tt FROM THUC_TAP WHERE ma_tt = ?`, [id]);

        if (!Array.isArray(existing) || existing.length === 0) {
            return c.json({ error: "Không tìm thấy thông tin thực tập để cập nhật" }, 404);
        }

        await db.query(`
            UPDATE THUC_TAP 
            SET thoi_gian_bat_dau = ?, thoi_gian_ket_thuc = ?, ma_sv = ?, ma_cty = ?, ma_dot = ?
            WHERE ma_tt = ?;
        `, [thoi_gian_bat_dau, thoi_gian_ket_thuc, ma_sv, ma_cty, ma_dot, id]);

        return c.json({ message: "Đã cập nhật thực tập" });
    } catch (error) {
        return c.json({ error: "Lỗi khi cập nhật thực tập" }, 500);
    }
};

export const deleteThucTap = async (c: Context) => {
    const { id } = c.req.param();
    try {
        const [existing] = await db.query(`SELECT ma_tt FROM THUC_TAP WHERE ma_tt = ?`, [id]);

        if (!Array.isArray(existing) || existing.length === 0) {
            return c.json({ error: "Không tìm thấy thông tin thực tập để xoá" }, 404);
        }

        await db.query("DELETE FROM THUC_TAP WHERE ma_tt = ?", [id]);
        return c.json({ message: "Đã xoá thực tập" });
    } catch (error) {
        return c.json({ error: "Lỗi khi xoá thực tập" }, 500);
    }
};
