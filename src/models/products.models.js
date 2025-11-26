import { db } from '../data/firebase.js';
import {
    collection, 
    getDocs, 
    getDoc, 
    doc,
    addDoc, 
    setDoc, 
    query, 
    where, 
    limit,  
    deleteDoc
} from 'firebase/firestore';

const colRef = collection(db, 'products');

export async function obtenerProductos() {
    const snap = await getDocs(colRef);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}


// Buscamos un producto x ID
export async function obtenerProductoPorId(id) {
    const direct = await getDoc(doc(db, 'products', String(id)));
    if (direct.exists()) return { id: direct.id, ...direct.data() };

    const asNum = Number(id);
    const q = Number.isNaN(asNum)
        ? query(colRef, where('productID', '==', id), limit(1))
        : query(colRef, where('productID', '==', asNum), limit(1));

    const snap = await getDocs(q);
    if (!snap.empty) {
        const d = snap.docs[0];
        return { id: d.id, ...d.data() };
    }
    return null;
}

// Creamos un producto
export async function crearProducto(newProduct) {
    const name = String(newProduct.name ?? '').trim();
    const price = Number(newProduct.price ?? NaN);
    const description = newProduct.description ?? '';
    const imagen = newProduct.imagen ?? '';

    // productID OBLIGATORIO y no NaN
    if (newProduct.productID === undefined || newProduct.productID === null) {
        const e = new Error('productID es requerido');
        e.code = 'PRODUCT_ID_REQUIRED';
        e.status = 400;
        throw e;
    }
    const productID = Number(newProduct.productID);
    if (Number.isNaN(productID)) {
        const e = new Error('productID debe ser numérico');
        e.code = 'PRODUCT_ID_INVALID';
        e.status = 400;
        throw e;
    }

    // Validamos name/price
    if (!name) {
        const e = new Error('name es requerido');
        e.status = 400;
        throw e;
    }
    if (Number.isNaN(price)) {
        const e = new Error('price es requerido (number)');
        e.status = 400;
        throw e;
    }

    // Validamos que NO exista ese productID
    const q = query(colRef, where('productID', '==', productID), limit(1));
    const existsSnap = await getDocs(q);
    if (!existsSnap.empty) {
        const e = new Error('productID ya existe');
        e.code = 'PRODUCT_ID_CONFLICT';
        e.status = 409;
        throw e;
    }

    // Crear con addDoc (docId autogenerado)
    const ref = await addDoc(colRef, { name, price, description, imagen, productID });
    const snap = await getDoc(ref);
    return { id: snap.id, ...snap.data() };
}

// Borrar un producto
export async function borrarProducto(id) {
    const asNum = Number(id);
    const q = Number.isNaN(asNum)
        ? query(colRef, where('productID', '==', id), limit(1))
        : query(colRef, where('productID', '==', asNum), limit(1));

    const snap = await getDocs(q);
    if (snap.empty) return false;

    await deleteDoc(doc(db, 'products', snap.docs[0].id));
    return true;
}

// Editar un producto
export async function actualizarProducto(productIDParam, parcial) {
    // No permitir que cambien el productID
    if (Object.prototype.hasOwnProperty.call(parcial, "productID")) {
        const e = new Error("productID es inmutable");
        e.code = "PRODUCT_ID_IMMUTABLE";
        e.status = 400;
        throw e;
    }

    const asNum = Number(productIDParam);
    const filtroProductID = Number.isNaN(asNum) ? productIDParam : asNum;

    // Buscamos el documento por el campo productID
    const q = query(colRef, where("productID", "==", filtroProductID), limit(1));
    const snap = await getDocs(q);

    if (snap.empty) {
        return null;
    }

    const docSnap = snap.docs[0];
    const ref = doc(db, "products", docSnap.id);
    const currData = docSnap.data();

    const merged = {
        ...currData,
        ...parcial,
        productID: currData.productID, 
    };

    await setDoc(ref, merged, { merge: true });

    const finalSnap = await getDoc(ref);
    return { id: finalSnap.id, ...finalSnap.data() };
}
