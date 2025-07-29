import { Hono } from "hono";
import {
  getAllCongTy,
  getCongTyById,
  createCongTy,
  updateCongTy,
  deleteCongTy
} from "../controllers/cong-ty.controller";

export const congTyRoute = new Hono();

congTyRoute.get("/", getAllCongTy);
congTyRoute.get("/:ma_cty", getCongTyById);
congTyRoute.post("/", createCongTy);
congTyRoute.put("/:ma_cty", updateCongTy);
congTyRoute.delete("/:ma_cty", deleteCongTy);

export default congTyRoute;
