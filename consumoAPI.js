const apiUrl = 'https://fakestoreapi.com';

export async function obtenerProductos() {
    try{
        const response = await fetch(`${apiUrl}/products`,{
            method: "GET"
        });
        const data = await response.json()
        console.log(`Los productos son: \n`)
        data.forEach((producto) => {
            console.log(
                `ID: ${producto.id}\n` +
                `Título: ${producto.title}\n` +
                `Precio: $${producto.price}\n` +
                `Categoría: ${producto.category}\n` +
                "-------------------------");
        })
    }catch (error){
        console.log("Hubo un problema: ", error.message);
    } finally{
        console.log(`\nPetición finalizada\n`)
    }
}

export async function obtenerProducto(id) {
    try{
        const response = await fetch(`${apiUrl}/${id}`,{
            method: "GET"
        })
        const data = await response.json()
        console.log(`La informacion del producto es: \n`)
            console.log(
                `ID: ${data.id}\n` +
                `Título: ${data.title}\n` +
                `Precio: $${data.price}\n` +
                `Categoría: ${data.category}`);
    }catch (error){
        console.log("Hubo un problema: ", error.message);
    } finally{
        console.log(`\nPetición finalizada\n`)
    }
}

export async function agregarProducto(producto) {
    try{
        const response = await fetch(`${apiUrl}/products`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(producto)
        })

        const data = await response.json()
        console.log(`Producto agregado de manera exitosa: \n`)
            console.log(
                `ID: ${data.id}\n` +
                `Título: ${data.title}\n` +
                `Precio: $ ${data.price}\n` +
                `Categoría: ${data.category}`);
    }catch (error){
        console.log("Hubo un problema: ", error.message);
    } finally{
        console.log(`\nPetición finalizada\n`)
    }
}

export async function eliminarProducto(id) {
    try{
        const response = await fetch(`${apiUrl}/${id}`,{
            method: "DELETE"
        })
        const data = await response.json()
        console.log(`Producto eliminado con exito\n`)
            console.log(
                `ID: ${data.id}\n` +
                `Título: ${data.title}\n` +
                `Precio: $ ${data.price}\n` +
                `Categoría: ${data.category}`);
    }catch (error){
        console.log("Hubo un problema: ", error.message);
    } finally{
        console.log(`\nPetición finalizada\n`)
    }
}

export async function modificarProducto(id, producto) {
    try{
        const response = await fetch(`${apiUrl}/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(producto)
        })
        const data = await response.json()
        console.log(`Producto modificado con exito\n`)
            console.log(
                `ID: ${data.id}\n` +
                `Título: ${data.title}\n` +
                `Precio: $ ${data.price}\n` +
                `Categoría: ${data.category}`);
    }catch (error){
        console.log("Hubo un problema: ", error.message);
    } finally{
        console.log(`\nPetición finalizada\n`)
    }
}

/*
obtenerProductos();
obtenerProducto(15);
agregarProducto({
    title: "vino",
    price: 1500,
    category: "tinto"
})
eliminarProducto(2);
modificarProducto(3,{
    title: "champagne",
    price: 2000,
    category: "Non Vintage"
})
*/
