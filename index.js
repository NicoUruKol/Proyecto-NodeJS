import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
//import bodyParser from 'body-parser';
import productsRouter from './src/routes/products.routes.js';
import authRouter from './src/routes/auth.routes.js';
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsConfig = {
    origin: ['http://localhost:3000', 'https://proyecto-node-js-eight.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());

// Endpoint raíz
app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Rutas reales
app.use('/api', authRouter);      
app.use('/api', productsRouter);    

/*app.get("/index", (_req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});*/

// Error 404
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejador de errores
app.use((err, _req, res, _next) => {
    const status = err.status && Number.isInteger(err.status) ? err.status : 500;
    const message = err.message || 'Error interno';
    res.status(status).json({ message });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
