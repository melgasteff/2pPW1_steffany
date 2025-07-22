# Casamiento Koygua - Gestión de Ventas y Pagos

Esta es una aplicación web desarrollada con React y Node.js (Express) para gestionar una actividad poplar en el San Juan Paraguayo, llamado "Casamiento Koygua" y registrar pagos asociados a cada uno.


## Backend

1. `cd apps/backend`
2. `npm install`
3. `npm start`

## Frontend

1. `cd apps/frontend`
2. `npm install`
3. `npm run dev`

## Funcionalidades Principales

    Registrar casamientos (nombre de los contrayentes, fecha, etc.).
    Registrar pagos asociados a un casamiento (monto, descripción, fecha).
    Editar o eliminar ventas existentes.
    Navegación sencilla para crear nuevos casamientos desde el módulo de pagos.
    Visualización en tabla de todos los pagos realizados.

## Módulos CRUD implementados
## Casamiento

    POST /api/casamiento: Crear nuevo casamiento.
    GET /api/casamiento: Listar casamientos.
    PUT /api/casamiento/:id: Actualizar datos de casamiento.

## Ventas / Pagos

    GET /api/ventas: Obtener todos los pagos registrados.
    PUT /api/ventas/:id: Editar un pago.
    DELETE /api/ventas/:id: Eliminar un pago y el casamiento vinculado.
    Los pagos están vinculados mediante id_casamiento al casamiento correspondiente.

## Tecnologias 
## Backend (Servidor)

    Node.js – Entorno de ejecución para JavaScript en el servidor.
    Express.js – Framework para construir la API REST.
    TypeScript – Lenguaje fuertemente tipado para mayor seguridad y mantenimiento del código.
    MySQL – Base de datos relacional para almacenar casamientos y pagos.
    Drizzle ORM – Mapeador objeto-relacional moderno y liviano para interactuar con la base de datos.
    CORS – Middleware para permitir peticiones entre el frontend y backend.


## Frontend (Cliente)

    React – Biblioteca para construir interfaces de usuario.
    TypeScript – Mejora la escalabilidad y confiabilidad del código en React.
    Vite – Herramienta de desarrollo rápida para bundling y hot-reloading.
    Tailwind CSS – Framework de estilos para crear una interfaz moderna y responsiva.
    React Router DOM – Para la navegación entre páginas.
    
