// ========================================
// ANGEL'S FASHION WORLD 🪽
// ========================================

// ========================================
// DESPLAZAMIENTO SUAVE
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(function (enlace) {

enlace.addEventListener("click", function (evento) {

    const destino = this.getAttribute("href");

    if (destino !== "#") {

        const elemento = document.querySelector(destino);

        if (elemento) {

            evento.preventDefault();

            elemento.scrollIntoView({
                behavior: "smooth"
            });

        }

    }

});

});

// ========================================
// CARRITO 🛍️
// ========================================

let carrito = JSON.parse(
localStorage.getItem("carritoAngels")
) || [];

// ========================================
// ACTUALIZAR CONTADOR
// ========================================

function actualizarCarrito() {

const contador =
    document.getElementById("contador-carrito");

if (contador) {

    let cantidadTotal = 0;

    carrito.forEach(function (producto) {

        cantidadTotal += producto.cantidad;

    });

    contador.textContent = cantidadTotal;

}

mostrarCarrito();

}

// ========================================
// AGREGAR PRODUCTO
// ========================================

function agregarAlCarrito(nombre, precio, imagen) {

const productoExistente =
    carrito.find(function (producto) {

        return producto.nombre === nombre;

    });


if (productoExistente) {

    productoExistente.cantidad++;

} else {

    carrito.push({

        nombre: nombre,
        precio: precio,
        imagen: imagen,
        cantidad: 1

    });

}


localStorage.setItem(
    "carritoAngels",
    JSON.stringify(carrito)
);


actualizarCarrito();


alert("🛍️ ¡Producto añadido al carrito! 💕");

}

// ========================================
// MOSTRAR CARRITO
// ========================================

function mostrarCarrito() {

const lista =
    document.getElementById("lista-carrito");

const total =
    document.getElementById("total-carrito");


if (!lista) {
    return;
}


lista.innerHTML = "";


if (carrito.length === 0) {

    lista.innerHTML =
        "<p>Tu carrito está vacío 🥺💕</p>";

    if (total) {
        total.textContent = "Total: $0";
    }

    return;

}


let totalCompra = 0;


carrito.forEach(function (producto, indice) {

    totalCompra +=
        producto.precio * producto.cantidad;


    const elemento =
        document.createElement("div");


    elemento.style.marginBottom = "15px";
    elemento.style.padding = "12px";
    elemento.style.borderRadius = "15px";
    elemento.style.background = "#fff0f6";


    elemento.innerHTML = `

        <strong>${producto.nombre}</strong>

        <br>

        $${producto.precio.toLocaleString("es-CO")}

        <br>

        Cantidad: ${producto.cantidad}

        <br><br>

        <button
            onclick="quitarDelCarrito(${indice})"
            class="boton-carrito-producto">

            ➖ Quitar uno

        </button>

        <button
            onclick="eliminarDelCarrito(${indice})"
            class="boton-comprar">

            🗑️ Eliminar

        </button>

    `;


    lista.appendChild(elemento);

});


if (total) {

    total.textContent =
        "Total: $" +
        totalCompra.toLocaleString("es-CO");

}

}

// ========================================
// QUITAR UNA UNIDAD
// ========================================

function quitarDelCarrito(indice) {

carrito[indice].cantidad--;


if (carrito[indice].cantidad <= 0) {

    carrito.splice(indice, 1);

}


localStorage.setItem(
    "carritoAngels",
    JSON.stringify(carrito)
);


actualizarCarrito();

}

// ========================================
// ELIMINAR PRODUCTO
// ========================================

function eliminarDelCarrito(indice) {

carrito.splice(indice, 1);


localStorage.setItem(
    "carritoAngels",
    JSON.stringify(carrito)
);


actualizarCarrito();

}

// ========================================
// COMPRAR PRODUCTO
// ========================================

function comprarProducto(nombre, precio) {

const mensaje =
    "Hola 🪽💕 Quiero comprar: " +
    nombre +
    " por $" +
    precio.toLocaleString("es-CO") +
    ".";


const mensajeCodificado =
    encodeURIComponent(mensaje);


const numeroWhatsApp = "TU_NUMERO_AQUI";


window.open(
    "https://wa.me/" +
    numeroWhatsApp +
    "?text=" +
    mensajeCodificado,
    "_blank"
);

}

// ========================================
// COMPRAR CARRITO
// ========================================

function comprarCarrito() {

if (carrito.length === 0) {

    alert("🛍️ Tu carrito está vacío.");

    return;

}


let mensaje =
    "Hola 🪽💕 Quiero realizar esta compra:%0A%0A";


let total = 0;


carrito.forEach(function (producto) {

    const subtotal =
        producto.precio * producto.cantidad;


    total += subtotal;


    mensaje +=
        "👚 " +
        producto.nombre +
        " x" +
        producto.cantidad +
        " - $" +
        subtotal.toLocaleString("es-CO") +
        "%0A";

});


mensaje +=
    "%0A💰 Total: $" +
    total.toLocaleString("es-CO");


const numeroWhatsApp = "3170948192";


window.open(
    "https://wa.me/" +
    numeroWhatsApp +
    "?text=" +
    mensaje,
    "_blank"
);

}

// ========================================
// INICIAR
// ========================================

actualizarCarrito();

console.log(
"🪽 Angel's Fashion World: carrito activado"
);
