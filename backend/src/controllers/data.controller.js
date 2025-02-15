export const addData = async(req, res) => {
    try {
        const { co2_emissions, water_consumption, waste_generated } = req.body;

        const newData = {
            co2_emissions,
            water_consumption,
            waste_generated,
            date: new Date(),
        };

        // Simulación de guardado en base de datos
        console.log("📌 Datos almacenados:", newData);

        res.status(201).json({ message: "Datos guardados correctamente", data: newData });
    } catch (error) {
        res.status(500).json({ message: "Error al guardar los datos", error });
    }
};

export const getData = async(req, res) => {
    try {
        // Simulación de datos recuperados desde la base de datos
        const sampleData = [
            { co2_emissions: 500, water_consumption: 3000, waste_generated: 100, date: "2024-02-11" },
            { co2_emissions: 450, water_consumption: 2900, waste_generated: 95, date: "2024-02-10" },
        ];

        res.status(200).json({ message: "Datos recuperados exitosamente", data: sampleData });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los datos", error });
    }
};