// Lista de productos predefinidos
const productos = [
  { codigo: "TC001", categoria: "Tortas Cuadradas", nombre: "Torta Cuadrada de Chocolate", precio: 45000 },
  { codigo: "TC002", categoria: "Tortas Cuadradas", nombre: "Torta Cuadrada de Frutas", precio: 50000 },
  { codigo: "TT001", categoria: "Tortas Circulares", nombre: "Torta Circular de Vainilla", precio: 40000 },
  { codigo: "TT002", categoria: "Tortas Circulares", nombre: "Torta Circular de Manjar", precio: 42000 },
  { codigo: "PI001", categoria: "Postres Individuales", nombre: "Mousse de Chocolate", precio: 5000 },
  { codigo: "PI002", categoria: "Postres Individuales", nombre: "Tiramisú Clásico", precio: 5500 },
  { codigo: "PSA001", categoria: "Productos Sin Azúcar", nombre: "Torta Sin Azúcar de Naranja", precio: 48000 },
  { codigo: "PSA002", categoria: "Productos Sin Azúcar", nombre: "Cheesecake Sin Azúcar", precio: 47000 },
  { codigo: "PT001", categoria: "Pastelería Tradicional", nombre: "Empanada de Manzana", precio: 3000 },
  { codigo: "PT002", categoria: "Pastelería Tradicional", nombre: "Tarta de Santiago", precio: 6000 },
  { codigo: "PG001", categoria: "Productos Sin Gluten", nombre: "Brownie Sin Gluten", precio: 4000 },
  { codigo: "PG002", categoria: "Productos Sin Gluten", nombre: "Pan Sin Gluten", precio: 3500 },
  { codigo: "PV001", categoria: "Productos Vegana", nombre: "Torta Vegana de Chocolate", precio: 50000 },
  { codigo: "PV002", categoria: "Productos Vegana", nombre: "Galletas Veganas de Avena", precio: 4500 },
  { codigo: "TE001", categoria: "Tortas Especiales", nombre: "Torta Especial de Cumpleaños", precio: 55000 },
  { codigo: "TE002", categoria: "Tortas Especiales", nombre: "Torta Especial de Boda", precio: 60000 }
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const productList = document.getElementById('product-list');
const cartList = document.getElementById('cart-list');

// Funcion mostrar productos
function mostrarProductos() {
  productList.innerHTML = '';
  productos.forEach(producto => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <strong>${producto.nombre}</strong><br>
      Categoría: ${producto.categoria}<br>
      Precio: $${producto.precio}<br>
      <button onclick="agregarAlCarrito('${producto.codigo}')">Agregar al carrito</button>
    `;
    productList.appendChild(div);
  });
}

// Funcion Agregar Carrito
function agregarAlCarrito(codigo) {
  const producto = productos.find(p => p.codigo === codigo);
  const item = carrito.find(i => i.codigo === codigo);

  if (item) {
    item.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito();
  mostrarCarrito();
}

// Disminuir cantidad 
function disminuirCantidad(codigo) {
  const item = carrito.find(i => i.codigo === codigo);
  if (item) {
    item.cantidad -= 1;
    if (item.cantidad <= 0) {
      carrito = carrito.filter(i => i.codigo !== codigo);
    }
    guardarCarrito();
    mostrarCarrito();
  }
}

// Eliminar del carrito
function eliminarDelCarrito(codigo) {
  carrito = carrito.filter(item => item.codigo !== codigo);
  guardarCarrito();
  mostrarCarrito();
}

// Vaciar carrito completamente
function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  mostrarCarrito();
}

// Guardar en localStorage
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Mostrar carrito
function mostrarCarrito() {
  cartList.innerHTML = '';

  if (carrito.length === 0) {
    cartList.innerHTML = '<p>El carrito está vacío.</p>';
    return;
  }

  carrito.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <strong>${item.nombre}</strong><br>
      Precio: $${item.precio} x ${item.cantidad} = $${item.precio * item.cantidad}<br>
      <button onclick="agregarAlCarrito('${item.codigo}')">+</button>
      <button onclick="disminuirCantidad('${item.codigo}')">-</button>
      <button onclick="eliminarDelCarrito('${item.codigo}')">Eliminar</button>
    `;
    cartList.appendChild(div);
  });

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  cartList.innerHTML += `<h3>Total: $${total}</h3>`;
}

// Inicializar
mostrarProductos();
mostrarCarrito();