import React from "react";
import PropTypes from "prop-types";

export default function ProductModal({
  open,
  onClose,
  onSubmit,
  form,
  setForm,
  editing,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
          aria-label="Cerrar"
        >
          &times;
        </button>
        <h3 className="text-xl font-bold mb-4 text-indigo-700">
          {editing ? "Editar Producto" : "Agregar Producto"}
        </h3>
        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Título"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="number"
            placeholder="Precio"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
            className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            placeholder="Descripción"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            placeholder="Imagen (URL)"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            required
            className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            placeholder="Categoría"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
            className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            {editing ? "Actualizar" : "Crear"}
          </button>
        </form>
      </div>
    </div>
  );
}

ProductModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  form: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  setForm: PropTypes.func.isRequired,
  editing: PropTypes.bool,
};

ProductModal.defaultProps = {
  editing: false,
};
