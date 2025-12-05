// Variables globales
const preloaderContainer = document.getElementById('preloader');
const enterButton = document.getElementById('enter-button');
const header = document.getElementById('main-header');
const main = document.querySelector('main');
// Timeline de animaciones
const timeline = gsap.timeline({ paused: true }) // Pausada por defecto
// Animación del botón
timeline.to("#enter-button", {
    duration: 2,
    width: '200%',
    bottom: '50%',
    transform: 'translate(-50%, -50%)',
    ease: 'power2.inOut'
}, 0); // Delay de la animación
// Animación del header
timeline.to("#main-header", {
    marginTop: 0,
    duration: 1, // Duración de animación
    ease: 'power2.inOut',
    onComplete: () => {
        // Al terminar la animación añadimos la clase in-top al header para que se quede pegado al top de la página al scroll
        header.classList.add('in-top');
        document.body.style.overflowY = 'auto';
    }
}, .5); // Delay de la animación
// Animación para ocultar el contenedor del preloader
timeline.to("#intro", {
    duration: 1,
    opacity: 0,
    display: 'none',
    ease: 'power2.inOut'
}, 1);
// Animación para mostrar el main
timeline.to("main", {
    opacity: 1,
    duration: 1,
    ease: 'power2.inOut'
}, 1); // Delay de la animación

/* Evento de clic en el botón
* Inicia la animación de la timeline
*/
enterButton.addEventListener('click', () => timeline.play());

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});