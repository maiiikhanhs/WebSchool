import { Hono } from "hono";
import {
    getAllThucTap,
    getThucTapById,
    createThucTap,
    updateThucTap,
    deleteThucTap
} from "../controllers/thuc-tap.controller";

export const thucTapRoute = new Hono();

thucTapRoute.get("/", getAllThucTap);
thucTapRoute.get("/:id", getThucTapById);
thucTapRoute.post("/", createThucTap);
thucTapRoute.put("/:id", updateThucTap);
thucTapRoute.delete("/:id", deleteThucTap);

export default thucTapRoute;
