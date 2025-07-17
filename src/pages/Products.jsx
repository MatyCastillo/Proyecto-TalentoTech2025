import React, { useEffect, useState } from "react";
import ProductModal from "../components/layout/ProductFormModal";
import Swal from "sweetalert2";

const API_URL = "https://fakestoreapi.com/products";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const tamañoPagina = 8;

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setProducts)
      .catch(() => setFetchError(true));
  }, []);

  // Ordenar productos: el último agregado primero
  const productosOrdenados = [...products].sort((a, b) => b.id - a.id);

  // Paginación
  const paginasTotales = Math.ceil(productosOrdenados.length / tamañoPagina);
  const productosPaginados = productosOrdenados.slice(
    (currentPage - 1) * tamañoPagina,
    currentPage * tamañoPagina
  );

  // Swal helpers
  const showSuccess = (msg) =>
    Swal.fire({ icon: "success", title: msg, toast: true, timer: 2000, position: "top-end", showConfirmButton: false });
  const showError = (msg) =>
    Swal.fire({ icon: "error", title: msg, toast: true, timer: 2000, position: "top-end", showConfirmButton: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        if (editingId) {
          setProducts(products.map((p) => (p.id === editingId ? data : p)));
          showSuccess("Producto actualizado correctamente");
        } else {
          setProducts([...products, data]);
          showSuccess("Producto agregado correctamente");
        }
        setEditingId(null);
        setShowModal(false);
        setForm({
          title: "",
          price: "",
          description: "",
          image: "",
          category: "",
        });
        setCurrentPage(1); // Volver a la primera página para ver el nuevo producto
      })
      .catch(() => showError("Error al guardar el producto"));
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el producto.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${API_URL}/${id}`, { method: "DELETE" })
          .then(() => {
            setProducts(products.filter((p) => p.id !== id));
            showSuccess("Producto eliminado correctamente");
          })
          .catch(() => showError("Error al eliminar el producto"));
      }
    });
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setForm({
      title: "",
      price: "",
      description: "",
      image: "",
      category: "",
    });
    setEditingId(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm({
      title: "",
      price: "",
      description: "",
      image: "",
      category: "",
    });
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white min-h-screen py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-10">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
          Gestión de Productos
        </h2>
        <button
          onClick={handleAddNew}
          className="mb-8 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition font-semibold"
        >
          Agregar nuevo producto
        </button>
        {fetchError && (
          <p className="text-red-500">Error al cargar productos.</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {productosPaginados.map((product) => (
            <div
              key={product.id}
              className="bg-indigo-50 rounded-xl shadow p-5 flex flex-col"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-contain mb-4 rounded-lg bg-white border"
              />
              <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-2">
                {product.category}
              </span>
              <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">
                {product.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {product.description}
              </p>
              <span className="text-xl font-bold text-indigo-700 mb-4">
                ${Number(product.price).toFixed(2)}
              </span>
              <div className="mt-auto flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Paginación */}
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
            onClick={() => setCurrentPage((p) => Math.min(p + 1, paginasTotales))}
            disabled={currentPage === paginasTotales}
            className="px-4 py-2 border rounded disabled:opacity-50 bg-white hover:bg-gray-200 transition"
          >
            {">"}
          </button>
        </div>
      </div>
      <ProductModal
        open={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        form={form}
        setForm={setForm}
        editing={!!editingId}
      />
    </div>
  );
}