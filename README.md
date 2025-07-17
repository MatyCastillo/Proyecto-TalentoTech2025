# Proyecto React - Curso Taleto Tech 2025

Este proyecto es una tienda ficticia desarrollada en React como parte del **Curso de React de Taleto Tech 2025**. Permite explorar productos, gestionar un carrito de compras y realizar una gestión ficticia de productos (CRUD) utilizando la [FakeStoreAPI](https://fakestoreapi.com/).

## Características

- Listado y detalle de productos.
- Carrito de compras funcional.
- Gestión de productos (crear, editar, eliminar) solo para usuarios autenticados.
- Rutas protegidas para administración.
- Paginación y filtrado por categorías.
- Notificaciones y confirmaciones con SweetAlert2.
- Estilos modernos con Tailwind CSS.

## Credenciales de acceso

Para acceder a las rutas protegidas (gestión de productos), utiliza:

- **Usuario:** `admin`
- **Contraseña:** `admin`

## Rutas principales

- `/` : Página principal, listado de productos.
- `/categoria/:categoria` : Filtrado por categoría.
- `/productos/:id` : Detalle de producto.
- `/productos` : Gestión de productos (CRUD, protegida, requiere login).
- `/login` : Página de inicio de sesión.

## Rutas protegidas

La ruta `/productos` solo es accesible para usuarios autenticados. Si no has iniciado sesión, serás redirigido a `/login`.

## Dependencias principales

- [React](https://react.dev/)
- [React Router DOM](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [SweetAlert2](https://sweetalert2.github.io/)
- [@headlessui/react](https://headlessui.com/) (para modales y menús accesibles)
- [Heroicons](https://heroicons.com/) (iconos SVG)

## Instalación y ejecución local

1. **Clona el repositorio:**
   ```bash
   git clone <url-del-repo>
   cd <nombre-del-repo>
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Ejecuta el proyecto en modo desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abre tu navegador en:**  
   [http://localhost:5173](http://localhost:5173) (o el puerto que indique la terminal)

## Despliegue en producción

1. **Build de producción:**
   ```bash
   npm run build
   ```

2. **El contenido de la carpeta `dist` es el que debes subir a tu hosting (por ejemplo, Netlify o Vercel).**

3. **Para Netlify:**  
   Asegúrate de tener un archivo `_redirects` en la carpeta `public` con el siguiente contenido para soportar rutas internas:
   ```
   /*    /index.html   200
   ```

## Notas importantes

- Los cambios en productos (CRUD) no son persistentes, ya que FakeStoreAPI es solo para pruebas.
- El estado de autenticación se guarda en `localStorage`.
- El diseño es responsive y utiliza componentes accesibles.

---

**Desarrollado para el Curso de React Taleto