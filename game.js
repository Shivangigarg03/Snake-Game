let foodSound = new Audio("music/food.mp3");
let gameoverSound = new Audio("music/gameover.mp3");
let moveSound = new Audio("music/move.mp3");
let musicSound = new Audio("music/music.mp3");
let inputDir = { x: 0, y: 0 };
let snakeArr = [{ x: 5, y: 13 }];
let food = { x: 13, y: 5 };
let speed = 10;
let lastPaintTime = 0;
let score = 0;

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snake) {
    //collide with itself
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y)
            return true;
    }
    //collide with walls
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
    return false;
}
function gameEngine() {
    //update food and snakearr
    if (isCollide(snakeArr)) {
        gameoverSound.play();
        inputDir = { x: 0, y: 0 };
        alert("Press any key to play again!!!")
        snakeArr = [{ x: 5, y: 13 }];
        score = 0;
        document.getElementById("score").innerHTML = "Score: " + score;
    }

    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodSound.play();
        score++;
        document.getElementById("score").innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2, b = 17;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }


    //snake move
    for (let j = snakeArr.length - 2; j >= 0; j--) {
        snakeArr[j + 1] = { ...snakeArr[j] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    container.innerHTML="";
    //create snake
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridColumnStart=e.x;
        snakeElement.style.gridRowStart=e.y;
        if (index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('body');
        }
        container.appendChild(snakeElement);
    })
    //create food
    foodElement=document.createElement("div");
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add("food");
    container.appendChild(foodElement);

}
window.requestAnimationFrame(main);
// musicSound.play();
window.addEventListener("keydown", e => {
    // moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});




