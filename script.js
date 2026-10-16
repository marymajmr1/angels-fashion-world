
// ========================================
// ANGEL'S FASHION WORLD
// SCRIPT.JS
// ========================================


// ========================================
// DESPLAZAMIENTO SUAVE
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(enlace => {

    enlace.addEventListener("click", function (e) {

        const href = this.getAttribute("href");

        if (!href || href === "#") return;

        const destino = document.querySelector(href);

        if (destino) {

            e.preventDefault();

            destino.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


// ========================================
// ANIMACIÓN DE LAS ESTRELLAS
// ========================================

const estrellas = document.querySelectorAll(".estrella");

estrellas.forEach((estrella, indice) => {

    estrella.style.animationDelay =
        `${indice * 0.35}s`;

});


// ========================================
// ANIMACIÓN DE LAS ALAS
// ========================================

const alas = document.querySelectorAll(
    ".alas-inicio, .alas-explorar, .contacto-alas, .footer-alas, .logo-alas, .alasMovimiento"
);

alas.forEach((ala, indice) => {

    ala.style.animationDelay =
        `${indice * 0.4}s`;

});


// ========================================
// EFECTO DE APARICIÓN
// ========================================

const elementosAnimados = document.querySelectorAll(
    ".categoria, .titulo-explorar, .frase-explorar"
);

if ("IntersectionObserver" in window) {

    const observador = new IntersectionObserver(
        (entradas) => {

            entradas.forEach(entrada => {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add("aparecer");

                    observador.unobserve(entrada.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    elementosAnimados.forEach(elemento => {
        observador.observe(elemento);
    });

}


// ========================================
// BUSCADOR DE PRODUCTOS
// ========================================

const campoBusqueda = document.getElementById("buscarProducto");
const botonLimpiar = document.getElementById("limpiarBusqueda");

function buscarProductos() {

    if (!campoBusqueda) return;

    const consulta = campoBusqueda.value
        .trim()
        .toLocaleLowerCase("es");

    // Productos y categorías que se pueden filtrar.
    const elementos = document.querySelectorAll(
        ".producto, .producto-card, .tarjeta-producto, .categoria"
    );

    elementos.forEach(elemento => {

        const texto = elemento.textContent
            .toLocaleLowerCase("es");

        const coincide = texto.includes(consulta);

        elemento.style.display = coincide ? "" : "none";

    });

}

if (campoBusqueda) {

    campoBusqueda.addEventListener("input", buscarProductos);

}

if (botonLimpiar) {

    botonLimpiar.addEventListener("click", () => {

        if (campoBusqueda) {
            campoBusqueda.value = "";
            buscarProductos();
            campoBusqueda.focus();
        }

    });

}


// ========================================
// BOTÓN EXPLORAR
// ========================================

document.querySelectorAll(".boton-explorar").forEach(boton => {

    boton.addEventListener("click", function () {

        const destino = document.getElementById("categorias");

        if (destino) {

            destino.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


// ========================================
// MENSAJE DE CONSOLA
// ========================================

console.log(
    "🪽 Angel's Fashion World está funcionando ✦"
);
```
