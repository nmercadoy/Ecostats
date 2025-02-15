import { Router } from "express";
import { verifyToken } from "../middlewares/auth.token.js"; // ✅ Verifica que esta ruta sea correcta
import { addData, getData } from "../controllers/data.controller.js";

const router = Router();

// Rutas protegidas con autenticación
router.get("/public", getData); // ✅ Endpoint público
router.get("/", verifyToken, getData); // 🔒 Endpoint protegido


export default router;