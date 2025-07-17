import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProductCard = (product) => {
  const { addToCart } = useContext(CartContext);
  const [cantidad, setCantidad] = useState(1);
  const navigate = useNavigate();

  const incrementar = () => setCantidad(cantidad + 1);
  const decrementar = () => setCantidad(cantidad > 1 ? cantidad - 1 : 1);

  const addProduct = (pr, cantidad) => {
    addToCart(pr, cantidad);
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      html: `${pr.title} <br><p style="color:green;"> x ${cantidad} ${cantidad > 1 ? "Unidades" : "Unidad"}.</p><br><strong>Añadido al Carrito</strong>`,
    });
  };

  const pr = product.product;
  return (
    <div
      className="w-11/12 bg-slate-200 rounded-lg shadow-md p-4 flex flex-col hover:shadow-lg transition-shadow transition-transform duration-200 hover:scale-105 h-full cursor-pointer"
      onClick={() => navigate(`/productos/${pr.id}`)}
    >
      <div className="w-full h-48 flex items-center justify-center bg-white rounded-md mb-4">
        <img
          src={pr.image}
          alt={pr.title}
          className="max-h-44 object-contain"
        />
      </div>
      <h3 className="text-base font-semibold text-gray-800 text-center mb-2 truncate">
        {pr.title}
      </h3>
      <p className="text-sm text-gray-500 mb-2">
        <strong>Categoria:</strong> {pr.category}
      </p>
      <span className="text-lg font-bold text-gray-800">${pr.price}</span>
      <div className="mt-4 mb-4 flex items-center justify-end">
        <button
          className="px-2 py-0.1 border-2 border-gray-400 text-gray-700 rounded-l-md hover:text-white hover:bg-gray-700 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            decrementar();
          }}
        >
          -
        </button>
        <span className="px-2 py-0.1 border-2 border-gray-400 text-gray-700 border-r-0 border-l-0">
          {cantidad}
        </span>
        <button
          className="px-2 py-0.1 border-2 border-gray-400 text-gray-700 rounded-r-md hover:text-white hover:bg-gray-700 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            incrementar();
          }}
        >
          +
        </button>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          addProduct(pr, cantidad, e);
        }}
        className="mt-auto px-4 py-2 text-black hover:text-lime-700 rounded-md border-2 border-indigo-500/100 hover:border-lime-700 transition-colors font-semibold shadow-sm"
      >
        Agregar{" "}
      </button>
    </div>
  );
};

export default ProductCard;
