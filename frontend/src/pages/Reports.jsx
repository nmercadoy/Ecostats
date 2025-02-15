import { useEffect, useState } from "react";

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/reports") // Ajusta la URL según el backend
      .then((response) => response.json())
      .then((data) => setReports(data))
      .catch((error) => console.error("Error al obtener reportes:", error));
  }, []);

  return (
    <div>
      <h2>Reportes Generados</h2>
      <ul>
        {reports.map((report) => (
          <li key={report._id}>{report.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;
