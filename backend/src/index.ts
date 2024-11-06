import { Hono } from "hono";
import { userRoute } from "./routes/user";
import { blogRoute } from "./routes/blog";
import { cors } from "hono/cors";

const app = new Hono<{
   Bindings: {
      DATABASE_URL: string;
      JWT_SCERET: string;
   };
}>();

app.use("/*", cors());

app.get("/", (c) => c.text("hellow world"));

app.route("/api/v1/user", userRoute);
app.route("/api/v1/blog", blogRoute);

export default app;
