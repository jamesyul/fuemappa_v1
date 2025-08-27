# Sistema de Inventario para FUEM Racing (Fuemappa_v1)

¡Felicidades por tener tu proyecto totalmente desplegado!

**Enlaces de Producción:**
*   **Aplicación Frontend:** [fuemappa-frontend.vercel.app](https://fuemappa-frontend.vercel.app)
*   **API Backend:** [fuemappa-backend.vercel.app/api](https://fuemappa-backend.vercel.app/api)

---

## 📜 Descripción

**Fuemappa_v1** es un sistema de gestión de inventario diseñado a medida para el equipo de competición **FUEM Racing**. La aplicación permite un control detallado de las piezas, organizadas por departamentos, con un sistema de autenticación robusto y roles de usuario para garantizar la seguridad y la integridad de los datos.

Este proyecto está construido como un monorepo, con un frontend moderno desarrollado en React y un backend robusto basado en Node.js, ambos desplegados de forma independiente en Vercel para un rendimiento y escalabilidad óptimos.

## ✨ Características Principales

*   **Autenticación Segura:** Sistema de registro y login con tokens JWT.
*   **Control de Acceso Basado en Roles (RBAC):**
    *   `admin`: Control total sobre usuarios, departamentos y piezas.
    *   `jefe_departamento`: Puede gestionar las piezas de su propio departamento.
    *   `integrante_departamento`: Permisos de solo lectura.
*   **Gestión de Inventario (CRUD):** Creación, lectura, actualización y eliminación de piezas.
*   **Gestión de Departamentos (CRUD):** Administración completa de los departamentos del equipo.
*   **Análisis de Datos:** Funcionalidad para procesar archivos `.csv` (desde Google Drive) para análisis y visualización de datos.
*   **Búsqueda y Filtrado:** Búsqueda rápida de piezas por nombre o código.

## 🚀 Stack Tecnológico

### Frontend

*   **Framework:** React 19 con Vite
*   **Lenguaje:** TypeScript
*   **Gestión de Estado:** Zustand
*   **Enrutamiento:** React Router
*   **Estilos:** Tailwind CSS
*   **Peticiones HTTP:** Axios

### Backend

*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Base de Datos y BaaS:** Supabase
*   **Autenticación:** JSON Web Tokens (JWT) y bcryptjs
*   **Módulos:** ES Modules (`"type": "module"`)

## 🔧 Instalación y Ejecución Local

Sigue estos pasos para levantar el proyecto en tu máquina local.

### Prerrequisitos

*   Node.js (versión 18.x o superior)
*   npm (o tu gestor de paquetes preferido)
*   Una cuenta en [Supabase](https://supabase.com/) para la base de datos.

### Pasos

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/jamesyul/fuemappa_v1.git
    cd fuemappa_v1
    ```

2.  **Configura las Variables de Entorno:**
    Necesitarás crear dos archivos `.env`: uno para el backend y otro para el frontend.

    *   **Backend:** Crea un archivo `backend/.env` y añade tus claves.
        ```ini
        # backend/.env
        SUPABASE_URL=https://<tu-id-de-proyecto>.supabase.co
        SUPABASE_KEY=<tu-clave-service_role-de-supabase>
        JWT_SECRET=<tu-clave-secreta-larga-y-aleatoria>
        FRONTEND_URL=http://localhost:5173
        ```

    *   **Frontend:** Crea un archivo `frontend/.env.local` y añade la URL de tu API local.
        ```ini
        # frontend/.env.local
        VITE_API_URL=http://localhost:5000
        ```
        *Nota: Al desplegar en Vercel, `VITE_API_URL` apuntará a la URL del backend de producción.*

3.  **Instala todas las dependencias:**
    Desde la raíz del proyecto, ejecuta el script personalizado que instala las dependencias de ambos directorios.
    ```bash
    npm install # Opcional, para instalar 'concurrently' en la raíz
    npm run install-all
    ```

4.  **Ejecuta el servidor de desarrollo:**
    Este comando levantará el frontend y el backend simultáneamente.
    ```bash
    npm run dev
    ```
    *   El frontend estará disponible en `http://localhost:5173`.
    *   El backend estará disponible en `http://localhost:5000`.

## ☁️ Despliegue en Vercel

Este proyecto utiliza una estrategia de despliegue de **dos proyectos separados en Vercel que apuntan a un único monorepo.**

### Proyecto 1: `fuemappa-frontend`

*   **Framework Preset:** `Vite`
*   **Root Directory:** `frontend`
*   **Build Command:** `npm run build`
*   **Output Directory:** `dist`
*   **Variables de Entorno:**
    *   `VITE_API_URL`: `https://fuemappa-backend.vercel.app` (o la URL de tu backend desplegado)

### Proyecto 2: `fuemappa-backend`

*   **Framework Preset:** `Other` (con un `vercel.json` en su directorio)
*   **Root Directory:** `backend`
*   **Build & Development Settings:** No se usan overrides; la configuración se define en `backend/vercel.json`.
*   **Variables de Entorno:**
    *   `SUPABASE_URL`
    *   `SUPABASE_KEY` (la clave `service_role`)
    *   `JWT_SECRET`
    *   `FRONTEND_URL`: `https://fuemappa-frontend.vercel.app`

---

¡Gracias por revisar el proyecto!
