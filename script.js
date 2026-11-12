
/* ==========================================
   ANGEL'S FASHION WORLD
   CARRITO GENERAL DE TODAS LAS CATEGORÍAS
========================================== */

const CLAVE_CARRITO = "angelsCarrito";
const CLAVE_PEDIDOS = "angelsPedidos";

// ==========================================
// OBTENER Y GUARDAR CARRITO
// ==========================================

function obtenerCarrito() {
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE_CARRITO));
    return Array.isArray(datos) ? datos : [];
  } catch (error) {
    return [];
  }
}

let carrito = obtenerCarrito();

function guardarCarrito() {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

// ==========================================
// AGREGAR PRODUCTOS DESDE CUALQUIER CATEGORÍA
// ==========================================

function agregarProductoAlCarrito(producto) {
  if (!producto || !producto.nombre || producto.precio == null) {
    alert("No se pudo agregar el producto.");
    return;
  }

  carrito = obtenerCarrito();

  const cantidad = Math.max(1, Number(producto.cantidad) || 1);

  const nuevoProducto = {
    nombre: producto.nombre,
    precio: Number(producto.precio),
    imagen: producto.imagen || "",
    categoria: producto.categoria || "Moda",
    talla: producto.talla || "",
    tamaño: producto.tamaño || "",
    cantidad: cantidad
  };

  const existente = carrito.find(item =>
    item.nombre === nuevoProducto.nombre &&
    item.talla === nuevoProducto.talla &&
    item.tamaño === nuevoProducto.tamaño
  );

  if (existente) {
    existente.cantidad =
      (Number(existente.cantidad) || 1) + cantidad;
  } else {
    carrito.push(nuevoProducto);
  }

  guardarCarrito();

  alert("¡Producto agregado a tu carrito! ♡");

  renderizarCarrito();
}

// ==========================================
// FORMATO DE PRECIOS
// ==========================================

function formatoPrecio(precio) {
  return Number(precio || 0).toLocaleString("es-CO");
}

// ==========================================
// MOSTRAR CARRITO
// ==========================================

function renderizarCarrito() {
  const lista = document.getElementById("listaProductos");

  const cantidadElemento =
    document.getElementById("cantidadTotal") ||
    document.getElementById("cantidadProductos");

  const subtotalElemento = document.getElementById("subtotal");
  const totalElemento = document.getElementById("total");

  if (!lista) return;

  carrito = obtenerCarrito();
  lista.innerHTML = "";

  let subtotal = 0;
  let cantidadTotal = 0;

  if (carrito.length === 0) {
    const vacio = document.createElement("p");
    vacio.textContent = "Tu carrito está vacío. ♡";
    lista.appendChild(vacio);
  }

  carrito.forEach((producto, indice) => {
    const cantidad = Number(producto.cantidad) || 1;
    const precio = Number(producto.precio) || 0;

    subtotal += precio * cantidad;
    cantidadTotal += cantidad;

    const tarjeta = document.createElement("div");
    tarjeta.className = "producto-carrito";

    const imagen = document.createElement("img");
    imagen.src = producto.imagen || "";
    imagen.alt = producto.nombre || "Producto";
    imagen.width = 90;

    const informacion = document.createElement("div");

    const nombre = document.createElement("h3");
    nombre.textContent = producto.nombre || "Producto";

    const precioTexto = document.createElement("p");
    precioTexto.textContent = "Precio: $" + formatoPrecio(precio);

    informacion.appendChild(nombre);
    informacion.appendChild(precioTexto);

    if (producto.categoria) {
      const categoria = document.createElement("p");
      categoria.textContent = "Categoría: " + producto.categoria;
      informacion.appendChild(categoria);
    }

    if (producto.talla) {
      const talla = document.createElement("p");
      talla.textContent = "Talla: " + producto.talla;
      informacion.appendChild(talla);
    }

    if (producto.tamaño) {
      const tamaño = document.createElement("p");
      tamaño.textContent = "Tamaño: " + producto.tamaño;
      informacion.appendChild(tamaño);
    }

    const controles = document.createElement("div");

    const restar = document.createElement("button");
    restar.type = "button";
    restar.textContent = "−";
    restar.dataset.restar = indice;

    const numero = document.createElement("span");
    numero.textContent = cantidad;

    const sumar = document.createElement("button");
    sumar.type = "button";
    sumar.textContent = "+";
    sumar.dataset.sumar = indice;

    const eliminar = document.createElement("button");
    eliminar.type = "button";
    eliminar.textContent = "Eliminar";
    eliminar.dataset.eliminar = indice;

    controles.append(restar, numero, sumar, eliminar);
    informacion.appendChild(controles);

    tarjeta.append(imagen, informacion);
    lista.appendChild(tarjeta);
  });

  if (cantidadElemento) {
    cantidadElemento.textContent = cantidadTotal;
  }

  if (subtotalElemento) {
    subtotalElemento.textContent = "$" + formatoPrecio(subtotal);
  }

  if (totalElemento) {
    totalElemento.textContent = "$" + formatoPrecio(subtotal);
  }
}

// ==========================================
// SUMAR, RESTAR Y ELIMINAR
// ==========================================

function sumarProducto(indice) {
  carrito = obtenerCarrito();

  if (!carrito[indice]) return;

  carrito[indice].cantidad =
    (Number(carrito[indice].cantidad) || 1) + 1;

  guardarCarrito();
  renderizarCarrito();
}

function restarProducto(indice) {
  carrito = obtenerCarrito();

  if (!carrito[indice]) return;

  carrito[indice].cantidad =
    (Number(carrito[indice].cantidad) || 1) - 1;

  if (carrito[indice].cantidad <= 0) {
    carrito.splice(indice, 1);
  }

  guardarCarrito();
  renderizarCarrito();
}

function eliminarProducto(indice) {
  carrito = obtenerCarrito();

  if (!carrito[indice]) return;

  carrito.splice(indice, 1);

  guardarCarrito();
  renderizarCarrito();
}

// Detectar botones del carrito
document.addEventListener("click", function(event) {
  const boton = event.target.closest("button");

  if (!boton) return;

  if (boton.dataset.sumar !== undefined) {
    sumarProducto(Number(boton.dataset.sumar));
  }

  if (boton.dataset.restar !== undefined) {
    restarProducto(Number(boton.dataset.restar));
  }

  if (boton.dataset.eliminar !== undefined) {
    eliminarProducto(Number(boton.dataset.eliminar));
  }
});

// ==========================================
// REGISTRAR PEDIDO
// ==========================================

const formulario = document.getElementById("formularioPedido");

if (formulario) {
  formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    carrito = obtenerCarrito();

    const mensaje = document.getElementById("mensajePedido");

    if (carrito.length === 0) {
      if (mensaje) {
        mensaje.textContent = "Tu carrito está vacío. ♡";
      }
      return;
    }

    const nombre = document.getElementById("nombre")?.value.trim();
    const correo = document.getElementById("correo")?.value.trim();
    const telefono = document.getElementById("telefono")?.value.trim();
    const direccion = document.getElementById("direccion")?.value.trim();
    const referencia = document.getElementById("referencia")?.value.trim();

    if (!nombre || !correo || !telefono || !direccion || !referencia) {
      if (mensaje) {
        mensaje.textContent = "Completa todos los campos.";
      }
      return;
    }

    const total = carrito.reduce((suma, producto) => {
      return suma +
        (Number(producto.precio) || 0) *
        (Number(producto.cantidad) || 1);
    }, 0);

    const pedido = {
      id: "AFW-" + Date.now(),
      fecha: new Date().toLocaleString("es-CO"),
      nombre,
      correo,
      telefono,
      direccion,
      referencia,
      productos: carrito.map(producto => ({ ...producto })),
      total,
      estado: "Pendiente de verificación"
    };

    let pedidos = [];

    try {
      pedidos = JSON.parse(localStorage.getItem(CLAVE_PEDIDOS)) || [];
      if (!Array.isArray(pedidos)) pedidos = [];
    } catch (error) {
      pedidos = [];
    }

    pedidos.push(pedido);

    localStorage.setItem(CLAVE_PEDIDOS, JSON.stringify(pedidos));

    carrito = [];
    guardarCarrito();
    renderizarCarrito();

    if (mensaje) {
      mensaje.textContent =
        "¡Tu pedido quedó registrado! Estado: pendiente de verificación. ♡";
    }

    formulario.reset();
  });
}

// ==========================================
// ACTUALIZAR CARRITO ENTRE PÁGINAS
// ==========================================

window.addEventListener("storage", function(event) {
  if (event.key === CLAVE_CARRITO) {
    carrito = obtenerCarrito();
    renderizarCarrito();
  }
});

// ==========================================
// INICIAR
// ==========================================

renderizarCarrito();
