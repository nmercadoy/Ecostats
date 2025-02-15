import { useEffect, useState } from "react";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/projects") // Ajusta la URL según el backend
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error al obtener proyectos:", error));
  }, []);

  return (
    <div>
      <h2>Proyectos Ambientales</h2>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
