import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db";

import authRoute from "./routes/authRoute";
import departmentRoute from "./routes/departmentRoute";
import claimRoute from "./routes/claimRoute";
import claimItemRoute from "./routes/claimItemRoute";
import approvalRoute from "./routes/approvalRoute";

config();
connectDB();

const app = express();
const PORT = 8080;

/* =========================
   CORS SETUP (FIX ERROR)
========================= */
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

/* =========================
   BODY PARSER
========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   ROUTES
========================= */
app.use("/auth", authRoute);
app.use("/departments", departmentRoute);
app.use("/claim", claimRoute);
app.use("/claim", claimItemRoute);
app.use("/approval", approvalRoute);

/* =========================
   START SERVER
========================= */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/* =========================
   HANDLE SHUTDOWN
========================= */
const shutdown = async () => {
  console.log("Shutting down the server...");
  await disconnectDB();
  process.exit(0);
};

const handleError = async (error: Error) => {
  console.error("An error occurred:", error);
  await disconnectDB();
  process.exit(1);
};

process.on("SIGINT", shutdown);