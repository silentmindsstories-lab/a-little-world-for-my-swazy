const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");
let stars = [];
function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  stars = Array.from({ length: Math.min(150, Math.floor(window.innerWidth / 7)) }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.4 + 0.25,
    a: Math.random() * 0.7 + 0.15,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.025 + 0.004
  }));
}
function drawStars() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (const s of stars) {
    s.phase += s.speed;
    const alpha = s.a * (0.6 + Math.sin(s.phase) * 0.4);
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 239, 218, ${alpha})`;
    ctx.fill();
  }
  requestAnimationFrame(drawStars);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawStars();

// A few gentle fireflies floating through the page.
const fireflies = document.getElementById("fireflies");
for (let i = 0; i < 18; i++) {
  const fly = document.createElement("span");
  fly.className = "firefly";
  fly.style.left = `${Math.random() * 100}%`;
  fly.style.top = `${Math.random() * 100}%`;
  fly.style.animationDelay = `${Math.random() * -8}s`;
  fly.style.animationDuration = `${6 + Math.random() * 8}s`;
  fireflies.appendChild(fly);
}

document.getElementById("beginButton").addEventListener("click", () => {
  document.getElementById("garden").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("bloomButton").addEventListener("click", (event) => {
  document.getElementById("bloomMessage").classList.toggle("show");
  event.currentTarget.textContent = document.getElementById("bloomMessage").classList.contains("show")
    ? "A little love, just for you ♡" : "Make the garden bloom ✧";
});

document.getElementById("smileButton").addEventListener("click", () => {
  const reveal = document.getElementById("smileReveal");
  reveal.classList.toggle("show");
  document.getElementById("smileButton").textContent = reveal.classList.contains("show")
    ? "one more thing, baby ♡" : "Tap to find out, baby ♡";
});

const letterButton = document.getElementById("letterButton");
const letterPaper = document.getElementById("letterPaper");
letterButton.addEventListener("click", () => {
  const isOpen = letterPaper.classList.toggle("open");
  letterPaper.setAttribute("aria-hidden", String(!isOpen));
  letterButton.querySelector(".envelope-hint").textContent = isOpen ? "your letter is open ♡" : "open me, my love";
  if (isOpen) setTimeout(() => letterPaper.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
});

document.querySelectorAll(".reason-star").forEach((star) => {
  star.addEventListener("click", () => {
    document.querySelectorAll(".reason-star").forEach((item) => item.classList.remove("active"));
    star.classList.add("active");
    const note = document.getElementById("reasonNote");
    note.textContent = star.dataset.reason;
    note.animate([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 450, easing: "ease-out" });
  });
});

function showerHearts(amount = 36) {
  const container = document.getElementById("heartBurst");
  const symbols = ["♡", "♥", "✧", "💗"];
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("span");
    heart.className = "burst-heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${14 + Math.random() * 25}px`;
    heart.style.animationDelay = `${Math.random() * 1.2}s`;
    heart.style.animationDuration = `${2.8 + Math.random() * 2}s`;
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 5500);
  }
}
document.getElementById("heartsButton").addEventListener("click", () => showerHearts(55));

// Browsers require a user gesture before audio can play. Put die-for-you.mp3 beside index.html.
const song = document.getElementById("loveSong");
const musicButton = document.getElementById("musicButton");
const musicButtonText = document.getElementById("musicButtonText");
const musicDot = document.getElementById("musicDot");
const musicLabel = document.getElementById("musicLabel");
musicButton.addEventListener("click", async () => {
  if (song.paused) {
    try {
      await song.play();
      musicButtonText.textContent = "Pause music";
      musicDot.classList.add("playing");
      musicLabel.textContent = "Die For You · just for you";
    } catch (error) {
      musicLabel.textContent = "add die-for-you.mp3 first";
      musicButtonText.textContent = "Try again";
      alert('To play the song, place your audio file named "die-for-you.mp3" in the same folder as index.html, then refresh this page. Browsers also need you to press Play.');
    }
  } else {
    song.pause();
    musicButtonText.textContent = "Play music";
    musicDot.classList.remove("playing");
    musicLabel.textContent = "a little song for you";
  }
});
song.addEventListener("error", () => {
  musicLabel.textContent = "add your song file to play";
});
