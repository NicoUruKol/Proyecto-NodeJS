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
    orderBy, 
    deleteDoc
} from 'firebase/firestore';

const colRef = collection(db, 'products');

export async function obtenerProductos() {
    const snap = await getDocs(colRef);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}


// Busca por docId; si no existe, intenta por productID (num/str)
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

// Crear: docId AUTOGENERADO por Firestore + productID ÚNICO (provisto por vos)
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

    // Validaciones básicas de name/price
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

    // Unicidad: chequear que NO exista ese productID
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

// Mantengo delete por docId o productID
export async function borrarProducto(id) {
    // 1) intentar por docId
    const byId = doc(db, 'products', String(id));
    const s = await getDoc(byId);
    if (s.exists()) { await deleteDoc(byId); return true; }

    // 2) intentar por productID
    const asNum = Number(id);
    const q = Number.isNaN(asNum)
        ? query(colRef, where('productID', '==', id), limit(1))
        : query(colRef, where('productID', '==', asNum), limit(1));

    const snap = await getDocs(q);
    if (snap.empty) return false;

    await deleteDoc(doc(db, 'products', snap.docs[0].id));
    return true;
}

// (Por si en el futuro agregás update): impedir cambiar productID
export async function actualizarProducto(id, parcial) {
    if (Object.prototype.hasOwnProperty.call(parcial, 'productID')) {
        const e = new Error('productID es inmutable');
        e.code = 'PRODUCT_ID_IMMUTABLE';
        e.status = 400;
        throw e;
    }
    const ref = doc(db, 'products', String(id));
    const curr = await getDoc(ref);
    if (!curr.exists()) return null;

    const merged = { ...curr.data(), ...parcial, productID: curr.data().productID };
    await setDoc(ref, merged, { merge: true });
    const snap = await getDoc(ref);
    return { id: snap.id, ...snap.data() };
}