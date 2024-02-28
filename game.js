const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const arena = {
    width: 1000,
    height: 600
};

let player = {
    currAction: "idle",
    speed: 10,
    x: 30,
    y: 0
}

// Sprite sheet details
let spriteSheet = new Image();
let currentFrame = 0;
spriteSheet.src = 'animations/fang/spritesheet.bmp';
animations = {
  "walkLeft": {
    frames: [
      { x: 5, y: 270, width: 175, height: 220 },
      { x: 205, y: 270, width: 175, height: 220 },
      { x: 395, y: 270, width: 175, height: 220 },
      { x: 590, y: 270, width: 175, height: 220 },
      { x: 775, y: 265, width: 175, height: 220 },
      { x: 955, y: 265, width: 175, height: 220 },
    ]
  },
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
    ]
  },
  "idle": {
    frames: [
      { x: -2, y: -5, width: 210, height: 240 },
      { x: -2, y: -5, width: 210, height: 240 },
      { x: 215, y: 0, width: 210, height: 240 },
      { x: 215, y: 0, width: 210, height: 240 },
      { x: 425, y: -3, width: 210, height: 240 },
      { x: 425, y: -3, width: 210, height: 240 },
      { x: 215, y: 0, width: 210, height: 240 },
      { x: 215, y: 0, width: 210, height: 240 }
    ]
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

setInterval(updateFrame, 125); 

// Begin keyboard controls
document.addEventListener('keydown', (event) => {
    if(event.key == "Right" || event.key == "ArrowRight") {
        if (player.x < arena.width - player.speed) {
          player.currAction = "walkRight";
          player.x += player.speed;
        }
    } else if(event.key == "Left" || event.key == "ArrowLeft") {
        if (player.x >= player.speed) {
            player.currAction = "walkLeft";
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