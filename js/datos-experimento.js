/* ============================================================
   datos-experimento.js — Datos del Experimento Físico
   
   Datos obtenidos del simulador "Rampa: Fuerzas y Movimiento" (PhET).
   Se registraron, cada 1 segundo (t = 0 a 12), dos lecturas directas
   de la simulación:

     - Distancia recorrida acumulada (m)
     - Velocidad instantánea (m/s), tomada como valor absoluto
       (el signo indica solo dirección sobre la rampa)

   NumIntegra integra la curva VELOCIDAD vs TIEMPO. El área bajo esa
   curva representa la DISTANCIA RECORRIDA, que se compara contra la
   distancia real medida hasta t = 12 s (13.73 m) como verificación
   de los 3 métodos.

   Nota: se registraron 14 lecturas (t = 0 a 13), pero el dato en
   t = 13 (velocidad = 1.40 m/s) muestra una desaceleración brusca,
   indicando que el objeto llegó al final de la rampa. Por esto se
   usa el tramo t = 0 a 12 (13 puntos, 12 intervalos), que además
   permite aplicar Simpson 1/3 y Simpson 3/8 en su forma directa
   (12 es par y múltiplo de 3).
   ============================================================ */

const DATOS_EXPERIMENTO = {
  // Distancia recorrida acumulada (m), medida directamente en el simulador
  distanciaAcumulada: [0.00, 0.29, 0.68, 1.28, 2.02, 2.95, 3.99, 5.19, 6.60, 8.10, 9.91, 11.65, 13.73],

  // Distancia total real medida hasta t = 12 (para comparar contra la integral)
  distanciaTotalReal: 13.73,

  // Tiempo en segundos
  tiempos: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

  // Velocidad instantánea (m/s), leída directamente de la simulación (valor absoluto)
  velocidades: [0.18, 0.34, 0.50, 0.66, 0.82, 0.98, 1.14, 1.30, 1.46, 1.62, 1.78, 1.94, 2.10]
};
