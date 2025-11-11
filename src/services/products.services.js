import {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    borrarProducto
} from '../models/products.models.js';

export const getAllProductsService = async () => await obtenerProductos();

export const getProductByIdService = async (id) => await obtenerProductoPorId(id);

export const addProductService = async (newProduct) => await crearProducto(newProduct);

export const deleteProductService = async (id) => await borrarProducto(id);
