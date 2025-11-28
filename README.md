🍷 Proyecto Final Back-End / Node.js
API REST de Gestión de Productos — Tannat & Co.
📖 Descripción

API REST desarrollada con Node.js + Express, conectada a Firebase Firestore como base de datos.
Implementa un CRUD completo de productos con:

🔐 Autenticación JWT

📦 Modelo multi-capa (Routes → Controllers → Services → Models)

🔥 Integración con Firestore

🌎 Deploy en Vercel

Este proyecto forma parte de la entrega final del curso Back-End / Node.js del programa Talento Tech 2025.

🌐 Deploy en Producción
🟣 API Online (Vercel):
🧪 Tester Web (interfaz para probar todos los endpoints):

👉 https://proyecto-node-js-eight.vercel.app

(Login, listado, búsqueda, creación, edición y eliminación de productos)

⚙️ Tecnologías Utilizadas

🟢 Node.js

⚙️ Express.js

🔥 Firebase Firestore

🔐 JWT – jsonwebtoken

🌐 CORS

🧪 Postman

⚫ dotenv

📁 Estructura del Proyecto
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
│       └── data.js
│
├── index.js
├── tester.html
├── .env (ignorado)
└── package.json

🚀 Iniciar el Servidor
npm install
npm start


Servidor local:
👉 http://localhost:3000

🧠 Endpoints Disponibles

Las rutas están agrupadas bajo /api.

🔓 Público
GET /api/products

📌 Lista todos los productos.

GET /api/products/:id

📌 Trae un producto por:

id de Firestore, o

productID (identificador numérico propio)

🔐 Protegidos (requieren JWT)
POST /api/login

Genera un token válido.

Body:

{
  "email": "test@gmail.com",
  "password": "123456"
}


Respuesta:

{ "token": "xxxxx.yyyyy.zzzzz" }

POST /api/products/create

Crea un producto nuevo.
🔒 Requiere Authorization: Bearer <token>

Body:

{
  "name": "Garzon Tannat Reserva",
  "price": 12000,
  "description": "Vino tinto de Uruguay",
  "imagen": "https://...",
  "productID": 101
}

PUT /api/products/:id

Actualiza parcialmente un producto (name, price, imagen, description).
❗ productID NO se puede modificar.

Body (ejemplo):

{
  "price": 15000,
  "imagen": "https://nuevaimagen.com/tannat.png"
}

DELETE /api/products/:id

Elimina un producto por su productID o id de Firestore.

🧪 Ejemplo de flujo en Postman
<details> <summary>Ver pasos</summary>
1️⃣ Login

POST
{{url}}/api/login

2️⃣ Crear producto

POST
{{url}}/api/products/create

3️⃣ Editar producto

PUT
{{url}}/api/products/101

4️⃣ Eliminar producto

DELETE
{{url}}/api/products/101

</details>
🧱 Manejo de Errores
Código	Descripción
400	Datos inválidos
401	Token ausente o inválido
403	Acceso denegado
404	Producto no encontrado
409	productID duplicado
500	Error interno
🧩 Flujo Interno
Client → Routes → Controllers → Services → Models → Firestore


Routes: definen las URLs

Controllers: manejan req/res

Services: lógica de negocio

Models: conexión a Firestore

Middleware: valida JWT

🧑‍💻 Autor

Nicolás Torres Quintero
Proyecto final — Talento Tech 2025
E-commerce de vinos: Tannat & Co.
