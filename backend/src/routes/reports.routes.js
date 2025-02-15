import { Router } from "express";
import { generateReport } from "../controllers/reports.controller.js";

const router = Router();

// Ruta para generar reportes
router.get("/", generateReport);

export default router;