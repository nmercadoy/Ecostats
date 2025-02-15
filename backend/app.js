import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Importar rutas

import userRoutes from "./src/routes/user.routes.js";
import dataRoutes from "./src/routes/data.Routes.js";
import reportsRoutes from "./src/routes/reports.routes.js";
import compareRoutes from "./src/routes/Compare.routes.js";

dotenv.config();


const app = express();

// Configuración de CORS para permitir comunicación con el frontend
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Ruta principal
app.get("/", (req, res) => {
    res.json({ message: "Bienvenido a EcoStats API 🌱" });
});

// Rutas del API
app.use("/api/users", userRoutes); // Gestión de usuarios
app.use("/api/data", dataRoutes); // Datos ambientales (CO₂, agua, residuos)
app.use("/api/reports", reportsRoutes); // Generación de reportes
app.use("/api/compare", compareRoutes); // Comparación de datos

export default app;