const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let characterX = canvas.width / 2; // Start position in the middle of the canvas
let characterSpeed = 10; // Speed of the character

function drawCharacter() {
    ctx.fillStyle = '#0095DD'; // Character color
    ctx.fillRect(characterX, canvas.height - 50, 50, 50); // Draw a simple square to represent the character
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateGame() {
    clearCanvas();
    drawCharacter();
}

// Begin keyboard controls
document.addEventListener('keydown', (event) => {
    if(event.key == "Right" || event.key == "ArrowRight") {
        characterX += characterSpeed; // Move right
    } else if(event.key == "Left" || event.key == "ArrowLeft") {
        characterX -= characterSpeed; // Move left
    }

    updateGame();
});
// End keyboard controls

updateGame();