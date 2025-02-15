import React, { useState } from "react"; 
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { loginUser, registerUser } from "../services/Api";

const Login = ({ setAuth }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const toggleSignup = () => {
    setIsSignup(!isSignup);
    setErrors({});
  };

  // 🔹 Validaciones en tiempo real
  const validateFields = () => {
    let newErrors = {};
    if (!email.trim()) newErrors.email = "El correo es obligatorio";
    if (!password.trim()) newErrors.password = "La contraseña es obligatoria";
    
    // Validación avanzada de contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      newErrors.password = "Mínimo 8 caracteres, una mayúscula, un número y un carácter especial";
    }

    if (isSignup) {
      if (!name.trim()) newErrors.name = "El nombre es obligatorio";
      if (!confirmPassword.trim()) newErrors.confirmPassword = "Confirme su contraseña";
      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Las contraseñas no coinciden";
      }
    }
    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }

    const response = await loginUser({ email, password });

    console.log("📥 Respuesta del backend:", response); // 🔍 Depuración

    if (response.token) {
        localStorage.setItem("token", response.token);
        console.log("📌 Token guardado en localStorage:", localStorage.getItem("token")); // 🔍 Depuración
        setAuth(true); // ✅ Esto actualizará `isAuthenticated` en `App.jsx`
        alert("Inicio de sesión exitoso");
        navigate ("/dashboard"); 
    } else {
        alert("❌ Error en el login: " + response.message);
    }
};



  const handleSignup = async (e) => {
    e.preventDefault();
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }

    console.log("Datos enviados al backend:", { name, email, password, confirmPassword }); // Depuración

    const response = await registerUser({ name, email, password, confirmPassword });

    if (response.message === "Usuario registrado exitosamente") {
        alert("Registro exitoso. Ahora inicia sesión.");
        setIsSignup(false);
    } else {
        setErrors({ general: "Error en el registro: " + response.message });
    }
};


  return (
    <div>
      <div className={`cont ${isSignup ? "s--signup" : ""}`}>
        <div className="form sign-in">
          <h2>¡Bienvenido de nuevo!</h2>
          <form onSubmit={handleLogin}>
            <label>
              <span>Email</span>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                onBlur={() => setErrors(validateFields())} // Validación en tiempo real
                required 
                title={errors.email || "Ingrese su correo electrónico"} 
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </label>
            <label>
              <span>Contraseña</span>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                onBlur={() => setErrors(validateFields())}
                required 
                title={errors.password || "Ingrese su contraseña"} 
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </label>
            <button type="submit">Iniciar Sesión</button>
          </form>
        </div>

        <div className="form sign-up">
          <h2>¡Únete a nosotros!</h2>
          <form onSubmit={handleSignup}>
            <label>
              <span>Nombre</span>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                onBlur={() => setErrors(validateFields())}
                required 
                title={errors.name || "Ingrese su nombre"} 
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </label>
            <label>
              <span>Email</span>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                onBlur={() => setErrors(validateFields())}
                required 
                title={errors.email || "Ingrese su correo electrónico"} 
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </label>
            <label>
              <span>Contraseña</span>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                onBlur={() => setErrors(validateFields())}
                required 
                title={errors.password || "Ingrese su contraseña"} 
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </label>
            <label>
              <span>Confirmar Contraseña</span>
              <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                onBlur={() => setErrors(validateFields())}
                required 
                title={errors.confirmPassword || "Confirme su contraseña"} 
              />
              {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
            </label>
            {errors.general && <p className="error-message">{errors.general}</p>}
            <button type="submit">Registrarse</button>
          </form>
        </div>

        <div className="sub-cont">
          <div className="img__text">
            <h2>{isSignup ? "¿Ya tienes cuenta?" : "¿Nuevo aquí?"}</h2>
            <p>
              {isSignup
                ? "Inicia sesión para continuar donde lo dejaste."
                : "Regístrate y accede a nuevas oportunidades."}
            </p>
            <button onClick={toggleSignup} className="img__btn">
              {isSignup ? "Iniciar Sesión" : "Registrarse"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  setAuth: PropTypes.func.isRequired,
};

export default Login;
