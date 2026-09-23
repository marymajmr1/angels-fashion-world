// ========================================
// ANGEL'S FASHION WORLD 🪽✦
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // ESTRELLAS ✦ ✧
    // ========================================

    const decoraciones =
        document.querySelectorAll(".decoracion");

    decoraciones.forEach(function (estrella, indice) {

        estrella.style.animationDelay =
            (indice * 0.35) + "s";

    });


    // ========================================
    // ESTRELLITAS
    // ========================================

    const estrellitas =
        document.querySelectorAll(".estrellitas");

    estrellitas.forEach(function (estrella, indice) {

        estrella.style.animationDelay =
            (indice * 0.4) + "s";

    });


    // ========================================
    // ALAS 🪽
    // ========================================

    const alas =
        document.querySelectorAll(".alas");

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

    const enlaces =
        document.querySelectorAll('a[href^="#"]');

    enlaces.forEach(function (enlace) {

        enlace.addEventListener("click", function (evento) {

            const destino =
                document.querySelector(
                    enlace.getAttribute("href")
                );

            if (destino) {

                evento.preventDefault();

                destino.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });

});
