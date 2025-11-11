import { db } from '../data/firebase.js';
import {
    collection, 
    getDocs, 
    getDoc, 
    doc, 
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

// docId directo; si no existe, busca por productID
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

// siguiente productID secuencial
async function getNextProductID() {
    const q = query(colRef, orderBy('productID', 'desc'), limit(1));
    const snap = await getDocs(q);
    if (snap.empty) return 1;
    const last = Number(snap.docs[0].data().productID) || 0;
    return last + 1;
}

// Unicidad e inmutabilidad de productID (docId = productID)
export async function crearProducto(newProduct) {
    const name = String(newProduct.name ?? '').trim();
    const price = Number(newProduct.price ?? 0);
    const description = newProduct.description ?? '';
    const imagen = newProduct.imagen ?? '';

    let productID =
        newProduct.productID !== undefined && newProduct.productID !== null
        ? Number(newProduct.productID)
        : await getNextProductID();

    if (Number.isNaN(productID)) {
        const e = new Error('productID inválido'); e.status = 400; throw e;
    }

    const idAsString = String(productID);
    const ref = doc(db, 'products', idAsString);
    const exists = await getDoc(ref);
    if (exists.exists()) {
        const e = new Error('productID ya existe');
        e.code = 'PRODUCT_ID_CONFLICT'; e.status = 409; throw e;
    }

    const payload = { name, price, description, imagen, productID };
    await setDoc(ref, payload);
    const snap = await getDoc(ref);
    return { id: snap.id, ...snap.data() };
}

export async function borrarProducto(id) {
  // permite borrar por docId o por productID
    const byId = doc(db, 'products', String(id));
    const s = await getDoc(byId);
    if (s.exists()) { await deleteDoc(byId); return true; }

    const asNum = Number(id);
    const q = Number.isNaN(asNum)
        ? query(colRef, where('productID', '==', id), limit(1))
        : query(colRef, where('productID', '==', asNum), limit(1));

    const snap = await getDocs(q);
    if (snap.empty) return false;

    await deleteDoc(doc(db, 'products', snap.docs[0].id));
    return true;
}
