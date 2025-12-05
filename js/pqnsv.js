/**
 * Interacción para cambiar el fill de los paths dentro de #logo-svg
 * basándose en la distancia del cursor a cada path individual usando coordenadas absolutas del viewport
 */

// Obtener el SVG y los paths
const logoSvg = document.getElementById('logo-svg');
const paths = logoSvg.querySelectorAll('path');

// Configuración de las variables para la interacción
const maxDistance = 500; // Distancia máxima para considerar el efecto (en píxeles)
// Obtener posición inicial del cursor (centro de la pantalla)
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
// Event listeners
document.addEventListener('mousemove', handleMouseMove);
// Actualizar en resize para recalcular las posiciones
window.addEventListener('resize', () => {
    updatePathFills();
}, { passive: true });

/**
 * Calcula la distancia euclidiana entre dos puntos
 */
function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

/**
 * Obtiene el centro de un path en coordenadas absolutas del viewport
 * getBoundingClientRect() devuelve coordenadas relativas a la ventana visible (viewport)
 */
function getPathCenter(path) {
    const rect = path.getBoundingClientRect();
    return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };
}

/**
 * Calcula la distancia mínima desde un punto a un path
 * Usa el centro del bounding box del path para simplificar
 */
function getDistanceToPath(mouseX, mouseY, path) {
    const pathCenter = getPathCenter(path);
    return calculateDistance(mouseX, mouseY, pathCenter.x, pathCenter.y);
}

/**
 * Calcula el valor de opacidad/interpolación basado solo en la distancia
 * Retorna un valor entre 0 (blanco/cerca) y 1 (negro/lejos)
 * Usa coordenadas absolutas del viewport (sin considerar scroll)
 */
function calculateFillValue(distance) {
    // Normalizar la distancia (0 = muy cerca, 1 = muy lejos)
    let normalizedDistance = Math.min(distance / maxDistance, 1);
    
    // Asegurar que esté entre 0 y 1
    normalizedDistance = Math.max(0, Math.min(1, normalizedDistance));
    
    return normalizedDistance;
}

/**
 * Convierte un valor de 0 a 1 en un color entre blanco y negro
 */
function valueToColor(value) {
    // value: 0 = blanco, 1 = negro
    const rgbValue = Math.round(255 * value); // Menos valor = más blanco
    return `rgb(${rgbValue}, ${rgbValue}, ${rgbValue})`;
}

/**
 * Actualiza el fill de todos los paths basándose en la distancia individual de cada uno
 * Usa coordenadas absolutas del viewport (no relativas al scroll)
 */
function updatePathFills() {
    paths.forEach(path => {
        // Calcular distancia desde el cursor al centro de este path específico
        // getBoundingClientRect() devuelve coordenadas absolutas del viewport
        const distance = getDistanceToPath(mouseX, mouseY, path);
        
        // Calcular el valor de fill basado solo en distancia (coordenadas absolutas)
        const fillValue = calculateFillValue(distance);
        
        // Convertir a color
        const fillColor = valueToColor(fillValue);
        
        // Aplicar el fill específico a este path
        path.style.fill = fillColor;
    });
}

/**
 * Manejador del movimiento del mouse
 */
function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    updatePathFills();
}

// Inicializar con valores por defecto
updatePathFills();