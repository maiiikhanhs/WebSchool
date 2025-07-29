import { Hono } from "hono";
import {
  getAllDoAn,
  getDoAnById,
  createDoAn,
  updateDoAn,
  deleteDoAn
} from "../controllers/do-an.controller";

export const doAnRoute = new Hono();

doAnRoute.get("/", getAllDoAn);
doAnRoute.get("/:id", getDoAnById);
doAnRoute.post("/", createDoAn);
doAnRoute.put("/:id", updateDoAn);
doAnRoute.delete("/:id", deleteDoAn);

export default doAnRoute;