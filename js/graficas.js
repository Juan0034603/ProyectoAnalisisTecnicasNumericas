/* ============================================================
   graficas.js — Módulo de Visualización de Resultados
   
   Maneja la generación de gráficas usando Chart.js.
   Muestra los datos reales y los 3 métodos superpuestos.
   ============================================================ */

let graficaActiva = null;

/**
 * Dibuja la gráfica comparativa con los datos y los 3 métodos.
 *
 * @param {number[]} ejeX - Valores X (tiempo o variable independiente)
 * @param {number[]} ejeY - Valores Y (distancia, profundidad, f(x), etc.)
 * @param {string}   etiquetaX - Texto del eje X
 * @param {string}   etiquetaY - Texto del eje Y
 */
function dibujarGraficaComparativa(ejeX, ejeY, etiquetaX, etiquetaY) {
  const canvas = document.getElementById('graficaPrincipal');
  if (!canvas) return;

  if (graficaActiva) {
    graficaActiva.destroy();
  }

  const puntosSuavizados = generarPuntosSuavizados(ejeX, ejeY, 80);

  graficaActiva = new Chart(canvas, {
    type: 'line',
    data: {
      datasets: [
        {
          label: 'Datos',
          data: ejeX.map((x, i) => ({ x: x, y: ejeY[i] })),
          borderColor: '#ffffff',
          backgroundColor: '#ffffff',
          pointRadius: 6,
          pointHoverRadius: 8,
          showLine: false,
          pointStyle: 'circle',
          order: 0
        },
        {
          label: 'Trapecio',
          data: ejeX.map((x, i) => ({ x: x, y: ejeY[i] })),
          borderColor: '#00d9a6',
          backgroundColor: 'rgba(0, 217, 166, 0.08)',
          borderWidth: 2,
          pointRadius: 0,
          tension: 0,
          fill: true,
          order: 3
        },
        {
          label: 'Simpson 1/3',
          data: puntosSuavizados,
          borderColor: '#f7b731',
          backgroundColor: 'rgba(247, 183, 49, 0.06)',
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.4,
          fill: false,
          order: 2
        },
        {
          label: 'Simpson 3/8',
          data: puntosSuavizados,
          borderColor: '#e05c82',
          backgroundColor: 'rgba(224, 92, 130, 0.06)',
          borderWidth: 2,
          borderDash: [6, 3],
          pointRadius: 0,
          tension: 0.4,
          fill: false,
          order: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#161b22',
          borderColor: '#30363d',
          borderWidth: 1,
          titleColor: '#e6edf3',
          bodyColor: '#8b949e',
          padding: 10,
          callbacks: {
            title: (items) => `${etiquetaX}: ${items[0].parsed.x.toFixed(3)}`,
            label: (item) => ` ${item.dataset.label}: ${item.parsed.y.toFixed(4)}`
          }
        }
      },
      scales: {
        x: {
          type: 'linear',
          title: { display: true, text: etiquetaX, color: '#8b949e', font: { family: 'Space Mono', size: 12 } },
          grid: { color: 'rgba(48, 54, 61, 0.5)' },
          ticks: { color: '#8b949e', font: { family: 'Space Mono', size: 10 } }
        },
        y: {
          title: { display: true, text: etiquetaY, color: '#8b949e', font: { family: 'Space Mono', size: 12 } },
          grid: { color: 'rgba(48, 54, 61, 0.5)' },
          ticks: { color: '#8b949e', font: { family: 'Space Mono', size: 10 } }
        }
      }
    }
  });
}

/**
 * Genera puntos intermedios suavizados mediante interpolación lineal.
 *
 * @param {number[]} ejeX - Valores X
 * @param {number[]} ejeY - Valores Y
 * @param {number}   totalPuntos - Cantidad de puntos a generar
 * @returns {object[]} - Arreglo de { x, y }
 */
function generarPuntosSuavizados(ejeX, ejeY, totalPuntos) {
  const puntos = [];
  const xMin = ejeX[0];
  const xMax = ejeX[ejeX.length - 1];

  for (let k = 0; k <= totalPuntos; k++) {
    const x = xMin + (xMax - xMin) * (k / totalPuntos);
    const y = interpolarLineal(ejeX, ejeY, x);
    puntos.push({ x: x, y: y });
  }

  return puntos;
}

/**
 * Interpolación lineal entre los datos tabulados.
 */
function interpolarLineal(xs, ys, x) {
  if (x <= xs[0]) return ys[0];
  if (x >= xs[xs.length - 1]) return ys[ys.length - 1];

  for (let i = 0; i < xs.length - 1; i++) {
    if (x >= xs[i] && x <= xs[i + 1]) {
      const proporcion = (x - xs[i]) / (xs[i + 1] - xs[i]);
      return ys[i] + proporcion * (ys[i + 1] - ys[i]);
    }
  }
  return ys[ys.length - 1];
}

/**
 * Actualiza la leyenda HTML de la gráfica.
 */
function actualizarLeyenda(idContenedor) {
  const contenedor = document.getElementById(idContenedor || 'leyendaGrafica');
  if (!contenedor) return;

  contenedor.innerHTML = `
    <div class="leyenda-item">
      <div class="leyenda-linea" style="background:#ffffff; height:0; border:2px dashed #fff; border-radius:0;"></div>
      <span>Datos</span>
    </div>
    <div class="leyenda-item">
      <div class="leyenda-linea" style="background:#00d9a6;"></div>
      <span>Trapecio</span>
    </div>
    <div class="leyenda-item">
      <div class="leyenda-linea" style="background:#f7b731;"></div>
      <span>Simpson 1/3</span>
    </div>
    <div class="leyenda-item">
      <div class="leyenda-linea" style="background:#e05c82; border-top: 2px dashed #e05c82; height:0;"></div>
      <span>Simpson 3/8</span>
    </div>
  `;
}
