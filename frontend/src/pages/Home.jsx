import React from "react";
import "../index.css";

const Home = () => {
  return (
    <div className="home">
      <h1>Bienvenido a EcoStats</h1>
      <p>Plataforma para el análisis de impacto ambiental.</p>

      {/* Contenedor de las tarjetas */}
      <div className="card-container">
        <div className="card">
          <img src="https://cdn-icons-png.flaticon.com/512/2903/2903531.png" alt="Reciclaje" />
          <h3>Reciclaje</h3>
          <p>Descubre cómo el reciclaje reduce la contaminación y protege el medio ambiente.</p>
        </div>

        <div className="card">
          <img src="https://cdn-icons-png.flaticon.com/512/1814/1814019.png" alt="Energía limpia" />
          <h3>Energía Limpia</h3>
          <p>Conoce el impacto de las energías renovables y cómo ayudan a reducir el CO₂.</p>
        </div>

        <div className="card">
          <img src="https://cdn-icons-png.flaticon.com/512/2972/2972435.png" alt="Cambio climático" />
          <h3>Cambio Climático</h3>
          <p>Información sobre el calentamiento global y sus efectos en el planeta.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
