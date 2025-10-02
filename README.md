# Pre-Entrega de Proyecto Back-End / NODE JS 

# Lógica de Gestión de Productos

Aplicación en **Node.js** para interactuar con la [FakeStore API](https://fakestoreapi.com/) desde la terminal.  
Permite listar, consultar, agregar, modificar y eliminar productos.

---

## 📌 Uso

### Listar todos los productos
`npm run start GET products`

### Consultar un producto por ID
`npm run start GET products/15`

### Agregar un producto nuevo
`npm run start POST products "Vino Tinto" 1500 vinos`

### Modificar un producto existente
`npm run start PUT products/3 "Champagne" 2000 "Non Vintage"`

### Eliminar un producto por ID
`npm run start DELETE products/7`

---

## 📄 Ejemplo de salida

Comando:  
`npm run start GET products/1`

Resultado:

**La información del producto es:**

**ID: 1**
**Título: Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops**
**Precio: $109.95**
**Categoría: men's clothing**

**Petición finalizada**