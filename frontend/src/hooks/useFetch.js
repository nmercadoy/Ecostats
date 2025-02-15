import { useState, useEffect } from "react";

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            try {
                console.log(`Fetching data from: ${url}`);

                const token = localStorage.getItem("token"); // 🔹 Obtener el token almacenado
                const headers = { "Content-Type": "application/json" };

                if (token) {
                    headers["Authorization"] = `Bearer ${token}`; // 🔹 Agregar el token en la cabecera
                }

                const response = await fetch(url, { method: "GET", headers });

                if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

                const result = await response.json();
                console.log("Data received:", result);
                setData(result);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};