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

// Si ya había productos guardados, los recuperamos.
// Si no, comenzamos con un carrito vacío.

let carrito = JSON.parse(localStorage.getItem("carritoAngels")) || [];


// ========================================
// ACTUALIZAR CANTIDAD DEL CARRITO
// ========================================

function actualizarCarrito() {

    const contador = document.getElementById("contador-carrito");

    if (contador) {

        let cantidadTotal = 0;

        carrito.forEach(function (producto) {
            cantidadTotal += producto.cantidad;
        });

        contador.textContent = cantidadTotal;

    }

}


// ========================================
// AGREGAR PRODUCTO
// ========================================

function agregarAlCarrito(nombre, precio, imagen) {

    const productoExistente = carrito.find(function (producto) {
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


    // Guardamos el carrito

    localStorage.setItem(
        "carritoAngels",
        JSON.stringify(carrito)
    );


    // Actualizamos el número

    actualizarCarrito();


    // Mensaje

    alert("🛍️ ¡Producto añadido al carrito! 💕");

}


// ========================================
// MOSTRAR CANTIDAD AL CARGAR LA PÁGINA
// ========================================

actualizarCarrito();


// ========================================
// MENSAJE EN CONSOLA
// ========================================

console.log("🪽 Bienvenidos a Angel's Fashion World ✨");
console.log("🛍️ Carrito de Angel's activado");
