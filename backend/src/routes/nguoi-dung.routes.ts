import { Hono } from "hono";
import { nguoiDungController } from "../controllers/nguoi-dung.controller";

export const nguoiDungRoute = new Hono();

nguoiDungRoute.get("/:email", async (c) => {
    const email = c.req.param("email");
    const user = await nguoiDungController.getUserByEmail(email);
    return user ? c.json(user) : c.json({ message: "Người dùng không tồn tại!" }, 404);
});

nguoiDungRoute.post("/dangky", async (c) => {
    const { username, email, password, fullName, gender, dob, phone } = await c.req.json();
    const result = await nguoiDungController.createUser(username, email, password, fullName, gender, dob, phone);
    return c.json(result);
});

nguoiDungRoute.put("/capnhat", async (c) => {
    const { username, email, fullName, gender, dob, phone } = await c.req.json();
    const result = await nguoiDungController.updateUserInfo(username, email, fullName, gender, dob, phone);
    return c.json(result);
});

nguoiDungRoute.delete("/:username", async (c) => {
    const username = c.req.param("username");
    const result = await nguoiDungController.deleteUser(username);
    return c.json(result);
});

export default nguoiDungRoute;
