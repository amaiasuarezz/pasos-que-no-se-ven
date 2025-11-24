/**
 * Controlador de audios con toggle play/pause
 * Versión ES5 para compatibilidad
 */

// Variable global para mantener referencia al audio activo
var audioActivo = null;
var botonActivo = null;

/**
 * Función principal que inicializa todos los controles de audio
 * Se ejecuta cuando el documento está completamente cargado
 */
function inicializarControlesAudio() {
    // Obtener todos los botones con la clase toggle-audio-btn
    var botones = document.querySelectorAll('.toggle-audio-btn');
    
    // Recorrer cada botón y agregar el evento click
    for (var i = 0; i < botones.length; i++) {
        var boton = botones[i];
        var audio = boton.querySelector('audio');
        var icono = boton.querySelector('i');
        
        // Verificar que el audio existe
        if (audio) {
            // Agregar clase inicial
            boton.classList.add('audio-paused');
            
            // Ocultar controles nativos del audio
            audio.removeAttribute('controls');
            
            // Agregar evento click al botón
            boton.addEventListener('click', function(botonActual, audioActual, iconoActual) {
                return function() {
                    manejarClickAudio(botonActual, audioActual, iconoActual);
                };
            }(boton, audio, icono));
            
            // Escuchar cuando el audio termina para resetear el estado
            audio.addEventListener('ended', function(botonActual) {
                return function() {
                    resetearEstado(botonActual);
                };
            }(boton));
        }
    }
}

/**
 * Función que maneja el click en un botón de audio
 * @param {HTMLElement} boton - El botón que fue clickeado
 * @param {HTMLElement} audio - El elemento audio dentro del botón
 * @param {HTMLElement} icono - El icono dentro del botón
 */
function manejarClickAudio(boton, audio, icono) {
    // Si este es el audio que ya está activo, pausarlo
    if (boton === botonActivo && !audio.paused) {
        pausarAudio(boton, audio, icono);
    } 
    // Si hay otro audio reproduciéndose, detenerlo primero
    else if (botonActivo !== null && botonActivo !== boton) {
        var audioAnterior = botonActivo.querySelector('audio');
        var iconoAnterior = botonActivo.querySelector('i');
        detenerAudio(botonActivo, audioAnterior, iconoAnterior);
        reproducirAudio(boton, audio, icono);
    } 
    // Si no hay audio activo, empezar a reproducir
    else {
        reproducirAudio(boton, audio, icono);
    }
}

/**
 * Función que reproduce un audio con animación de volumen
 * @param {HTMLElement} boton - El botón del audio
 * @param {HTMLElement} audio - El elemento audio
 * @param {HTMLElement} icono - El icono del botón
 */
function reproducirAudio(boton, audio, icono) {
    // Establecer como audio activo
    audioActivo = audio;
    botonActivo = boton;
    
    // Cambiar clases CSS
    boton.classList.remove('audio-paused');
    boton.classList.add('audio-playing');
    
    // Cambiar icono a pause
    if (icono) {
        icono.classList.remove('fa-play');
        icono.classList.add('fa-pause');
    }
    
    // Reproducir el audio
    audio.play().catch(function(error) {
        console.error('Error al reproducir audio:', error);
    });
    
    // Animar el volumen de 0 a 1 con GSAP
    if (typeof gsap !== 'undefined') {
        // Establecer volumen inicial en 0
        audio.volume = 0;
        
        // Animar el volumen suavemente a 1
        gsap.to(audio, {
            volume: 1,
            duration: 0.5,
            ease: "power2.out"
        });
    } else {
        // Si GSAP no está disponible, establecer volumen directamente
        audio.volume = 1;
    }
}

/**
 * Función que pausa un audio con animación de volumen
 * @param {HTMLElement} boton - El botón del audio
 * @param {HTMLElement} audio - El elemento audio
 * @param {HTMLElement} icono - El icono del botón
 */
function pausarAudio(boton, audio, icono) {
    // Animar el volumen a 0 antes de pausar
    if (typeof gsap !== 'undefined') {
        gsap.to(audio, {
            volume: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: function() {
                audio.pause();
                actualizarEstadoPausado(boton, icono);
            }
        });
    } else {
        // Si GSAP no está disponible, pausar directamente
        audio.pause();
        actualizarEstadoPausado(boton, icono);
    }
}

/**
 * Función que detiene completamente un audio (sin animación)
 * @param {HTMLElement} boton - El botón del audio
 * @param {HTMLElement} audio - El elemento audio
 * @param {HTMLElement} icono - El icono del botón
 */
function detenerAudio(boton, audio, icono) {
    // Animar el volumen a 0 rápidamente
    if (typeof gsap !== 'undefined') {
        gsap.to(audio, {
            volume: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: function() {
                audio.pause();
                audio.currentTime = 0;
                resetearEstado(boton);
            }
        });
    } else {
        // Si GSAP no está disponible, detener directamente
        audio.pause();
        audio.currentTime = 0;
        resetearEstado(boton);
    }
}

/**
 * Función que actualiza el estado visual del botón a pausado
 * @param {HTMLElement} boton - El botón del audio
 * @param {HTMLElement} icono - El icono del botón
 */
function actualizarEstadoPausado(boton, icono) {
    // Cambiar clases CSS
    boton.classList.remove('audio-playing');
    boton.classList.add('audio-paused');
    
    // Cambiar icono a play
    if (icono) {
        icono.classList.remove('fa-pause');
        icono.classList.add('fa-play');
    }
    
    // Limpiar referencias del audio activo
    if (boton === botonActivo) {
        audioActivo = null;
        botonActivo = null;
    }
}

/**
 * Función que resetea completamente el estado de un botón
 * @param {HTMLElement} boton - El botón a resetear
 */
function resetearEstado(boton) {
    var audio = boton.querySelector('audio');
    var icono = boton.querySelector('i');
    
    if (audio) {
        audio.volume = 1; // Resetear volumen
    }
    
    // Cambiar clases CSS
    boton.classList.remove('audio-playing');
    boton.classList.add('audio-paused');
    
    // Cambiar icono a play
    if (icono) {
        icono.classList.remove('fa-pause');
        icono.classList.add('fa-play');
    }
    
    // Limpiar referencias del audio activo
    if (boton === botonActivo) {
        audioActivo = null;
        botonActivo = null;
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarControlesAudio);
} else {
    // El DOM ya está listo
    inicializarControlesAudio();
}

