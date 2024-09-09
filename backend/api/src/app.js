import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import artistRoutes from "./routes/artistRoutes.js";
import stageRoutes from "./routes/stageRoutes.js";
import performanceRoutes from "./routes/performanceRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
dotenv.config();

console.log("CORS Origin:", process.env.CORS_ORIGIN);

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/artist", artistRoutes);
app.use("/api/stage", stageRoutes);
app.use("/api/performance", performanceRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);

export default app;
