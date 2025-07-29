import type { Context, Next } from "hono";
import { nguoiDungController } from "../controllers/nguoi-dung.controller";

export const loginUser = async (c: Context) => {
  const { email, password } = await c.req.json();

  const user = await nguoiDungController.getUserByEmailAndPassword(email, password);

  if (!user) {
    return c.json({ error: "Sai email hoặc mật khẩu" }, 401);
  }

  return c.json({ message: "Đăng nhập thành công", user });
};

export const roleMiddleware = (allowedRoles: string[]) => {
  return async (c: Context, next: Next) => {
    const email = c.req.header("X-User-Email");

    if (!email) {
      console.log("🚨 Không có header X-User-Email");
      return c.json({ error: "Unauthorized" }, 401);
    }

    const user = await nguoiDungController.getUserByEmail(email);

    if (!user) {
      console.log("🚨 User không tồn tại:", email);
      return c.json({ error: "User not found" }, 401);
    }

    if (!allowedRoles.includes(user.role)) {
      console.log("🚨 Không đủ quyền:", user.role);
      return c.json({ error: "Forbidden" }, 403);
    }

    c.set("user", user);
    await next();
  };
};

