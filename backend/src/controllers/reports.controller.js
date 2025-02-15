export const generateReport = async(req, res) => {
    try {
        // Simulación de un reporte de datos ambientales
        const report = {
            totalCO2: 5000,
            totalWaterConsumption: 30000,
            totalWaste: 1200,
            dateGenerated: new Date()
        };

        res.json({ message: "Reporte generado exitosamente", data: report });
    } catch (error) {
        res.status(500).json({ message: "Error al generar el reporte", error });
    }
};