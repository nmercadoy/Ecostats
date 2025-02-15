import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Reports from "./pages/Reports";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Compare from "./pages/Compare";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Ocultar Navbar y Footer en estas rutas específicas
  const hideNavbarFooter = ["/login", "/dashboard", "/reports", "/compare"].includes(location.pathname);
  const hideFooter = location.pathname === "/contact";

  // ✅ Estado para manejar autenticación dinámicamente
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  // ✅ Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  // ✅ useEffect para actualizar `isAuthenticated` si cambia `localStorage`
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", checkAuth); // Escuchar cambios en localStorage

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Mostrar Navbar solo si NO está en login, dashboard, reports o compare */}
      {!hideNavbarFooter && <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />}

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </main>

      {/* Mostrar Footer solo si NO está en login, dashboard, reports o compare */}
      {!hideNavbarFooter && !hideFooter && <Footer />}
    </div>
  );
};

// ✅ Envolver en Router
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
