/* ============================================================
   datos-ejercicio.js — Ejercicio de Referencia (Chapra)
   
   Función: f(x) = 0.2 + 25x - 200x² + 675x³ - 900x⁴ + 400x⁵
   Intervalo: [a, b] = [0, 0.8], n = 4, h = 0.2
   Valor exacto de la integral: 1.640533
   ============================================================ */

const DATOS_EJERCICIO = {
  // Valores de x (puntos del intervalo [0, 0.8] con h = 0.2)
  x: [0, 0.2, 0.4, 0.6, 0.8],

  // Valores de f(x) evaluados en cada punto
  fx: [0.2, 1.288, 2.456, 3.464, 0.232],

  // Valor exacto de la integral (calculado analíticamente)
  valorExacto: 1.640533,

  // Texto de la función para mostrar en pantalla
  funcionTexto: "f(x) = 0.2 + 25x - 200x² + 675x³ - 900x⁴ + 400x⁵",

  // Intervalo de integración
  a: 0,
  b: 0.8
};

/**
 * Calcula el error relativo porcentual respecto al valor exacto.
 *
 * @param {number} valorAproximado - Resultado obtenido por un método numérico
 * @param {number} valorExacto     - Valor real/analítico de la integral
 * @returns {number} - Error relativo porcentual
 */
function calcularErrorReal(valorAproximado, valorExacto) {
  return Math.abs((valorExacto - valorAproximado) / valorExacto) * 100;
}
