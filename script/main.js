let scoreBlock;
let score = 0;

const config = {
    step: 0,
    maxStep: 5,
    sizeCell: 16,
    sizeberry: 16 / 4,
}

const snake = {
    x: 16,
    y: 16,
    dx: config.sizeCell,
    dy: 0,
    tails: [],
    maxTails: 3,
}

let berry = {
    x: 0, 
    y: 0,
}

let blueBerry = {
    x: 0,
    y: 0,
    kof: 5,
    state: 0,
}

let canvas = document.querySelector('#game-canvas');
let context = canvas.getContext('2d');
scoreBlock = document.querySelector('.game-score .score-count');
drawScore();

function gameLoop(){
    requestAnimationFrame(gameLoop);

    if (++config.step < config.maxStep){
        return;
    }
    config.step = 0;

    context.clearRect(0, 0, canvas.width, canvas.height);

    drawBerry();
    drawBlueBerry();
    drawSnake();
}
requestAnimationFrame(gameLoop);
randomPositionBerry();

function drawSnake(){
    snake.x += snake.dx;
    snake.y += snake.dy;

    colisionBorder();

    snake.tails.unshift({ x: snake.x, y: snake.y});

    if (snake.tails.length > snake.maxTails){
        snake.tails.pop();
    }

    snake.tails.forEach(function(el, index){
        if (index === 0){
            context.fillStyle = "#FD031B";
        }
        else{
            context.fillStyle = "#EB0319";
        }
        context.fillRect(el.x, el.y, config.sizeCell, config.sizeCell);

        if (el.x === berry.x && el.y === berry.y){
            snake.maxTails++;
            inScore();
            randomPositionBerry();
            blueBerryNewState();
        }
        else if (el.x === blueBerry.x && el.y === blueBerry.y){
            snake.maxTails -= 2;
            downScore();
            randomPositionBlueBerry();
            blueBerryNewState();
        }

        for (let i = index + 1; i < snake.tails.length; i++){
            if ( el.x == snake.tails[i].x && el.y == snake.tails[i].y){
                refresGame();
            }
        }
    });
}

function colisionBorder(){
    if (snake.x < 0){
        snake.x = canvas.width - config.sizeCell;
    }
    else if (snake.x >= canvas.width){
        snake.x = 0;
    }
    else if (snake.y < 0){
        snake.y = canvas.height - config.sizeCell;
    }
    else if (snake.y >= canvas.height){
        snake.y = 0;
    }
}

function refresGame(){
    score = 0;
    drawScore();

    snake.x = 160;
    snake.y = 160;
    snake.tails = [];
    snake.maxTails = 3;
    snake.dx = config.sizeCell
    snake.dy = 0;

    randomPositionBerry();

}

function drawBerry(){
    context.beginPath();
    context.fillStyle = "#A00034"
    context.arc(berry.x + (config.sizeCell / 2), berry.y + (config.sizeCell / 2), config.sizeberry, 0, 2  * Math.PI);
    context.fill();
}

function drawBlueBerry(){
    if (blueBerry.state === 1){
        context.beginPath();
        context.fillStyle = "#4AC0BC"
        context.arc(blueBerry.x + (config.sizeCell / 2), blueBerry.y + (config.sizeCell / 2), config.sizeberry, 0, 2  * Math.PI);
        context.fill();
    }
}

function randomPositionBerry(){
    berry.x = getRandomInt(0, canvas.width / config.sizeCell) * config.sizeCell;
    berry.y = getRandomInt(0, canvas.height / config.sizeCell) * config.sizeCell;
}

function randomPositionBlueBerry(){
    if (blueBerry.state === 1){
        blueBerry.x = getRandomInt(0, canvas.width / config.sizeCell) * config.sizeCell;
        blueBerry.y = getRandomInt(0, canvas.height / config.sizeCell) * config.sizeCell;
    }
    else {
        blueBerry.x = -1000;
        blueBerry.y = -1000;
    }
    if (blueBerry.x === berry.x && blueBerry.y === berry.y){
        randomPositionBerry();
    }
}

function blueBerryNewState(){
    blueBerry.state = getRandomInt(0, blueBerry.kof);
}

function inScore() {
    score++;
    drawScore();
}

function downScore() {
    score--;
    drawScore();
}

function drawScore(){
    scoreBlock.innerHTML = score;
}

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

document.addEventListener('keydown', function(e){
    if (e.code == 'KeyW'){
        snake.dy = -config.sizeCell;
        snake.dx = 0;
    }
    else if(e.code == 'KeyA'){ 
        snake.dx = -config.sizeCell;
        snake.dy = 0;
    }
    else if(e.code == 'KeyS'){
        snake.dy = config.sizeCell;
        snake.dx = 0;
    }
    else if(e.code == 'KeyD'){
        snake.dx = config.sizeCell;
        snake.dy = 0;
    }
})