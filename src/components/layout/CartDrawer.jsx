import React, { useContext } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { func, bool } from "prop-types";

export default function CartDrawer({ open, setOpen }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <DialogPanel
                transition
                className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <TransitionChild>
                  <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 duration-500 ease-in-out data-closed:opacity-0 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="relative rounded-md text-gray-300 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-hidden"
                    >
                      <span className="absolute -inset-2.5" />
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon aria-hidden="true" className="size-6" />
                    </button>
                  </div>
                </TransitionChild>
                <div className="flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl">
                  <div className="px-4 sm:px-6">
                    <DialogTitle className="text-base font-semibold text-gray-900">
                      Su Carrito
                    </DialogTitle>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    <CardCart />
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

CartDrawer.propTypes = {
  open: bool,
  setOpen: func,
};
import { CartContext } from "../../context/CartContext";

export const CardCart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce(
    (acc, product) => acc + product.price * product.cantidad,
    0,
  );

  return (
    <div className="flex flex-col h-full">
      <ul role="list" className="divide-y divide-gray-100">
        {cart.map((product) => (
          <li key={product.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img
                className="size-12 flex-none rounded-full bg-gray-50"
                src={product.image}
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-gray-900">
                  {product.title}
                </p>
                <h2 className="mt-1 truncate text-xs/5 text-gray-500">
                  Cantidad: {product.cantidad}
                </h2>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm/6 text-gray-900">$ {product.price}</p>
              <p className="mt-1 text-xs/5 text-gray-500">
                Sub-total: $ {product.cantidad * product.price}
              </p>
              <button
                className="mt-1 text-xs/5 text-red-500 underline"
                onClick={() => removeFromCart(product.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="border-t pt-4 mt-4 flex justify-between items-center">
        <span className="font-bold text-lg text-gray-900">Total:</span>
        <span className="font-bold text-lg text-green-700">
          ${total.toFixed(2)}
        </span>
      </div>
    </div>
  );
};
