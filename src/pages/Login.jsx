import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(user, pass)) {
      navigate("/");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfaf7] relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-[url('/your-illustration-path.svg')] bg-no-repeat bg-bottom bg-contain opacity-90 pointer-events-none" />

      {/* Contenedor principal */}
      <div className="relative z-10 w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        {/* Encabezado */}
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          Iniciar Sesión <span className="font-normal text-gray-600"></span>
        </h2>

        {/* Formulario */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Usuario
            </label>
            <input
              type="text"
              id="user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="admin"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                ¿Olvidó su contraseña?
              </a>
            </div>
            <input
              type="password"
              id="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="admin"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition"
          >
            Ingresar
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>

        {/* Registro */}
        <p className="text-sm text-center text-gray-600 mt-4">
          ¿No tiene cuenta?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Cree una
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
