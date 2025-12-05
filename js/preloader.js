// Variables globales
const preloaderContainer = document.getElementById('preloader');
const enterButton = document.getElementById('enter-button');

const timeline = gsap.timeline({
    paused: true,
}).to(enterButton, {
    duration: 2,
    width: '200%',
    ease: 'power2.inOut',
    onStart: () => {
        enterButton.classList.remove('loading');
    },
    onComplete: () => {
    },
    onReverseComplete: () => {
        enterButton.classList.add('loading');
    }
}, 0);

window.addEventListener('load', () => timeline.play());