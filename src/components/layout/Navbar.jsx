import React, { useContext, useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { capitalizeFirst } from "../../helpers/helpers";
import { CartContext } from "../../context/CartContext";
import CartDrawer from "./CartDrawer";
import { AuthContext } from "../../context/AuthContext";

const navigation = [
  { name: "Inicio", href: "/", current: true, autorization: null },
  { name: "Categorías", href: "#", current: false, autorization: null },
  { name: "Gestión de Productos", href: "/productos", autorization: "user" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const { cart } = useContext(CartContext);
  const { logout, isAuthenticated } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [openCart, setOpenCart] = useState(false);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <Disclosure as="nav" className="bg-transparent w-full">
      <div className="w-[90%] mx-auto px-2 sm:px-6 lg:px-8">
        <div
          className="
                relative flex h-16 items-center justify-between
    bg-gray-800 rounded-b-2xl shadow-lg
    mx-0 px-4
          "
        >
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-[open]:block"
              />
            </DisclosureButton>
            {/* Mobile menu button*/}
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => {
                  if (item.autorization === "user" && !isAuthenticated) {
                    return null;
                  }
                  if (item.name === "Categorías") {
                    return (
                      <Menu as="div" className="relative" key={item.name}>
                        <div>
                          <MenuButton
                            className={classNames(
                              "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium flex items-center",
                            )}
                          >
                            {item.name}
                            <svg
                              className="ml-1 h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </MenuButton>
                        </div>
                        <MenuItems className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                          {categories.map((cat) => (
                            <MenuItem key={cat.name}>
                              <a
                                cursor="wait"
                                href={`/categoria/${cat}`}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-crosshair"
                              >
                                {capitalizeFirst(cat)}
                              </a>
                            </MenuItem>
                          ))}
                        </MenuItems>
                      </Menu>
                    );
                  }
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium",
                      )}
                    >
                      {item.name}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Bottons Starts */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none "
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Ver Notificaiones</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>
            <button
              onClick={() => setOpenCart(true)}
              type="button"
              className="relative bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none "
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Ver Carrito</span>
              <ShoppingCartIcon aria-hidden="true" className="size-6" />
            </button>
            <span className="text-white">{cart.length}</span>
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex bg-gray-800 text-sm focus:outline-none ">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Abrir menú de usuario</span>
                  <UserIcon
                    className="size-6 text-gray-400"
                    aria-hidden="true"
                  />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                {!isAuthenticated ? (
                  <MenuItem>
                    {({ active }) => (
                      <a
                        href="/login"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700 w-full text-left",
                        )}
                      >
                        Iniciar Sesión
                      </a>
                    )}
                  </MenuItem>
                ) : (
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700 w-full text-left",
                        )}
                      >
                        Cerrar Sesión
                      </button>
                    )}
                  </MenuItem>
                )}
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium",
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
      {openCart && <CartDrawer open={openCart} setOpen={setOpenCart} />}
    </Disclosure>
  );
}
