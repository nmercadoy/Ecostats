import React, { useEffect, useRef } from "react";
import "../index.css"; // Archivo de estilos actualizado";
const Home = () => {
  const cardsRef = useRef(null);

  useEffect(() => {
    const cards = cardsRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const cardElements = cards.querySelectorAll(".card");
    cardElements.forEach((card) => observer.observe(card));

    return () => {
      cardElements.forEach((card) => observer.unobserve(card));
    };
  }, []);

  const proyectos = [
    {
      id: 1,
      nombre: "Siembra de Un Millón de Árboles",
      imagen: "https://img.icons8.com/?size=100&id=18053&format=png&color=000000",
      descripcion:
        "Iniciativa de reforestación que busca restaurar ecosistemas dañados en Ecuador.",
      enlace: "https://reddecuador.ambiente.gob.ec/redd/?page_id=568",
    },
    {
      id: 2,
      nombre: "Reciclaje Inclusivo",
      imagen: "https://img.icons8.com/?size=100&id=13099&format=png&color=000000",
      descripcion:
        "Programa que impulsa el reciclaje con inclusión social para recolectores urbanos.",
      enlace:
        "https://www.ambiente.gob.ec/proyecto-gestion-integral-de-residuos-solidos-y-economia-circular-inclusiva-greci/",
    },
    {
      id: 3,
      nombre: "Energía Renovable en Galápagos",
      imagen: "https://img.icons8.com/?size=100&id=1699lMcmILh1&format=png&color=000000",
      descripcion:
        "Proyectos de energía solar y eólica para reducir la dependencia de combustibles fósiles.",
      enlace:
        "https://www.recursosyenergia.gob.ec/ministerio-de-energia-y-minas-presento-plan-de-transicion-energetica-para-galapagos/",
    },
    {
      id: 4,
      nombre: "Conservación de la Biodiversidad Marino ",
      imagen: "/biodiversity.png" ,
      descripcion:
        "Campañas para la conservación de la biodiversidad marina de las costas de Ecuador.",
      enlace:
        "https://www.ambiente.gob.ec/conservacion-biodiversidad-marino-costera/",
    },
  ];

  return (
    <div className="home">
      {/* Hero Section */}

      <div className="hero-section">
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src="/assets/video.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>

        <h1>Proyectos Ecológicos en Ecuador</h1>
        <p>Descubre iniciativas sostenibles que están transformando el medio ambiente.</p>
      </div>

      {/* Contenedor de tarjetas */}
      <div className="card-container" ref={cardsRef}>
        {proyectos.map((proyecto) => (
          <div key={proyecto.id} className="card">
            <img src={proyecto.imagen} alt={proyecto.nombre} />
            <h3>{proyecto.nombre}</h3>
            <p>{proyecto.descripcion}</p>
            <a
              href={proyecto.enlace}
              target="_blank"
              rel="noopener noreferrer"
              className="button"
            >
              Más información
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;