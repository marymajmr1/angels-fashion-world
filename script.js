// ========================================
// ANGEL'S FASHION WORLD
// SCRIPT.JS
// ========================================


// ========================================
// DESPLAZAMIENTO SUAVE
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(enlace => {

    enlace.addEventListener("click", function (e) {

        const destino = document.querySelector(
            this.getAttribute("href")
        );

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
// ANIMACIÓN SUAVE DE LAS ESTRELLAS
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
    ".alas-inicio, .alas-explorar, .contacto-alas, .footer-alas, .logo-alas"
);

alas.forEach((ala, indice) => {

    ala.style.animationDelay =
        `${indice * 0.4}s`;

});


// ========================================
// EFECTO SUAVE AL APARECER
// ========================================

const elementos = document.querySelectorAll(
    ".categoria, .titulo-explorar, .frase-explorar"
);

const observador = new IntersectionObserver(
    (entradas) => {

        entradas.forEach(entrada => {

            if (entrada.isIntersecting) {

                entrada.target.classList.add("aparecer");

            }

        });

    },
    {
        threshold: 0.15
    }
);

elementos.forEach(elemento => {

    observador.observe(elemento);

});


// ========================================
// MENSAJE DE CONSOLA
// ========================================

console.log(
    "🪽 Angel's Fashion World está funcionando ✦"
);
