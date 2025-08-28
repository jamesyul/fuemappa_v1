# Centro de Software Formula UEM

<p align="left">
  <img src="https://img.shields.io/badge/version-1.0-green">
  <img src="https://img.shields.io/badge/test-✓-green">
</p>

El **Centro de Software FUEM** es una plataforma **full-stack y modular** diseñada para cubrir las necesidades del equipo mediante aplicaciones específicas que se integran en un mismo entorno.

Su objetivo es **desarrollar, ampliar e integrar nuevas herramientas progresivamente**, ofreciendo un espacio centralizado y accesible para la gestión de datos, piezas y organización interna.

La filosofía es clara: **una sola plataforma, múltiples soluciones**. Cada aplicación nace para resolver un problema concreto, pero todas conviven de manera unificada para facilitar el trabajo del equipo.

**Accede al centro de aplicacione smediante el siguiente enlace:** **[fuemappa-frontend.vercel.app](https://fuemappa-frontend.vercel.app)**

---

### Vista Previa de la Aplicación

<img width="1904" height="868" alt="Captura de pantalla 2025-08-28 174123" src="https://github.com/user-attachments/assets/d39e63b4-2956-48ac-b5c4-6b864e58f957" />

<img width="1885" height="930" alt="Captura de pantalla 2025-08-28 171808" src="https://github.com/user-attachments/assets/d57d1eef-3b56-4b50-bc04-a53dda924fd6" />

---

## Aplicaciones actuales

### 📊 Nexus CSV Data Plotter
Convierte los datos recopilados por la memoria SD de **Nexus** en **gráficas claras y exportables**.  
Permite **analizar, visualizar y procesar información cruda**, agilizando la interpretación de resultados.

<img width="1898" height="931" alt="Captura de pantalla 2025-08-28 173440" src="https://github.com/user-attachments/assets/5d42efb7-960e-404b-9c38-b1774893d6f0" />

---

### ⚙️ Code Assembler
Herramienta para **gestionar y rastrear piezas y ensamblajes**.  
Asegura un **control preciso y detallado** de los sistemas técnicos del equipo, garantizando trazabilidad y organización en el inventario.

<img width="1898" height="935" alt="Captura de pantalla 2025-08-28 172839" src="https://github.com/user-attachments/assets/c8322d99-e577-4783-9e80-25c2f68b4f1e" />

---

### 👥 Department Manager
Aplicación orientada a la **gestión de departamentos y sus miembros**.  
Facilita la **organización interna, asignación de responsabilidades y visibilidad del equipo**, optimizando la coordinación entre áreas.  

<img width="1905" height="939" alt="Captura de pantalla 2025-08-28 172909" src="https://github.com/user-attachments/assets/99db89c0-935a-4069-930b-701135e455cf" />

---

## Stack Tecnológico

| Área      | Tecnología                                                                                                                              |
| :-------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**  | `React 19` `TypeScript` `Vite` `Zustand` `React Router` `Tailwind CSS` `Axios`                                                           |
| **Backend**   | `Node.js` `Express.js` `JWT` `bcryptjs`                                                                                               |
| **Base de Datos** | `Supabase` (PostgreSQL)                                                                                                                  |
| **Despliegue**  | `Vercel` (con dos proyectos independientes apuntando a un monorepo)

---

## Características Principales

-   🔐 **Autenticación Segura:** Login y registro con tokens JWT.
-   👤 **Control de Acceso por Roles (RBAC):** `admin`, `jefe_departamento` e `integrante_departamento` con permisos diferenciados.
-   🔩 **Gestión de Inventario (CRUD):** Administración completa de piezas, incluyendo búsqueda y filtrado.
-   🏢 **Gestión de Departamentos:** Creación y administración de los diferentes departamentos del equipo.
-   📊 **Análisis de Datos:** Procesamiento de archivos `.csv` desde Google Drive para la visualización de datos.

---

## Cómo Ejecutarlo Localmente

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/jamesyul/fuemappa_v1.git
    cd fuemappa_v1
    ```
2.  **Configurar variables de entorno:**
    *   Crea `backend/.env` (ver [ejemplo](#-despliegue-en-vercel)).
    *   Crea `frontend/.env.local` con `VITE_API_URL=http://localhost:5000`.

3.  **Instalar dependencias:**
    ```bash
    npm run install-all
    ```
4.  **Iniciar los servidores de desarrollo:**
    ```bash
    npm run dev
    ```

---

## Arquitectura de Despliegue

Este proyecto está desplegado en Vercel utilizando una estrategia de **dos proyectos independientes que apuntan al mismo monorepo**, garantizando el aislamiento y la escalabilidad de cada parte:

-   **Proyecto Frontend (`fuemappa-frontend`):** Se despliega desde el directorio `/frontend` y se configura como un sitio estático de Vite.
-   **Proyecto Backend (`fuemappa-backend`):** Se despliega desde el directorio `/backend` y se configura como una función serverless de Node.js.

Esta arquitectura permite que ambos servicios se desarrollen en un único repositorio pero se desplieguen y escalen de forma independiente.

---

## Visión a futuro
Este centro de software está pensado como un ecosistema en constante crecimiento:  
- 🔧 **Nuevas herramientas** se irán añadiendo de forma progresiva.  
- 🔐 **Seguridad con roles y permisos**, para que cada usuario acceda solo a la información que le corresponde.  
- 📈 **Escalabilidad**, asegurando que la plataforma evolucione junto a las necesidades del equipo.  
