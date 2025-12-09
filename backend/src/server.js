import express from "express";
import dotenv from "dotenv";
import employeeRoutes from "./routes/employeeRoutes.js";
import cors from "cors";
// Load ENV sekali saja
dotenv.config({ path: "./.env" });

const app = express();
app.use(express.json());

// FIX CORS
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));
// Test ENV
console.log("DATABASE_URL:", process.env.DATABASE_URL);

// Register Routes
app.use("/api/employees", employeeRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
