// ========================================
// ANGEL'S FASHION WORLD 🪽
// JAVASCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // ESTRELLAS ✨
    // ========================================

    const contenedoresEstrellas =
        document.querySelectorAll(".estrellas");

    contenedoresEstrellas.forEach(function (contenedor) {

        // Si el HTML ya tiene estrellas, no crea otras
        if (contenedor.children.length > 0) {
            return;
        }

        for (let i = 0; i < 4; i++) {

            const estrella = document.createElement("span");

            estrella.textContent = "✨";

            contenedor.appendChild(estrella);
        }
    });


    // ========================================
    // ANIMACIÓN DE LAS ALAS 🪽
    // ========================================

    const alas = document.querySelectorAll(".alas");

    alas.forEach(function (ala) {

        ala.addEventListener("mouseenter", function () {
            ala.style.animationDuration = "0.8s";
        });

        ala.addEventListener("mouseleave", function () {
            ala.style.animationDuration = "2s";
        });

    });


    // ========================================
    // DESPLAZAMIENTO SUAVE
    // ========================================

    const enlaces = document.querySelectorAll(
        'a[href^="#"]'
    );

    enlaces.forEach(function (enlace) {

        enlace.addEventListener("click", function (evento) {

            const destino = document.querySelector(
                this.getAttribute("href")
            );

            if (destino) {

                evento.preventDefault();

                destino.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });


    // ========================================
    // MENSAJE DE BIENVENIDA
    // ========================================

    console.log(
        "🪽✨ Bienvenida a Angel's Fashion World ✨🪽"
    );

});
