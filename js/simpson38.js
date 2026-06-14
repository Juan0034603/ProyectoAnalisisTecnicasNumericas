/* ============================================================
   simpson38.js — Método de Integración de Simpson 3/8
   
   La regla de Simpson 3/8 aproxima el área bajo la curva
   usando polinomios de grado 3 en grupos de 4 puntos (3 intervalos).
   
   Fórmula: I ≈ (3h/8) * [f(x0) + 3f(x1) + 3f(x2) + 2f(x3) + ... + f(xn)]
   Requiere que el número de intervalos sea múltiplo de 3.
   ============================================================ */

/**
 * Calcula la integral usando la Regla de Simpson 3/8 Compuesta.
 *
 * @param {number[]} ejeX - Arreglo de valores X
 * @param {number[]} ejeY - Arreglo de valores Y
 * @returns {object} - { resultado, pasos, error }
 */
function calcularSimpson38(ejeX, ejeY) {
  const n = ejeX.length - 1; // Número de intervalos

  if (ejeX.length < 4) {
    return { resultado: null, pasos: [], error: "Se necesitan al menos 4 puntos para Simpson 3/8." };
  }

  let areaTotal = 0;
  const pasos = [];

  const esUniforme = verificarPasoUniforme(ejeX);
  const multiplo3 = n % 3 === 0;

  if (esUniforme && multiplo3) {
    // Caso ideal: paso uniforme y número de intervalos múltiplo de 3
    const h = ejeX[1] - ejeX[0];
    let suma = ejeY[0] + ejeY[n];

    for (let i = 1; i < n; i++) {
      const coeficiente = (i % 3 === 0) ? 2 : 3;
      suma += coeficiente * ejeY[i];

      pasos.push({ indice: i, x: ejeX[i], fx: ejeY[i], coeficiente: coeficiente });
    }

    areaTotal = (3 * h / 8) * suma;

  } else {
    // Caso variable: Simpson 3/8 en grupos de 3 intervalos
    let i = 0;

    while (i <= n - 3) {
      const h1 = ejeX[i + 1] - ejeX[i];
      const h2 = ejeX[i + 2] - ejeX[i + 1];
      const h3 = ejeX[i + 3] - ejeX[i + 2];
      const hProm = (h1 + h2 + h3) / 3;

      const areaSimpson38 = (3 * hProm / 8) * (
        ejeY[i] + 3 * ejeY[i + 1] + 3 * ejeY[i + 2] + ejeY[i + 3]
      );

      areaTotal += areaSimpson38;

      pasos.push({
        indice: Math.floor(i / 3) + 1,
        x0: ejeX[i], x1: ejeX[i + 1], x2: ejeX[i + 2], x3: ejeX[i + 3],
        f0: ejeY[i], f1: ejeY[i + 1], f2: ejeY[i + 2], f3: ejeY[i + 3],
        area: areaSimpson38
      });

      i += 3;
    }

    // Intervalos sueltos al final se resuelven con Trapecio
    while (i < n) {
      const hFinal = ejeX[i + 1] - ejeX[i];
      const areaTrapecio = (hFinal / 2) * (ejeY[i] + ejeY[i + 1]);
      areaTotal += areaTrapecio;
      i++;
    }
  }

  return { resultado: areaTotal, pasos: pasos, error: null };
}
