/* ============================================================
   simpson13.js — Método de Integración de Simpson 1/3
   
   La regla de Simpson 1/3 aproxima el área bajo la curva
   usando parábolas en grupos de 3 puntos (2 intervalos).
   
   Fórmula: I ≈ (h/3) * [f(x0) + 4f(x1) + 2f(x2) + 4f(x3) + ... + f(xn)]
   Requiere número par de intervalos (número impar de puntos).
   ============================================================ */

/**
 * Calcula la integral usando la Regla de Simpson 1/3 Compuesta.
 *
 * @param {number[]} ejeX - Arreglo de valores X
 * @param {number[]} ejeY - Arreglo de valores Y
 * @returns {object} - { resultado, pasos, error }
 */
function calcularSimpson13(ejeX, ejeY) {
  const n = ejeX.length - 1; // Número de intervalos

  if (ejeX.length < 3) {
    return { resultado: null, pasos: [], error: "Se necesitan al menos 3 puntos para Simpson 1/3." };
  }

  let areaTotal = 0;
  const pasos = [];
  let usaTrapecioFinal = false;

  const esUniforme = verificarPasoUniforme(ejeX);

  if (esUniforme && n % 2 === 0) {
    // Caso ideal: paso uniforme y número par de intervalos
    const h = ejeX[1] - ejeX[0];
    let suma = ejeY[0] + ejeY[n];

    for (let i = 1; i < n; i++) {
      const coeficiente = (i % 2 === 0) ? 2 : 4;
      suma += coeficiente * ejeY[i];

      pasos.push({ indice: i, x: ejeX[i], fx: ejeY[i], coeficiente: coeficiente });
    }

    areaTotal = (h / 3) * suma;

  } else {
    // Caso con paso variable o número impar de intervalos:
    // Simpson 1/3 en grupos de 2 intervalos
    let i = 0;
    while (i < n - 1) {
      const h1 = ejeX[i + 1] - ejeX[i];
      const h2 = ejeX[i + 2] - ejeX[i + 1];
      const hProm = (h1 + h2) / 2;

      const areaSimpson = (hProm / 3) * (ejeY[i] + 4 * ejeY[i + 1] + ejeY[i + 2]);
      areaTotal += areaSimpson;

      pasos.push({
        indice: Math.floor(i / 2) + 1,
        x0: ejeX[i], x1: ejeX[i + 1], x2: ejeX[i + 2],
        f0: ejeY[i], f1: ejeY[i + 1], f2: ejeY[i + 2],
        area: areaSimpson
      });

      i += 2;
    }

    // Si queda un intervalo suelto, se usa Trapecio para ese tramo
    if (i === n - 1) {
      const hFinal = ejeX[n] - ejeX[n - 1];
      const areaTrapecio = (hFinal / 2) * (ejeY[n - 1] + ejeY[n]);
      areaTotal += areaTrapecio;
      usaTrapecioFinal = true;
    }
  }

  return { resultado: areaTotal, pasos: pasos, usaTrapecioFinal: usaTrapecioFinal, error: null };
}

/**
 * Verifica si los intervalos entre puntos son aproximadamente uniformes.
 * Tolerancia del 5%.
 *
 * @param {number[]} ejeX - Arreglo de valores X
 * @returns {boolean}
 */
function verificarPasoUniforme(ejeX) {
  if (ejeX.length < 2) return true;
  const hBase = ejeX[1] - ejeX[0];
  for (let i = 1; i < ejeX.length - 1; i++) {
    const h = ejeX[i + 1] - ejeX[i];
    if (Math.abs(h - hBase) / hBase > 0.05) return false;
  }
  return true;
}
