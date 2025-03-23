const canvas = document.getElementById("cosmoCanvas");
if (!canvas) {
  console.error("No se encontró el canvas!");
} else {
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

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

  canvas.addEventListener("mousemove", (e) => {
    for (let i = 0; i < 3; i++) {
      particles.push(createParticle(e.x, e.y));
    }
  });

  // Secuencia de notas de Für Elise
  const furEliseNotes = [
    659.25, 622.25, 659.25, 622.25, 659.25, 493.88, 587.33, 523.25, 440, // Primera frase
    659.25, 622.25, 659.25, 622.25, 659.25, 493.88, 587.33, 523.25, 440  // Repetición
  ];
  let noteIndex = 0;

  let audioCtx;
  canvas.addEventListener("click", (e) => {
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === "suspended") audioCtx.resume();

    const osc = audioCtx.createOscillator();
    osc.frequency.value = furEliseNotes[noteIndex]; // Toca la nota actual
    osc.type = "sine";
    osc.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);

    noteIndex = (noteIndex + 1) % furEliseNotes.length; // Avanza y reinicia si termina
  });

  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "r") {
      particles = [];
      resetMessage = true;
      setTimeout(() => (resetMessage = false), 500);
    }
  });
}
