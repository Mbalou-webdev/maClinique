import express from "express";
import cors from "cors";
import connectDB from "./config/db.js"; // ← ici
import dotenv from "dotenv";
dotenv.config();

// Connexion à la base MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
import userRoutes from "./routes/userRoutes.js";
import appointmentRoutes from './routes/appointmentRoutes.js';
app.use("/api", userRoutes);
app.use('/api/appointments', appointmentRoutes);


app.listen(5000, () => {
  console.log("🚀 Serveur lancé sur le port 5000");
});