import express from "express";
import prisma from "./utils/db.js";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import authRouter from "./routes/auth.route.js";
// const prisma = new PrismaClient();
import cookieParser from "cookie-parser";

const app = express();
const port = 3000 || process.env.PORT;

app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello World");
});


app.use("/api/auth", authRouter);

async function startServer() {
  try {
    await prisma.$connect();
    console.log("Database connected");

    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to database:", error);
    process.exit(1);
  }
}

startServer();
