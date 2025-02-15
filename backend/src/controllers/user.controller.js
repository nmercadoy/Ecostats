import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { TOKEN_SECRET } from "../../config.js";
export const register = async(req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Las contraseñas no coinciden" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

export const login = async(req, res) => {
    try {
        console.log("📥 Datos recibidos en backend:", req.body); // 🔍 Verificación

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ id: user._id }, TOKEN_SECRET, { expiresIn: "1h" });

        console.log("📌 Token generado en backend:", token); // 🔍 Depuración

        res.json({ token });
    } catch (error) {
        console.error("❌ Error en el backend:", error);
        res.status(500).json({ message: "Error en el servidor", error });
    }
};