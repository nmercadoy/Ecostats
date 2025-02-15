import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types"; // Importamos PropTypes

const ProtectedRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

// Agregamos validación de props con PropTypes
ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
