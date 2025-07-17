import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import React from "react";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import { CartProvider } from "./context/CartContext";
import Product from "./pages/Product";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import Products from "./pages/Products";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/categoria/:categoria" element={<Home />} />
            <Route path="/productos/:id" element={<Product />} />
            <Route
              path="/productos"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
