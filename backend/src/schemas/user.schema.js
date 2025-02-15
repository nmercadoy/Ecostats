import { z } from "zod";

export const userSchema = z.object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    email: z.string().email("Debe ser un correo válido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});