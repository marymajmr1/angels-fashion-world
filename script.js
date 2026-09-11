// ========================================
// ANGEL'S FASHION WORLD
// ========================================

// Desplazamiento suave dentro de la página

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


// Mensaje en la consola

console.log("🪽 Bienvenidos a Angel's Fashion World ✨");
