import { Hono } from "hono";
import {
  getAllNganh,
  createNganh,
  updateNganh,
  deleteNganh,
} from "../controllers/nganh.controller";

export const nganhRoute = new Hono();

nganhRoute.get("/", getAllNganh);
nganhRoute.post("/", createNganh);
nganhRoute.put("/:ma_nganh", updateNganh);
nganhRoute.delete("/:ma_nganh", deleteNganh);

export default nganhRoute;