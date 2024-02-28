const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const arena = {
    width: 1000,
    height: 600
};

let player = {
    speed: 10,
    x: 30,
    y: 0
}
let currAction = "idle"

// Sprite sheet details
let spriteSheet = new Image();
let currentFrame = 0;
spriteSheet.src = 'animations/fang/spritesheet.bmp';
animations = {
  "idle": {
    frames: [
      { x: -2, y: -5, width: 210, height: 240 },
      { x: 215, y: 0, width: 210, height: 240 },
      { x: 425, y: -3, width: 210, height: 240 },
      { x: 215, y: 0, width: 210, height: 240 }
    ],
    rate: 500 
  }
};

function drawCharacter() {
    let frame = animations[currAction].frames[currentFrame];
    ctx.drawImage(spriteSheet, frame.x, frame.y, frame.width, frame.height, player.x, 360, frame.width, frame.height);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateGame() {
    clearCanvas();
    drawCharacter();
    requestAnimationFrame(updateGame);
}

function updateFrame() {
    currentFrame++;
    if (currentFrame >= animations[currAction].frames.length) {
        currentFrame = 0;
    }
}

setInterval(updateFrame, animations[currAction].rate); 

// Begin keyboard controls
document.addEventListener('keydown', (event) => {
    if(event.key == "Right" || event.key == "ArrowRight") {
        if (player.x < arena.width - player.speed) {
          player.x += player.speed;
        }
    } else if(event.key == "Left" || event.key == "ArrowLeft") {
        if (player.x >= player.speed) {
            player.x -= player.speed;
        }
    }

    updateGame();
});
// End keyboard controls

updateGame();