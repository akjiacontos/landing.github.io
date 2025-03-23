Simulación de Partículas Cósmicas Interactivas

Descripción:
Este proyecto es una simulación visual e interactiva en JavaScript que utiliza el elemento <canvas> de HTML5 para crear un efecto de partículas animadas con comportamiento cósmico. Las partículas se mueven de forma aleatoria, cambian de color y tamaño, y responden a interacciones del usuario como el movimiento del ratón, clics y pulsaciones de teclas. Además, incluye efectos de sonido generados dinámicamente mediante la API Web Audio.

Características Principales:
- Canvas Dinámico: El lienzo se ajusta automáticamente al tamaño de la ventana del navegador y se redimensiona en tiempo real.
- Partículas Animadas:
  - Se crean partículas con posiciones, velocidades, tamaños y colores aleatorios (usando el modelo HSL).
  - Las partículas tienen una vida útil limitada y desaparecen al agotarse o al salir del lienzo.
  - Efecto de brillo (shadowBlur) para un estilo visual más inmersivo.
- Interacción con el Ratón:
  - Mover el ratón genera nuevas partículas en la posición del cursor.
  - Hacer clic produce un sonido cuya frecuencia depende de la posición vertical del clic.
- Interacción con el Teclado:
  - Presionar la tecla "R" reinicia la simulación, eliminando todas las partículas y mostrando un mensaje temporal de "Reiniciado".
- Audio Generado: Utiliza la API Web Audio para crear tonos sinusoidales al hacer clic, con frecuencias variables según la posición del cursor.

Tecnologías Utilizadas:
- HTML5 Canvas: Para renderizar las partículas y la animación.
- JavaScript: Lógica de animación, manejo de eventos y generación de partículas.
- Web Audio API: Para la síntesis de sonido en tiempo real.

Uso:
1. Incluye un elemento <canvas> con el ID "cosmoCanvas" en tu archivo HTML.
2. Copia este script en un archivo JavaScript vinculado.
3. Abre el archivo en un navegador para ver la simulación en acción.

Instrucciones de Interacción:
- Mueve el ratón para crear partículas.
- Haz clic para generar sonidos.
- Presiona "R" para reiniciar la simulación.
