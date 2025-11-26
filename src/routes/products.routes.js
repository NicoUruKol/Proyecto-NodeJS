import { Router } from 'express';
import {
    getAllProducts,
    getProductById,
    addProduct,
    editProduct,
    deleteProduct
} from '../controllers/products.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';

const router = Router();

// Públicas
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);

// Protegidas (JWT)
router.post('/products/create', requireAuth, addProduct);
router.put("/products/:id", requireAuth, editProduct);
router.delete('/products/:id', requireAuth, deleteProduct);

export default router;
