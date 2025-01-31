export const API_BASE_URL = "https://api.example.com";

export const fetchData = async(endpoint) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error("Error en la solicitud");
        }
        return await response.json();
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
};