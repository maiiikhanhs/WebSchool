import { Hono } from "hono";
import {
  getAllGiangVien,
  getGiangVienByNganh,
  getGiangVienByID,
  createGiangVien,
  updateGiangVien,
  deleteGiangVien,
} from "../controllers/giang-vien.controller";

export const giangVienRoute = new Hono();

giangVienRoute.get("/", getAllGiangVien);
giangVienRoute.get("/nganh/:ma_nganh", getGiangVienByNganh);
giangVienRoute.get("/:ma_gv", getGiangVienByID);
giangVienRoute.post("/", createGiangVien);
giangVienRoute.put("/:ma_gv", updateGiangVien);
giangVienRoute.delete("/:ma_gv", deleteGiangVien);

export default giangVienRoute;