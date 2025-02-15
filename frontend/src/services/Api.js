const API_URL = "http://localhost:5000/api/users";
const DATA_API_URL = "http://localhost:5000/api/data";

// 🔹 Obtener datos ambientales
export const fetchEnvironmentalData = async() => {
    try {
        const response = await fetch(`${DATA_API_URL}/`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Error al obtener datos ambientales");
        return await response.json();
    } catch (error) {
        console.error("Error en fetchEnvironmentalData:", error);
        return { error: error.message };
    }
};

// 🔹 Agregar nuevos datos ambientales
export const addEnvironmentalData = async(data) => {
    try {
        const response = await fetch(`${DATA_API_URL}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error("Error al agregar datos ambientales");
        return await response.json();
    } catch (error) {
        console.error("Error en addEnvironmentalData:", error);
        return { error: error.message };
    }
};

// 🔹 Autenticación
export const loginUser = async(userData) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        if (!response.ok) throw new Error("Error en el inicio de sesión");
        return await response.json();

    } catch (error) {
        console.error("Error en loginUser:", error);
        return { error: error.message };
    }
};

export const registerUser = async(userData) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        if (!response.ok) throw new Error("Error en el registro");
        return await response.json();
    } catch (error) {
        console.error("Error en registerUser:", error);
        return { error: error.message };
    }
};