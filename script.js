const CLAVE_CARRITO = "angelsCarrito";
const CLAVE_PEDIDOS = "angelsPedidos";

let carrito = JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || [];

function guardarCarrito() {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

function formatoPrecio(precio) {
  return Number(precio || 0).toLocaleString("es-CO");
}

function renderizarCarrito() {
  const lista = document.getElementById("listaProductos");
  const cantidadElemento =
    document.getElementById("cantidadTotal") ||
    document.getElementById("cantidadProductos");

  const subtotalElemento = document.getElementById("subtotal");
  const totalElemento = document.getElementById("total");

  if (!lista) return;

  lista.innerHTML = "";
  let subtotal = 0;
  let cantidadTotal = 0;

  if (carrito.length === 0) {
    lista.innerHTML = "<p>Tu carrito está vacío. ♡</p>";
  }

  carrito.forEach((producto, indice) => {
    const cantidad = Number(producto.cantidad) || 1;
    const precio = Number(producto.precio) || 0;

    subtotal += precio * cantidad;
    cantidadTotal += cantidad;

    const elemento = document.createElement("div");
    elemento.className = "producto-carrito";

    elemento.innerHTML = `
      <img
        src="${producto.imagen || ""}"
        alt="${producto.nombre || "Producto"}"
        width="90"
      >

      <div>
        <h3>${producto.nombre || "Producto"}</h3>
        <p>Precio: $${formatoPrecio(precio)}</p>
        ${producto.talla ? `<p>Talla: ${producto.talla}</p>` : ""}
        ${producto.tamaño ? `<p>Tamaño: ${producto.tamaño}</p>` : ""}

        <button type="button" data-restar="${indice}">−</button>
        <span>${cantidad}</span>
        <button type="button" data-sumar="${indice}">+</button>

        <button type="button" data-eliminar="${indice}">
          Eliminar
        </button>
      </div>
    `;

    lista.appendChild(elemento);
  });

  if (cantidadElemento) cantidadElemento.textContent = cantidadTotal;
  if (subtotalElemento) {
    subtotalElemento.textContent = "$" + formatoPrecio(subtotal);
  }
  if (totalElemento) {
    totalElemento.textContent = "$" + formatoPrecio(subtotal);
  }
}

function sumarProducto(indice) {
  carrito[indice].cantidad = (Number(carrito[indice].cantidad) || 1) + 1;
  guardarCarrito();
  renderizarCarrito();
}

function restarProducto(indice) {
  carrito[indice].cantidad = (Number(carrito[indice].cantidad) || 1) - 1;

  if (carrito[indice].cantidad <= 0) {
    carrito.splice(indice, 1);
  }

  guardarCarrito();
  renderizarCarrito();
}

function eliminarProducto(indice) {
  carrito.splice(indice, 1);
  guardarCarrito();
  renderizarCarrito();
}

// Botones del carrito
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

// Enviar pedido
const formulario = document.getElementById("formularioPedido");

if (formulario) {
  formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const mensaje = document.getElementById("mensajePedido");

    if (carrito.length === 0) {
      if (mensaje) mensaje.textContent = "Tu carrito está vacío.";
      return;
    }

    const nombre = document.getElementById("nombre")?.value.trim();
    const correo = document.getElementById("correo")?.value.trim();
    const telefono = document.getElementById("telefono")?.value.trim();
    const direccion = document.getElementById("direccion")?.value.trim();
    const referencia = document.getElementById("referencia")?.value.trim();

    if (!nombre || !correo || !telefono || !direccion || !referencia) {
      if (mensaje) mensaje.textContent = "Completa todos los campos.";
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
      productos: [...carrito],
      total,
      estado: "Pendiente de verificación"
    };

    const pedidos = JSON.parse(
      localStorage.getItem(CLAVE_PEDIDOS)
    ) || [];

    pedidos.push(pedido);
    localStorage.setItem(CLAVE_PEDIDOS, JSON.stringify(pedidos));

    carrito = [];
    guardarCarrito();
    renderizarCarrito();

    if (mensaje) {
      mensaje.textContent =
        "¡Pedido registrado en este dispositivo! ♡";
    }

    formulario.reset();
  });
}

renderizarCarrito();
