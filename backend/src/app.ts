import { Hono } from "hono";
import { db } from "./config/db";
import { logger } from "hono/logger";
import { dotDoAnRoute } from "./routes/dot-do-an.routes";
import { dotThucTapRoute } from "./routes/dot-thuc-tap.routes";
import { doAnRoute } from "./routes/do-an.routes";
import { congTyRoute } from "./routes/cong-ty.routes";
import { nganhRoute } from "./routes/nganh.routes";
import { giangVienRoute } from "./routes/giang-vien.routes";
import { sinhVienRoute } from "./routes/sinh-vien.routes";
import { thucTapRoute } from "./routes/thuc-tap.routes";
import { loginUser, roleMiddleware } from "./middlewares/auth.middleware";
import { nguoiDungController } from "./controllers/nguoi-dung.controller";
import { nguoiDungRoute } from "./routes/nguoi-dung.routes";

export const app = new Hono();

db.getConnection()
  .then((conn) => {
    console.log("Kết nối MySQL thành công!");
    conn.release();
  })
  .catch((err) => {
    console.error("Lỗi kết nối MySQL:", err);
  });

app.use('*', logger());

// Middleware CORS động cho phép tất cả các subdomain của ngrok

app.use("*", async (c, next) => {
  const origin = c.req.header("origin") || "";

  if (origin.endsWith(".ngrok-free.app") || origin.endsWith(".ngrok.io")) {
    c.header("Access-Control-Allow-Origin", origin);
    c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    c.header("Access-Control-Allow-Credentials", "true");

    if (c.req.method === "OPTIONS") {
      return c.body(null, 204); // Dùng `c.body()` thay vì `c.text()`
    }
  }

  await next();
});

app.post("/api/login", loginUser);

app.post("/api/change-password", async (c) => {
  const { email, currentPassword, newPassword } = await c.req.json();

  if (!email || !currentPassword || !newPassword) {
    return c.json({ success: false, message: "Thiếu thông tin bắt buộc!" }, 400);
  }

  const result = await nguoiDungController.changePassword(email, currentPassword, newPassword);
  return c.json(result);
});

app.route("/api/dot-do-an", dotDoAnRoute);
app.route("/api/dot-thuc-tap", dotThucTapRoute);
app.route("/api/do-an", doAnRoute);
app.route("/api/thuc-tap", thucTapRoute);
app.route("/api/cong-ty", congTyRoute);
app.route('/api/nganh', nganhRoute);
app.route("/api/nguoi-dung", nguoiDungRoute);

app.use("/api/sinh-vien", roleMiddleware(["sinh_vien"]));
app.route("/api/sinh-vien", sinhVienRoute);

app.use("/api/truong-khoa", roleMiddleware(["giang_vien"]));
app.route("/api/giang-vien", giangVienRoute);

app.use("/api/truong-khoa", roleMiddleware(["truong_khoa"]));
app.get("/api/truong-khoa", (c) => c.text("Welcome Trưởng Khoa"));

app.get("/", (c) => c.text("Welcome to the Project & Internship Management API "));
