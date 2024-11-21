const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const start = document.querySelector('.start');
const gameOver = document.querySelector('.game-over');
const scoreDisplay = document.querySelector('.score');

const audioStart = new Audio('./src/audio/audio_theme.mp3');
const audioGameOver = new Audio('./src/audio/audio_gameover.mp3');

let score = 0;
let isJumping = false;
let gameLoop;

const startGame = () => {
  pipe.classList.add('pipe-animation');
  start.style.display = 'none';
  gameOver.style.display = 'none';
  score = 0;
  updateScore();

  audioStart.currentTime = 0;
  audioStart.play();

  gameLoop = setInterval(loop, 10);
};

const restartGame = () => {
  gameOver.style.display = 'none';
  pipe.style.left = '';
  pipe.style.right = '0';
  mario.src = './src/img/mario.gif';
  mario.style.width = '150px';
  mario.style.bottom = '0';

  audioGameOver.pause();
  audioGameOver.currentTime = 0;

  audioStart.currentTime = 0;
  audioStart.play();

  score = 0;
  updateScore();

  gameLoop = setInterval(loop, 10);
};

const jump = () => {
  if (!isJumping) {
    isJumping = true;
    mario.classList.add('jump');

    setTimeout(() => {
      mario.classList.remove('jump');
      isJumping = false;
    }, 800);
  }
};

const updateScore = () => {
  scoreDisplay.textContent = `Score: ${score}`;
};

const loop = () => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = parseFloat(window.getComputedStyle(mario).bottom);

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    pipe.classList.remove('pipe-animation');
    pipe.style.left = `${pipePosition}px`;

    mario.classList.remove('jump');
    mario.style.bottom = `${marioPosition}px`;

    mario.src = './src/img/game-over.png';
    mario.style.width = '80px';
    mario.style.marginLeft = '50px';

    audioStart.pause();
    audioGameOver.play();

    setTimeout(() => {
      audioGameOver.pause();
    }, 7000);

    gameOver.style.display = 'flex';

    clearInterval(gameLoop);
  } else if (pipePosition < 0 && isJumping) {
    score++;
    updateScore();
  }
};

document.addEventListener('keypress', (e) => {
  if (e.key === ' ') {
    jump();
  } else if (e.key === 'Enter') {
    startGame();
  }
});

document.addEventListener('touchstart', (e) => {
  if (e.touches.length) {
    jump();
  }
});