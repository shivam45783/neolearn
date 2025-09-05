import express from "express";
// import routes from "./routes.js";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const app = express();
const port = 3000 || process.env.PORT;

app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

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
