import { Hono } from "hono";
import {
  getAllDotDoAn,
  getDotDoAnById,
  createDotDoAn,
  updateDotDoAn,
  deleteDotDoAn
} from "../controllers/dot-do-an.controller";

export const dotDoAnRoute = new Hono();

dotDoAnRoute.get("/", getAllDotDoAn);
dotDoAnRoute.get("/:id", getDotDoAnById);
dotDoAnRoute.post("/", createDotDoAn);
dotDoAnRoute.put("/:id", updateDotDoAn);
dotDoAnRoute.delete("/:id", deleteDotDoAn);

export default dotDoAnRoute;
