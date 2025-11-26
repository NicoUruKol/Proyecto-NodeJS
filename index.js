import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import productsRouter from './src/routes/products.routes.js';
import authRouter from './src/routes/auth.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

const corsConfig = {
    origin: ['http://localhost:3000', 'https://tannatco.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsConfig));
app.use(bodyParser.json());

// 👉 Primero el endpoint raíz
app.get('/', (_req, res) => res.send('API OK'));

// 👉 Luego las rutas reales
app.use('/auth', authRouter);       // POST /auth/login
app.use('/', productsRouter);       // /products, /products/:id, etc.

// 👉 404 al final
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// 👉 Manejador de errores
app.use((err, _req, res, _next) => {
    const status = err.status && Number.isInteger(err.status) ? err.status : 500;
    const message = err.message || 'Error interno';
    res.status(status).json({ message });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
