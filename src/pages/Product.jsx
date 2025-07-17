import React, { useContext, useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { useParams } from "react-router-dom";
import { capitalizeFirst } from "../helpers/helpers";
import { CartContext } from "../context/CartContext";
import Swal from "sweetalert2";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProducto(data));
  }, [id]);

  const reviews = {
    href: "#",
    average: Math.round(producto?.rating?.rate || 0),
    totalCount: producto?.rating?.count || 0,
  };

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

  if (!producto) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="text-gray-500 text-lg">Cargando producto...</span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Imagen */}
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-white p-8">
          <img
            alt={producto.title}
            src={producto.image}
            className="w-full max-w-xs object-contain rounded-xl shadow-lg border border-gray-100"
          />
          <span className="mt-6 inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide shadow">
            {capitalizeFirst(producto.category)}
          </span>
        </div>
        {/* Info */}
        <div className="flex flex-col justify-center p-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{producto.title}</h1>
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                  key={rating}
                  aria-hidden="true"
                  className={classNames(
                    reviews.average > rating ? "text-yellow-400" : "text-gray-200",
                    "w-5 h-5"
                  )}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500">
              {reviews.average} / 5 ({reviews.totalCount} opiniones)
            </span>
          </div>
          <p className="text-base text-gray-700 mb-6">{producto.description}</p>
          <div className="flex items-center mb-6">
            <span className="text-4xl font-bold text-indigo-700 mr-4">${producto.price.toFixed(2)}</span>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                className="px-3 py-1 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition"
                onClick={() => setCantidad((c) => Math.max(1, c - 1))}
              >
                -
              </button>
              <span className="px-4 py-1 text-lg font-semibold">{cantidad}</span>
              <button
                className="px-3 py-1 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition"
                onClick={() => setCantidad((c) => c + 1)}
              >
                +
              </button>
            </div>
          </div>
          <button
            onClick={() => addProduct(producto, cantidad)}
            type="button"
            className="w-full rounded-lg bg-indigo-600 px-8 py-3 text-lg font-semibold text-white hover:bg-indigo-700 shadow transition"
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}