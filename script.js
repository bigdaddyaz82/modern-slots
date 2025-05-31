const symbols = ['🐉', '💎', '🔥', '🪙', '👑', '⚔️', '🧝', '🦄', '🍀', '🔮'];
const spinButton = document.getElementById('spin');
const resultDisplay = document.getElementById('result');
const soundSpin = document.getElementById('sound-spin');
const soundWin = document.getElementById('sound-win');
const soundLose = document.getElementById('sound-lose');
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function getRandomSymbol() {
  const index = Math.floor(Math.random() * symbols.length);
  return symbols[index];
}

spinButton.addEventListener('click', () => {
  const reel1 = document.getElementById('reel1');
  const reel2 = document.getElementById('reel2');
  const reel3 = document.getElementById('reel3');

  soundSpin.play();
  reel1.classList.add('spinning');
  reel2.classList.add('spinning');
  reel3.classList.add('spinning');

  setTimeout(() => {
    const roll = Math.random();
    let s1, s2, s3;

    if (roll < 0.02) {
      // Jackpot: all three symbols the same
      s1 = s2 = s3 = getRandomSymbol();
      resultDisplay.textContent = `🎉 JACKPOT! 3 ${s1}'s!`;
      soundWin.play();
      triggerFireworks();
    } else if (roll < 0.18) {
      // Pair: two symbols the same
      s1 = getRandomSymbol();
      s2 = s1;
      do {
        s3 = getRandomSymbol();
      } while (s3 === s1);
      resultDisplay.textContent = `🔥 You got a pair!`;
      soundWin.play();
    } else {
      // Lose: all symbols different
      do {
        s1 = getRandomSymbol();
        s2 = getRandomSymbol();
        s3 = getRandomSymbol();
      } while (s1 === s2 || s2 === s3 || s1 === s3);
      resultDisplay.textContent = `😢 Try again!`;
      soundLose.play();
    }

    reel1.textContent = s1;
    reel2.textContent = s2;
    reel3.textContent = s3;

    reel1.classList.remove('spinning');
    reel2.classList.remove('spinning');
    reel3.classList.remove('spinning');
  }, 1000);
});

// Fireworks animation for jackpot win
function triggerFireworks() {
  let particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,
      alpha: 1,
      radius: Math.random() * 3 + 2
    });
  }
  let interval = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 215, 0, ${p.alpha})`;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.02;
    });
    particles = particles.filter(p => p.alpha > 0);
    if (particles.length === 0) clearInterval(interval);
  }, 30);
}
