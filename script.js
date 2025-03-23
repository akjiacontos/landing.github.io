const canvas = document.getElementById("nebulaCanvas");
if (!canvas) {
  console.error("No se encontró el canvas!");
} else {
  const ctx = canvas.getContext("2d");

  // Ajustar el tamaño del canvas al tamaño de la ventana
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Crear y gestionar partículas
  let particles = [];
  function createParticle(x, y) {
    return {
      x,
      y,
      size: Math.random() * 5 + 1,
      speedX: Math.random() * 2 - 1,
      speedY: Math.random() * 2 - 1,
      life: 100,
      color: `hsl(${Math.random() * 360}, 80%, 50%)`
    };
  }

  // Inicializar partículas
  for (let i = 0; i < 20; i++) {
    particles.push(createParticle(Math.random() * canvas.width, Math.random() * canvas.height));
  }

  let resetMessage = false;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.color;
      ctx.fill();
      ctx.shadowBlur = 0;

      p.x += p.speedX;
      p.y += p.speedY;
      p.life--;

      if (p.life <= 0 || p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
        particles.splice(i, 1);
      }
    }
    if (resetMessage) {
      ctx.font = "20px Arial";
      ctx.fillStyle = "white";
      ctx.fillText("Reiniciado", canvas.width / 2 - 50, canvas.height / 2);
    }
    requestAnimationFrame(animate);
  }
  animate();

  // Crear partículas al mover el ratón
  canvas.addEventListener("mousemove", (e) => {
    for (let i = 0; i < 3; i++) {
      particles.push(createParticle(e.x, e.y));
    }
  });

  // Secuencia de notas de "Für Elise" (frecuencias en Hz)
  const furEliseNotes = [
    659.25, 622.25, 659.25, 622.25, 659.25, 493.88, 587.33, 523.25, 440, // E5, D#5, E5, D#5, E5, B4, D5, C5, A4
    523.25, 493.88, 440, 392, 440, 493.88, 523.25, 587.33, 659.25,       // C5, B4, A4, G4, A4, B4, C5, D5, E5
    659.25, 622.25, 659.25, 622.25, 659.25, 493.88, 587.33, 523.25, 440  // Repetición
  ];
  let noteIndex = 0;
  let audioCtx = null;

  // Reproducir notas al hacer clic
  canvas.addEventListener("click", (e) => {
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === "suspended") audioCtx.resume();

    const osc = audioCtx.createOscillator();
    osc.frequency.value = furEliseNotes[noteIndex];
    osc.type = "sine";
    osc.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.4); // Duración de 0.4s

    noteIndex = (noteIndex + 1) % furEliseNotes.length;
  });

  // Reiniciar partículas con la tecla 'r'
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "r") {
      particles = [];
      resetMessage = true;
      setTimeout(() => (resetMessage = false), 500);
    }
  });
}
