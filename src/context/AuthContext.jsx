import PropTypes from "prop-types";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = cargando
  const [role, setRole] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    const savedRole = localStorage.getItem("role");
    setIsAuthenticated(auth === "true");
    setRole(savedRole);
  }, []);

  const login = (user, pass) => {
    if (user === "admin" && pass === "admin") {
      setIsAuthenticated(true);
      setRole("admin");
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("role", "admin");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("role");
  };

  // Evita renderizar hijos hasta que se sepa si está autenticado o no
  if (isAuthenticated === null) {
    return <div>Cargando...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
