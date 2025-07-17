import React, { useEffect, useState } from "react";
import ProductCard from "../components/layout/ProductCard";
import { useParams } from "react-router-dom";

export default function Home() {
  const { categoria } = useParams();
  const [products, setProducts] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const tamañoPagina = 8;

  const filteredProducts =
    categoria === undefined
      ? products
      : products.filter((product) => product.category === categoria);

  const paginasTotales = Math.ceil(filteredProducts.length / tamañoPagina);
  const productosPaginados = filteredProducts.slice(
    (currentPage - 1) * tamañoPagina,
    currentPage * tamañoPagina,
  );

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((respose) => respose.json())
      .then((result) => setProducts(result))
      .catch((error) => {
        setFetchError(true);
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white min-h-screen py-10">
      <div className="w-[85%] mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-8 mb-10">
        <h1 className="font-medium uppercase text-2xl mb-6 text-center">
          {categoria === undefined
            ? "Todos los productos"
            : `Categoría - ${categoria}`}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            <div className="col-span-full flex justify-center items-center h-40">
              <svg
                className="animate-spin h-12 w-12 text-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            </div>
          ) : (
            productosPaginados.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
          {fetchError && (
            <p className="col-span-full text-red-500 text-center">
              Error al cargar los productos.
            </p>
          )}
        </div>
        <div className="flex justify-center items-center gap-6 py-4 px-6 mt-8 bg-gray-100 rounded-lg shadow">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded disabled:opacity-50 bg-white hover:bg-gray-200 transition"
          >
            {"<"}
          </button>
          <span className="text-lg font-medium text-gray-700">
            Página {currentPage} de {paginasTotales}
          </span>
          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, paginasTotales))
            }
            disabled={currentPage === paginasTotales}
            className="px-4 py-2 border rounded disabled:opacity-50 bg-white hover:bg-gray-200 transition"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
