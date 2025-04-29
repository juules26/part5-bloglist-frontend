# Bloglist Frontend

Frontend de una aplicación de blogs donde puedes iniciar sesión, ver una lista de blogs, crear nuevos, dar likes y borrar blogs (si eres el autor).

Esta parte del proyecto está hecha con React y se comunica con una API backend hecha con Node.js y MongoDB.

## Características

- Inicio de sesión
- Mostrar blogs ordenados por likes
- Crear nuevos blogs
- Dar "like" a blogs existentes
- Borrar blogs propios
- Notificaciones de éxito/error
- Manejo de errores y login persistente

## Tecnologías usadas (Frontend)

- React
- Axios
- React Testing Library (tests)
- Jest
- Cypress (para testing end-to-end)

## Tecnologías usadas (Backend)

- Node.js
- Express
- MongoDB

## Cómo iniciar la app

Asegúrate de tener el backend corriendo en `http://localhost:3001`.

```bash
git clone https://github.com/[tu usuario]/bloglist-frontend.git
cd bloglist-frontend
npm install
npm start
