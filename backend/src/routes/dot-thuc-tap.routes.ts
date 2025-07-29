import { Hono } from "hono";
import {
  getAllDotThucTap,
  getDotThucTapById,
  createDotThucTap,
  updateDotThucTap,
  deleteDotThucTap
} from "../controllers/dot-thuc-tap.controller";

export const dotThucTapRoute = new Hono();

dotThucTapRoute.get("/", getAllDotThucTap);
dotThucTapRoute.get("/:id", getDotThucTapById);
dotThucTapRoute.post("/", createDotThucTap);
dotThucTapRoute.put("/:id", updateDotThucTap);
dotThucTapRoute.delete("/:id", deleteDotThucTap);

export default dotThucTapRoute;
