import "dotenv/config";
import express from "express";
import cors from "cors";
import todoRoutes from "./Routes/todoRoutes.js";
import connectDB from "./db-connection.js";
import "./firebaseAdmin.js";

// Validate required environment variables for the core application
const requiredEnv = ["uri", "PORT"];
for (const envVar of requiredEnv) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to Database
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("server running... on port " + PORT);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});