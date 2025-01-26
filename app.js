import express from "express";
import Path from "path";
import morgan from "morgan";
import router from "./routes/routes.js";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

const dirname = Path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(Path.join(dirname, "public")));

app.use(morgan("dev"));

app.use("/", router);

export default app;
