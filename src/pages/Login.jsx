import React from 'react';

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfaf7] relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-[url('/your-illustration-path.svg')] bg-no-repeat bg-bottom bg-contain opacity-90 pointer-events-none" />

      {/* Contenedor principal */}
      <div className="relative z-10 w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        {/* Encabezado */}
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          Log in <span className="font-normal text-gray-600">| Individual Edition</span>
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          For school accounts, please go to your school login page.{' '}
          <a href="#" className="text-blue-600 underline">
            Look up your school code.
          </a>
        </p>

        {/* Formulario */}
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Username/Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              id="password"
              placeholder="********"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition"
          >
            Log in
          </button>
        </form>

        {/* Registro */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{' '}
          <a href="#" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
