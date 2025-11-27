/**
 * Preloader con p5.js
 * Canvas al 100% del contenedor y control del botón de entrada
 * Versión ES5 para compatibilidad
 */

// Variable para almacenar la referencia del sketch de p5
var preloaderSketch = null;

/**
 * Función que inicializa el preloader
 * Se ejecuta cuando el documento está completamente cargado
 */
function inicializarPreloader() {
    // Seleccionar el contenedor del preloader
    var preloaderContainer = document.getElementById('preloader');
    
    // Verificar que el contenedor existe
    if (!preloaderContainer) {
        console.error('El contenedor #preloader no existe');
        return;
    }
    
    // Seleccionar el botón de entrada
    var enterButton = document.getElementById('enter-button');
    
    // Verificar que el botón existe
    if (!enterButton) {
        console.error('El botón #enter-button no existe');
        return;
    }
    
    // Crear el sketch de p5.js dentro del contenedor
    preloaderSketch = new p5(function(sketch) {
        
        // Función setup - se ejecuta una vez al inicio
        sketch.setup = function() {
            // Obtener las dimensiones del contenedor
            var contenedor = document.getElementById('preloader');
            var ancho = contenedor ? contenedor.offsetWidth : window.innerWidth;
            var alto = contenedor ? contenedor.offsetHeight : window.innerHeight;
            
            // Crear canvas que ocupe el 100% del contenedor
            var canvas = sketch.createCanvas(ancho, alto);
            
            // Asignar el canvas al contenedor del preloader
            canvas.parent('preloader');
            
            // Configurar el modo de color si es necesario
            // sketch.colorMode(sketch.RGB, 255);
        };
        
        // Función draw - se ejecuta continuamente
        sketch.draw = function() {
            // Limpiar el canvas en cada frame
            sketch.clear();
            
            // Aquí puedes agregar tu animación o gráficos
            // Ejemplo: fondo negro
            sketch.background(0);
            
            // Ejemplo: círculo en el centro (comentado por defecto)
            // sketch.fill(255);
            // sketch.noStroke();
            // sketch.ellipse(sketch.width / 2, sketch.height / 2, 100, 100);
        };
        
        // Función windowResized - se ejecuta cuando se redimensiona la ventana
        sketch.windowResized = function() {
            // Obtener las dimensiones actualizadas del contenedor
            var contenedor = document.getElementById('preloader');
            if (contenedor && contenedor.style.display !== 'none') {
                var ancho = contenedor.offsetWidth;
                var alto = contenedor.offsetHeight;
                // Ajustar el canvas al tamaño del contenedor cuando cambia el tamaño
                sketch.resizeCanvas(ancho, alto);
            }
        };
        
    }, preloaderContainer); // Pasar el contenedor como segundo parámetro
    
    // Agregar evento click al botón de entrada
    enterButton.addEventListener('click', function() {
        ocultarPreloader(preloaderContainer);
    });
}

/**
 * Función que oculta el contenedor del preloader
 * @param {HTMLElement} preloaderContainer - El contenedor del preloader
 */
function ocultarPreloader(preloaderContainer) {
    // Agregar clase para ocultar o usar display none
    // Opción 1: Usar display none directamente
    preloaderContainer.style.display = 'none';
    
    // Opción 2: Si prefieres usar clases CSS, puedes hacerlo así:
    // preloaderContainer.classList.add('hidden');
    
    // Si es necesario, remover el sketch de p5.js
    if (preloaderSketch) {
        preloaderSketch.remove();
        preloaderSketch = null;
    }
}

// Inicializar cuando el DOM esté listo y p5.js esté cargado
function iniciarCuandoListo() {
    // Verificar si p5.js está cargado
    if (typeof p5 !== 'undefined') {
        inicializarPreloader();
    } else {
        // Si p5.js no está cargado, esperar un poco y volver a intentar
        setTimeout(iniciarCuandoListo, 100);
    }
}

// Verificar el estado del documento
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarCuandoListo);
} else {
    // El DOM ya está listo
    iniciarCuandoListo();
}

