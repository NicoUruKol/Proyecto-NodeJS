import {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    borrarProducto,
    actualizarProducto,
} from "../models/products.models.js";

export const getAllProductsService = async () => {
    return await obtenerProductos();
};

export const getProductByIdService = async (id) => {
    return await obtenerProductoPorId(id);
};

export const addProductService = async (newProduct) => {
    return await crearProducto(newProduct);
};

export const deleteProductService = async (id) => {
    return await borrarProducto(id);
};

export const editProductService = async (id, partialData) => {
    return await actualizarProducto(id, partialData);
};
