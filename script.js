const canvas = document.getElementById("cosmoCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Partículas
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

// Animación
function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = p.color;
    ctx.fill();

    p.x += p.speedX;
    p.y += p.speedY;
    p.life--;

    if (p.life <= 0) particles.splice(i, 1);
  });

  requestAnimationFrame(animate);
}
animate();

// Interacción
canvas.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 3; i++) {
    particles.push(createParticle(e.x, e.y));
  }
});

// Sonido
const audioCtx = new AudioContext();
canvas.addEventListener("click", (e) => {
  const osc = audioCtx.createOscillator();
  osc.frequency.value = 200 + e.y * 0.5; // Frecuencia según posición Y
  osc.type = "sine";
  osc.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.3);
});

// Reiniciar
document.addEventListener("keydown", (e) => {
  if (e.key === "r") particles = [];
});
