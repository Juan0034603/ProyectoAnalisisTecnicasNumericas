/* ============================================================
   trapecio.js — Método de Integración por Trapecio
   
   La regla del trapecio aproxima el área bajo la curva
   dividiendo la región en trapecios entre cada par de puntos.
   
   Fórmula: I ≈ (h/2) * [f(x0) + 2f(x1) + 2f(x2) + ... + f(xn)]
   Para paso variable: suma de áreas de cada trapecio individual.
   ============================================================ */

/**
 * Calcula la integral usando la Regla del Trapecio Compuesta.
 * Funciona con puntos de paso uniforme o variable.
 *
 * @param {number[]} ejeX - Arreglo de valores en el eje X
 * @param {number[]} ejeY - Arreglo de valores en el eje Y
 * @returns {object} - { resultado, pasos, error }
 */
function calcularTrapecio(ejeX, ejeY) {
  const n = ejeX.length;

  if (n < 2) {
    return { resultado: null, pasos: [], error: "Se necesitan al menos 2 puntos." };
  }

  let areaTotal = 0;
  const pasos = [];

  for (let i = 0; i < n - 1; i++) {
    const anchoH    = ejeX[i + 1] - ejeX[i];
    const alturaIzq = ejeY[i];
    const alturaDer = ejeY[i + 1];
    const areaTrapecio = (anchoH / 2) * (alturaIzq + alturaDer);

    areaTotal += areaTrapecio;

    pasos.push({
      indice: i + 1,
      x0: ejeX[i],
      x1: ejeX[i + 1],
      h: anchoH,
      f0: alturaIzq,
      f1: alturaDer,
      area: areaTrapecio
    });
  }

  return { resultado: areaTotal, pasos: pasos, error: null };
}
