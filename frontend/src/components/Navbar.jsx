import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">EcoStats</div>
      <ul className="nav-links">
        <li>
          <a href="/">Inicio</a>
        </li>
        <li>
          <a href="/about">Acerca de</a>
        </li>
        <li>
          <a href="/contact">Contacto</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
