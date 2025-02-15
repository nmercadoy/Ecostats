export const getProjects = async(req, res) => {
    try {
        res.json([{ id: 1, name: "Proyecto de reforestación" }, { id: 2, name: "Reciclaje comunitario" }]);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener proyectos" });
    }
};