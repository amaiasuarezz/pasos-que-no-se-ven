// Variables globales
const preloaderContainer = document.getElementById('preloader');
const enterButton = document.getElementById('enter-button');

// Timeline de animaciones
const timeline = gsap.timeline({ paused: true }) // Pausada por defecto
// Animación del botón
timeline.to("#enter-button", {
    duration: 2,
    width: '200%',
    ease: 'power2.inOut'
}, 0)

// Animación del header
timeline.to("#main-header", {
    marginTop: 0,
    duration: 1, // Duración de animación
    ease: 'power2.inOut',
}, .5); // Delay de la animación

/* Evento de clic en el botón
* Inicia la animación de la timeline
*/
enterButton.addEventListener('click', () => timeline.play());

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});