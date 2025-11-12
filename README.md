# 🍷 Proyecto Final Back-End / Node.js  
## API REST de Gestión de Productos — *Tannat & Co.*

---

### 📖 Descripción

API REST desarrollada con **Node.js** y **Express**, conectada a **Firebase Firestore** como base de datos.  
Permite **listar, consultar, crear y eliminar productos** mediante endpoints protegidos con **autenticación JWT**.  

Desarrollado como parte de la **entrega final del curso de Back-End / Node.js** del programa *Talento Tech 2025*.

---

## ⚙️ Tecnologías Utilizadas

- 🟢 **Node.js**
- ⚙️ **Express.js**
- 🔥 **Firebase Firestore**
- 🌐 **CORS**
- 🧩 **body-parser**
- 🔑 **jsonwebtoken (JWT)**
- ⚫ **dotenv**
- 🧪 **Postman** (para pruebas)

---

## 📁 Estructura del Proyecto

```
Proyecto-NodeJS/
│
├── src/
│   ├── controllers/
│   │   ├── products.controller.js
│   │   └── auth.controller.js
│   ├── services/
│   │   ├── products.services.js
│   │   └── auth.services.js
│   ├── models/
│   │   └── products.models.js
│   ├── routes/
│   │   ├── products.routes.js
│   │   └── auth.routes.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   └── data/
│       └── firebase.js
│
├── .env
├── index.js
├── package.json
└── README.md
```

---

## 🚀 Iniciar el Servidor

Instalar dependencias:

```bash
npm install
```

Ejecutar el servidor:

```bash
npm start
```

El servidor corre en:  
👉 **http://localhost:3000**

---

## 🧠 Endpoints Disponibles

### 🔓 Público

#### **GET /api/products**
Obtiene la lista completa de productos.

#### **GET /api/products/:id**
Obtiene un producto específico por su `id` o `productID`.

---

### 🔐 Protegidos (requieren Token JWT)

#### **POST /auth/login**
Inicia sesión con credenciales válidas y devuelve un token.

**Body (JSON):**
```json
{
  "email": "admin@tannatco.com",
  "password": "123456"
}
```

**Respuesta exitosa:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer"
}
```

---

#### **POST /api/products/create**
Crea un nuevo producto.  
🔒 Requiere header `Authorization: Bearer <token>`

**Body (JSON):**
```json
{
  "name": "Garzon Tannat Reserva",
  "price": 125000,
  "description": "Vino tinto intenso con notas a frutos rojos",
  "imagen": "https://bodegagarzon.com/wp-content/uploads/2018/07/reserva_tannat.png",
}
```

**Respuesta:**
```json
{
  "id": "27",
  "name": "Garzon Tannat Reserva",
  "price": 125000,
  "description": "Vino tinto intenso con notas a frutos rojos",
  "imagen": "https://bodegagarzon.com/wp-content/uploads/2018/07/reserva_tannat.png",
  "productID": 27
}
```

---

#### **DELETE /api/products/:id**
Elimina un producto por su `id` o `productID`.  
🔒 Requiere header `Authorization: Bearer <token>`

**Respuesta exitosa:**
```json
{ "message": "Producto eliminado con éxito 🗑️" }
```

---

## 🧾 Ejemplo de flujo en Postman

<details>
<summary>🧪 Paso a paso</summary>

### 1️⃣ **Login**
```
POST http://localhost:3000/auth/login
```
Body → JSON:
```json
{
  "email": "admin@tannatco.com",
  "password": "123456"
}
```
✅ Copiar el valor del `"token"` devuelto.

---

### 2️⃣ **Crear producto**
```
POST http://localhost:3000/api/products/create
```
Headers:
```
Authorization: Bearer <tu_token>
Content-Type: application/json
```
Body → JSON:
```json
{
  "name": "Achaval Ferrer Finca Las Nazarenas",
  "price": 160000,
  "description": "Notas de cata: proviene de viñedos de más de 90 años...",
  "imagen": "https://acdn-us.mitiendanube.com/stores/001/214/080/products/diseno.png"
}
```

---

### 3️⃣ **Eliminar producto**
```
DELETE http://localhost:3000/api/products/23
```
Headers:
```
Authorization: Bearer <tu_token>
```
Respuesta:
```json
{ "message": "Producto eliminado con éxito 🗑️" }
```

</details>

---

## 🧱 Manejo de Errores

| Código | Descripción |
|--------|--------------|
| **400** | Datos inválidos o campos incompletos |
| **401** | Token inválido o ausente |
| **403** | Acceso denegado |
| **404** | Producto o ruta no encontrada |
| **409** | Conflicto (productID duplicado) |
| **500** | Error interno del servidor |

---

## 🧩 Flujo Interno de la App

```
Rutas → Controladores → Servicios → Modelos → Firestore
```

Cada capa cumple una función:
- **Rutas:** definen los endpoints HTTP.  
- **Controladores:** manejan las peticiones y respuestas.  
- **Servicios:** encapsulan la lógica de negocio.  
- **Modelos:** se comunican con Firestore.  
- **Middleware:** valida el token JWT.

---

## 👨‍💻 Autor

**Nicolás Torres Quintero**  
Proyecto desarrollado en el marco del programa  
**🎓 Talento Tech — Buenos Aires Aprende 2025**  

💼 E-commerce de vinos **Tannat & Co.**

---
