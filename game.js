const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const arena = {
    width: 1000,
    height: 600
};

let player = {
    currAction: "idle",
    speed: 12,
    x: 30,
    y: 0
}

// Sprite sheet details
let spriteSheet = new Image();
let currentFrame = 0;
spriteSheet.src = 'animations/fang/spritesheet.bmp';
animations = {
  "walkRight": {
    frames: [
      { x: 640, y: 5, width: 175, height: 240 },
      { x: 830, y: 0, width: 170, height: 240 },
      { x: 1015, y: 5, width: 165, height: 240 },
      { x: 1192, y: 5, width: 160, height: 240 },
      { x: 1365, y: 5, width: 164, height: 240 },
      { x: 1542, y: 5, width: 166, height: 240 },
      { x: 1735, y: 5, width: 170, height: 240 },
      { x: 1925, y: 5, width: 175, height: 240 },
    ],
    rate: 125
  },
  "idle": {
    frames: [
      { x: -2, y: -5, width: 210, height: 240 },
      { x: 215, y: 0, width: 210, height: 240 },
      { x: 425, y: -3, width: 210, height: 240 },
      { x: 215, y: 0, width: 210, height: 240 }
    ],
    rate: 125 
  }
};

function drawCharacter() {
    let frame = animations[player.currAction].frames[currentFrame];
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
    if (currentFrame >= animations[player.currAction].frames.length) {
        currentFrame = 0;
    }
}

setInterval(updateFrame, animations[player.currAction].rate); 

// Begin keyboard controls
document.addEventListener('keydown', (event) => {
    if(event.key == "Right" || event.key == "ArrowRight") {
        if (player.x < arena.width - player.speed) {
          player.currAction = "walkRight";
          player.x += player.speed;
        }
    } else if(event.key == "Left" || event.key == "ArrowLeft") {
        if (player.x >= player.speed) {
            player.x -= player.speed;
        }
    }
    updateGame();
});

document.addEventListener('keyup', (event) => {
    if(["Right", "ArrowRight", "Left", "ArrowLeft"].includes(event.key)) {
        currentFrame = 0;
        player.currAction = "idle";
    }
    updateGame();
});
// End keyboard controls

updateGame();