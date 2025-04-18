import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

import { connectDb } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  // For Render deployment
  const frontendBuildPath = path.join(__dirname, "../frontend/dist");
  console.log("Serving static files from:", frontendBuildPath);
  
  app.use(express.static(frontendBuildPath));

  app.get("*", (req, res) => {
    const indexPath = path.join(frontendBuildPath, "index.html");
    console.log("Serving index from:", indexPath);
    res.sendFile(indexPath);
  });
}

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDb();
});
