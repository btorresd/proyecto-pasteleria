// Lista inicial de productos (se guarda en localStorage si no existe)
const productosIniciales = [
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
  { codigo: "PV001", categoria: "Productos Veganos", nombre: "Torta Vegana de Chocolate", precio: 50000 },
  { codigo: "PV002", categoria: "Productos Veganos", nombre: "Galletas Veganas de Avena", precio: 4500 },
  { codigo: "TE001", categoria: "Tortas Especiales", nombre: "Torta Especial de Cumpleaños", precio: 55000 },
  { codigo: "TE002", categoria: "Tortas Especiales", nombre: "Torta Especial de Boda", precio: 60000 }
];

let productos = JSON.parse(localStorage.getItem("productos")) || productosIniciales;


const tablaProductos = document.getElementById("tabla-productos");
const formProducto = document.getElementById("form-producto");

const inputCodigo = document.getElementById("codigo");
const inputCategoria = document.getElementById("categoria");
const inputNombre = document.getElementById("nombre");
const inputPrecio = document.getElementById("precio");

let editando = null; // Guarda el índice del producto que se está editando

// Renderizar productos en la tabla
function mostrarProductos() {
  tablaProductos.innerHTML = "";

  productos.forEach((producto, index) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${producto.codigo}</td>
      <td>${producto.categoria}</td>
      <td>${producto.nombre}</td>
      <td>$${producto.precio.toLocaleString()}</td>
      <td>
        <button class="btn btn-warning btn-sm me-2" onclick="editarProducto(${index})">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button>
      </td>
    `;

    tablaProductos.appendChild(fila);
  });

  localStorage.setItem("productos", JSON.stringify(productos));
}

// Agregar o editar producto
formProducto.addEventListener("submit", (e) => {
  e.preventDefault();

  const nuevoProducto = {
    codigo: inputCodigo.value.trim(),
    categoria: inputCategoria.value.trim(),
    nombre: inputNombre.value.trim(),
    precio: parseInt(inputPrecio.value.trim())
  };

  if (editando !== null) {
    // Editar producto existente
    productos[editando] = nuevoProducto;
    editando = null;
  } else {
    // Validar que no se repita el código
    const existe = productos.some(p => p.codigo === nuevoProducto.codigo);
    if (existe) {
      alert("⚠️ Ya existe un producto con ese código.");
      return;
    }
    productos.push(nuevoProducto);
  }

  formProducto.reset();
  mostrarProductos();
});

// Eliminar producto
function eliminarProducto(index) {
  if (confirm("¿Seguro que quieres eliminar este producto?")) {
    productos.splice(index, 1);
    mostrarProductos();
  }
}

// Editar producto
function editarProducto(index) {
  const producto = productos[index];

  inputCodigo.value = producto.codigo;
  inputCategoria.value = producto.categoria;
  inputNombre.value = producto.nombre;
  inputPrecio.value = producto.precio;

  editando = index;
}

// Inicializar
mostrarProductos();
