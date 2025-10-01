const apiUrl = 'https://fakestoreapi.com'

const BASE_URL = 'https://fakestoreapi.com';

// Utilidad simple para dividir "products/15" -> {resource:'products', id:'15'}
function parsePath(p = '') {
    const [resource = '', id = ''] = p.split('/');
    return { resource, id };
    }

    async function getAllProducts() {
    const res = await fetch(`${apiUrl}/products`);
    const ok = res.ok;
    const data = ok ? await res.json() : null;
    if (!ok) throw new Error(`GET products -> ${res.status} ${res.statusText}`);
    console.log(data);
    }

    async function getProductById(id) {
    const res = await fetch(`${apiUrl}/products/${id}`);
    const ok = res.ok;
    const data = ok ? await res.json() : null;
    if (!ok) throw new Error(`GET products/${id} -> ${res.status} ${res.statusText}`);
    console.log(data);
    }

    async function createProduct(title, price, category) {
    const priceNum = Number(price);
    if (Number.isNaN(priceNum)) throw new Error(`El precio debe ser numérico. Recibido: "${price}"`);

    const body = { title, price: priceNum, category };

    const res = await fetch(`${apiUrl}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    const ok = res.ok;
    const data = ok ? await res.json() : null;
    if (!ok) throw new Error(`POST products -> ${res.status} ${res.statusText}`);
    console.log(data);
    }

async function deleteProduct(id) {
    const res = await fetch(`${apiUrl}/products/${id}`, { method: 'DELETE' });
    const ok = res.ok;
    const data = ok ? await res.json() : null;
    if (!ok) throw new Error(`DELETE products/${id} -> ${res.status} ${res.statusText}`);
    console.log(data);
    }

async function main() {
    const [, , rawMethod, rawPath, ...rest] = process.argv;
    const method = (rawMethod || '').toUpperCase();
    const path = (rawPath || '');

    try {
        if (!method || !path) {
        throw new Error('Uso: npm run start <METHOD> <path> [args]');
        }

        const { resource, id } = parsePath(path);

        if (method === 'GET') {
        if (resource === 'products' && !id) return getAllProducts();
        if (resource === 'products' && id)  return getProductById(id);
        throw new Error(`Ruta GET no soportada: ${path}`);
        }

        if (method === 'POST') {
        if (resource !== 'products') throw new Error(`Ruta POST no soportada: ${path}`);
        const [title, price, category] = rest;
        if (!title || !price || !category) {
            throw new Error('Uso: npm run start POST products <title> <price> <category>');
        }
        return createProduct(title, price, category);
        }

        if (method === 'DELETE') {
        if (resource === 'products' && id) return deleteProduct(id);
        throw new Error(`Ruta DELETE no soportada: ${path}`);
        }

        throw new Error(`Método no soportado: ${method}`);
    } catch (e) {
        console.error('[ERROR]', e.message);
    }
}

main();