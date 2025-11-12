import {
    getAllProductsService,
    getProductByIdService,
    addProductService,
    deleteProductService
} from '../services/products.services.js';

export const getAllProducts = async (_req, res, next) => {
    try {
        const products = await getAllProductsService();
        res.status(200).json(products);
    } catch (err) { next(err); }
};

export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params; // puede ser docId o productID
        const product = await getProductByIdService(id);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json(product);
    } catch (err) { next(err); }
};

export const createProduct = async (req, res, next) => {
    try {
        const { name, price, description, imagen, productID } = req.body;

        if (typeof name !== 'string' || name.trim() === '')
        return res.status(400).json({ message: 'name es requerido (string)' });

        if (typeof price !== 'number' || Number.isNaN(price))
        return res.status(400).json({ message: 'price es requerido (number)' });

        const created = await addProductService({
        name: name.trim(), price, description, imagen, productID
        });

        res.status(201).json(created);
    } catch (err) {
        if (err?.code === 'PRODUCT_ID_CONFLICT')
        return res.status(409).json({ message: 'productID ya existe' });
        next(err);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const ok = await deleteProductService(req.params.id);
        if (!ok) return res.status(404).json({ message: "Producto no encontrado" });
        
        res.status(200).json({ message: "Producto eliminado con éxito 🗑️" });
    } catch (err) {
        next(err);
    }
};

