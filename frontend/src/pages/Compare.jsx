import { useState, useEffect } from "react";

const Compare = () => {
  const [data, setData] = useState([]);
  const [selectedPeriod1, setSelectedPeriod1] = useState("2024");
  const [selectedPeriod2, setSelectedPeriod2] = useState("2023");

  useEffect(() => {
    fetch(`http://localhost:5000/api/compare?period1=${selectedPeriod1}&period2=${selectedPeriod2}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error al obtener datos:", error));
  }, [selectedPeriod1, selectedPeriod2]);

  return (
    <div>
      <h2>Comparar Tendencias Ambientales</h2>

      <label>Selecciona el primer período:</label>
      <select value={selectedPeriod1} onChange={(e) => setSelectedPeriod1(e.target.value)}>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
      </select>

      <label>Selecciona el segundo período:</label>
      <select value={selectedPeriod2} onChange={(e) => setSelectedPeriod2(e.target.value)}>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
      </select>

      <h3>Resultados de la Comparación:</h3>
      {data.length > 0 ? (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.type}: {item.difference} {item.unit}</li>
          ))}
        </ul>
      ) : (
        <p>No hay datos disponibles.</p>
      )}
    </div>
  );
};

export default Compare;
