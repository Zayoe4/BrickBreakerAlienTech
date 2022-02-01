var paddleHeight = paddle.offsetHeight;
var paddleWidth =  paddle.offsetWidth;
var paddleSpeedX = 0;
var paddlePosX = (window.innerWidth/2)-(paddleWidth/2);  //Middle of the screen

var ball = document.getElementsByClassName("ball");
ball[0].ballSpeedX = 0;
ball[0].ballSpeedY = 0;
var ballRadius = 7.5;
ball[0].ballPosX = (window.innerWidth/2)-ballRadius; //Middle of the screen
ball[0].ballPosY = paddle.offsetTop - (ballRadius*2) -2;
var isBallCloned = false;

var brickClass = document.getElementsByClassName("brick");
var brickWidth = brickClass[0].offsetWidth;
var brickHeight = brickClass[0].offsetHeight;
var brickPosX = 40;
var brickPosY = 10;
var brickColor = ["lightskyblue", "PaleGreen", "whitesmoke", "PaleGoldenRod", "Orange"];
var brickPattern = 0;

var playerLives = 3;
var playerScore = 0;
var wins = 0;
var debug = 0;

gos.style.top = (window.innerHeight/2) - (191/2) + "px";
gos.style.left = (window.innerWidth/2) - (260/2) + "px";

var gameOverBool = false;
var startGameBool = false;
document.addEventListener('keydown', function (e) {
    if (e.key == 'ArrowRight' || e.key == 'ArrowLeft' ) {
        startGameBool = true;
        start.style.visibility = 'hidden';
        border.style.visibility = 'visible';
        console.log("The Game has Started!")
    }
}, false);

// Game Countdown to Start
function startCountdown(){
    for (let i = 3; i > 0; i--) {
        //Where I'd keep a countdown timer to start game... IF I HAD ONE!
        
    }

}

// Check to see if win condition is met
function winConditionCheck(){
    var brickVisCount = 0;
    for (let i = 0; i < brickClass.length; i++) {
        if(brickClass[i].style.visibility == 'hidden'){
            brickVisCount++;
            playerScore = brickVisCount*2;
            Score.innerHTML = "Score: " + playerScore;

            if(brickVisCount == brickClass.length){
                ball[0].ballSpeedX = 0;
                ball[0].ballSpeedY = 0;
                ball[0].ballPosX = (window.innerWidth/2)-(ballRadius*2); //Middle of the screen
                ball[0].ballPosY = paddle.offsetTop - (ballRadius*2) -2;
                for (let i = 0; i < brickClass.length; i++){
                    brickClass[i].style.visibility = 'hidden';
                }
                wins = 1;
                Wins.innerHTML = "Wins: " + wins;
                brickVisCount = 0;
                break;
            }
        }
        
    }
}

//Checks to see if Game is over.
function gameOverCheck(ballNumber){
    ballNumber.ballSpeedX = 0;
    ballNumber.ballSpeedY = 0;
    playerLives -= 1;

    if(playerLives < 1){
        Lives.innerHTML = playerLives+' Lives Left';
        gos.style.display = "inline";
        ballNumber.style.visibility = "hidden";
        ballNumber.remove();
    }else{
        ballNumber.ballPosX = (window.innerWidth/2) - ballRadius; //Middle of the screen
        ballNumber.ballPosY = paddle.offsetTop - (ballRadius*2) -2;
        paddlePosX = (window.innerWidth/2)-(paddleWidth/2);
        
}
}

//Creates the brick field
function createBrickField(){
    for (let i = 0; i < 99; i++) {
        var brickMaker = brickClass[i];
        brickMaker.powerUp = false;
        var brickBaker = brickMaker.cloneNode(true);
        brickfield.appendChild(brickBaker);
    }
}
createBrickField();
//creates powerUps and distrube them randomly
for (let powers = 0; powers < 3; powers++) {
    clonePowerUp(powerUp.children[powers].className);
}
positionPowerUp();
 
//Sets brick health
for (var i = 0; i < brickClass.length; i++) {
    brickClass[i].brickHealth = 5;
}

//Update Bricks
function updateBricks(ballNumber){
    for (var i = 0; i < brickClass.length; i++) {
        var topOfBrick = brickClass[i].offsetTop + brickfield.offsetTop;
        var leftOfBrick = brickClass[i].offsetLeft;
        var rightOfBrick = leftOfBrick + brickWidth;
        var bottomOfBrick = topOfBrick + brickHeight;
        var topOfBall = ballNumber.ballPosY;
        var leftOfBall = ballNumber.ballPosX;
        var rightOfBall = leftOfBall + (ballRadius*2);
        var bottomOfBall = ballNumber.ballPosY + (ballRadius*2);
        var brickVisCount = 0;


        if((topOfBall <= bottomOfBrick && bottomOfBall >= bottomOfBrick) && brickClass[i].style.visibility != "hidden"){
            if(leftOfBrick - ballRadius <=leftOfBall && rightOfBrick + ballRadius >= rightOfBall){
                ballNumber.ballSpeedY = -ballNumber.ballSpeedY;
                brickClass[i].brickHealth = brickClass[i].brickHealth - 1;
                brickClass[i].style["background-color"] = brickColor[brickClass[i].brickHealth];
                continue;
            }
        }
        if((bottomOfBall >= topOfBrick && !(topOfBall >= topOfBrick)) && brickClass[i].style.visibility != "hidden"){
            if(leftOfBrick - ballRadius <=leftOfBall && rightOfBrick + ballRadius >= rightOfBall){
                ballNumber.ballSpeedY = -ballNumber.ballSpeedY;
                brickClass[i].brickHealth = brickClass[i].brickHealth - 1;
                brickClass[i].style["background-color"] = brickColor[brickClass[i].brickHealth];
                continue;
        }
        }
        if((leftOfBall <= rightOfBrick && rightOfBall >= rightOfBrick) && brickClass[i].style.visibility != "hidden" ){
            if(topOfBall >= (topOfBrick - ballRadius) && bottomOfBall <= (bottomOfBrick + ballRadius)){
                ballNumber.ballSpeedX = -ballNumber.ballSpeedX;
                brickClass[i].brickHealth = brickClass[i].brickHealth - 1;
                brickClass[i].style["background-color"] = brickColor[brickClass[i].brickHealth];
                continue;
            }
        }
        if((rightOfBall >= leftOfBrick && leftOfBall <= leftOfBrick) && brickClass[i].style.visibility != "hidden" ){
            if(topOfBall >= (topOfBrick - ballRadius) && bottomOfBall <= bottomOfBrick + ballRadius){
                ballNumber.ballSpeedX = -ballNumber.ballSpeedX;
                brickClass[i].brickHealth = brickClass[i].brickHealth - 1;
                brickClass[i].style["background-color"] = brickColor[brickClass[i].brickHealth];
                continue;
            }
        }
        if(brickClass[i].brickHealth == 0){
            brickClass[i].style.visibility = "hidden";
            
            
        }else if(brickClass[i].brickHealth < 0){
            brickClass[i].brickHealth = 5;
        }
    }
}

function updatePaddle(ballNumber){
    paddlePosX += paddleSpeedX/ball.length;
    //Ball-Paddle Collision
    if( ballNumber.ballPosY + (ballRadius*2) >= paddle.offsetTop && ballNumber.ballPosY <= paddle.offsetTop){
        if(ballNumber.ballPosX > paddlePosX-10 && ballNumber.ballPosX < paddlePosX + paddleWidth + 10){
            ballNumber.ballSpeedY = -ballNumber.ballSpeedY;
        }
    }
    //Border Collisions for Paddles
    if(paddlePosX >= (window.innerWidth - paddleWidth)){
        paddlePosX = window.innerWidth - paddleWidth;
    }
    else if(paddlePosX<1){
        paddlePosX = 0;
    }
    paddle.style.left  = (paddlePosX)+"px";
}

//Listens for keypresses, and adjusts paddle speed accordingly
document.addEventListener('keydown', function (e) {
    if (e.key == 'p') {            
        cloneBall(ball.length-1);
        console.log("Ninja Clone Juitsu number "+ ball.length-1);
    }
    
}, false);

document.addEventListener('keydown', function (e) {
    if(startGameBool){
        if (e.key == 'ArrowLeft') {     
            paddleSpeedX = -7; 
        }
        else if (e.key == 'ArrowRight') {
            paddleSpeedX = 7 ; 
        }
    }
    
}, false);
document.addEventListener('keyup', function (e) {
    if (e.key == 'ArrowLeft') {            
        paddleSpeedX = 0; 
    }
    else if (e.key == 'ArrowRight') {           
        paddleSpeedX = 0; 
    }
}, false);
//Update Ball
function updateBall(ballNumber){
    //Sets Ball Speed to Paddle Speed
    if(ballNumber.ballSpeedX == 0){
        ballNumber.ballSpeedX = paddleSpeedX/4;
        ballNumber.ballSpeedY = paddleSpeedX/4;

    }
    ballNumber.ballPosX += ballNumber.ballSpeedX;
    ballNumber.ballPosY += ballNumber.ballSpeedY;
    ballNumber.style.left  = (ballNumber.ballPosX)+"px";
    ballNumber.style.top  = (ballNumber.ballPosY)+"px"
}
//Ball Shadow Clone Jitsu
function cloneBall(ballNumber){
    // var ball2 = ballNumber.cloneNode(true);
    // border.appendChild(ball2);
    // ball2Number.ballSpeedX = - ballNumber.ballSpeedX;
    // ball2.ballSpeedY = - ballNumber.ballSpeedY;
    // ball2.ballPosX = ballNumber.ballPosX;
    // ball2.ballPosY = ballNumber.ballPosY;  
}

//FrameRate
window.setInterval(function show() {    
    
    Lives.innerHTML = playerLives +' Lives Left';
    for (const i of ball) {
        //Border Collisions for Ball
        if(i.ballPosX >= (window.innerWidth - (ballRadius*2))){
            i.ballSpeedX = -i.ballSpeedX;
        }
        else if(i.ballPosX <= 0){
            i.ballSpeedX = -i.ballSpeedX;
        }
        if(i.ballPosY <= 0){
            i.ballSpeedY = -i.ballSpeedY;
        }
        if(i.ballPosY >= (window.innerHeight - (ballRadius*2))){
            if(ball.length > 1){
                i.remove();
                break;
            }
            gameOverCheck(i);
        }
        updateBall(i);
        updateBricks(i);
        updatePaddle(i);
    }
    winConditionCheck();
    updatePowerUp();
    powerUpCollisionDetection();
    
}, 1000/120);


function positionPowerUp(){
    

    //Scatters the powerups randomly
    for (var i = 0; i < powerUp.children.length; i++) {
        var powerUpType = powerUp.children;
        var random = Math.floor(Math.random() * powerUp.children.length);
        chosenBrick = brickClass[Math.floor(Math.random() * brickClass.length)];
        chosenBrick.powerUp = true;
        powerUpType[i].posX = chosenBrick.offsetLeft + brickfield.offsetLeft;
        powerUpType[i].posY = chosenBrick.offsetTop + brickfield.offsetTop;
        powerUpType[i].brickNumber = chosenBrick;
        powerUp.children[i].gravity = 0;
    }
}
 
function clonePowerUp(count){
    for (let x = 0; x < 20; x++) {  //change x < 2 to number of powerups you desire
        var powerUpType = document.getElementsByClassName(count)
        var powerUpMaker = powerUpType[x];
        var powerUpBaker = powerUpMaker.cloneNode(true);
        powerUp.appendChild(powerUpBaker);
    }
}
function updatePowerUp(){
    for(var i = 0; i < powerUp.children.length; i++){
        var targetPower = powerUp.children;
        powerUp.children[i].posY += powerUp.children[i].gravity;
        targetPower[i].style.top = powerUp.children[i].posY + "px";
        targetPower[i].style.left = powerUp.children[i].posX + "px";

        if(targetPower[i].brickNumber.style.visibility == 'hidden'){
            powerUp.children[i].gravity = 1;
            console.log("You just unlocked a powerup!")
            powerUp.children[i].style.zIndex = 3;
        }

        if(powerUp.children[i].posY >= window.innerHeight){
            powerUp.children[i].remove();
        }
    }
}

function powerUpCollisionDetection(){
    for(var i = 0; i < powerUp.children.length; i++){
        var targetPower = powerUp.children;
        var bottomOfPowerUp = powerUp.children[i].posY + targetPower[i].offsetHeight;
        var leftOfPowerUp = powerUp.children[i].posX;
        var rightOfPowerUp =  leftOfPowerUp + powerUp.children[i].offsetWidth;
        //PowerUp Collision
        if( bottomOfPowerUp >= paddle.offsetTop && powerUp.children[i].posY <= paddle.offsetTop){
            if((rightOfPowerUp > paddlePosX && rightOfPowerUp < paddlePosX + paddleWidth) || 
            (leftOfPowerUp > paddlePosX && leftOfPowerUp < paddlePosX + paddleWidth)){
                switch (powerUp.children[i].className) {
                    case "multiBall":
                        cloneBall(ball.length-1);
                        console.log("Ninja Clone Juitsu number "+ ball.length-1);
                        powerUp.children[i].remove();
                        break;
                    case "extraLife":
                        playerLives += 1;
                        powerUp.children[i].remove();
                        break;

                    case "reducedHits":
                        powerUp.children[i].remove();
                        for (let brickCount = 0; brickCount < brickClass.length; brickCount++) {
                            brickClass[brickCount].brickHealth = 1;
                        }
                        break;
                    default:
                        console.log("Error: Something Something Stack Overflows");
                        break;
                }
            }
        }
    }
}