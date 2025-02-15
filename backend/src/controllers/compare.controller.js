export const compareData = async(req, res) => {
    try {
        // Simulación de comparación de datos ambientales
        const comparison = {
            regionA: {
                totalCO2: 5000,
                totalWaterConsumption: 30000,
                totalWaste: 1200
            },
            regionB: {
                totalCO2: 4000,
                totalWaterConsumption: 28000,
                totalWaste: 1100
            },
            comparisonDate: new Date()
        };

        res.json({ message: "Comparación de datos generada exitosamente", data: comparison });
    } catch (error) {
        res.status(500).json({ message: "Error al comparar los datos", error });
    }
};