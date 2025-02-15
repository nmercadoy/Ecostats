import { Router } from "express";
import { compareData } from "../controllers/compare.controller.js";

const router = Router();

// Ruta para comparar datos ambientales
router.get("/", compareData);

export default router;