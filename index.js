import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import productsRouter from './src/routes/products.routes.js';
import authRouter from './src/routes/auth.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// CORS
app.use(cors());

// Body parser (premisa del curso)
app.use(bodyParser.json());

// Rutas
app.use('/api', productsRouter); // /api/products...
app.use('/auth', authRouter);    // /auth/login

// Salud
app.get('/', (_req, res) => res.send('API OK'));

// 404 (rutas no definidas)
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejo de errores 400/401/403/500
// (lanzar con next({ status: 400, message: '...' }) si querés códigos específicos)
app.use((err, _req, res, _next) => {
    const status = err.status && Number.isInteger(err.status) ? err.status : 500;
    const message = err.message || 'Error interno';
    res.status(status).json({ message });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});