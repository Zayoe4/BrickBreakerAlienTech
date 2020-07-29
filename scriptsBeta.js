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

var playerLives = 2;
var playerScore = 0;
var wins = 0;
var debug = 0;

gos.style.top = ((window.innerHeight/2)-(160/2))+"px"
gos.style.right  = ((window.innerWidth/2)-(115/2))+"px";

var gameOverBool = false;
var startGameBool = false;
document.addEventListener('keydown', function (e) {
    if (e.keyCode == '39' || e.keyCode == '37' ) {
        startGameBool = true;
        start.style.visibility = 'hidden';
        border.style.visibility = 'visible';
        console.log("The Game has Started!")
    }
}, false);

// Game Countdown to Start
function startCountdown(){
    for (let i = 3; i > 0; i--) {
        const element = array[i];
        
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
    ball[ballNumber].ballSpeedX = 0;
    ball[ballNumber].ballSpeedY = 0;


    if(playerLives == 0){
        Lives.innerHTML = playerLives+' Lives Left';
        gos.style.display = "inline";
        ball[ballNumber].style.visibility = "hidden";
    }else{
        ball[ballNumber].ballPosX = (window.innerWidth/2) - ballRadius; //Middle of the screen
        ball[ballNumber].ballPosY = paddle.offsetTop - (ballRadius*2) -2;
        Lives.innerHTML = playerLives+' Lives Left';
        playerLives -= 1;
        paddlePosX = (window.innerWidth/2)-(paddleWidth/2);
        
}
}

//Creates the brick field
function createBrickField(){
    for (let i = 0; i < 99; i++) {
        var brickMaker = brickClass[i];
        var brickBaker = brickMaker.cloneNode(true);
        brickfield.appendChild(brickBaker);
        console.log("Brick is Fresh and Ready Out the oven.")
    }
}
createBrickField(); 
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
        var topOfBall = ball[ballNumber].ballPosY;
        var leftOfBall = ball[ballNumber].ballPosX;
        var rightOfBall = leftOfBall + (ballRadius*2);
        var bottomOfBall = ball[ballNumber].ballPosY + (ballRadius*2);
        var brickVisCount = 0;


        if((topOfBall <= bottomOfBrick && bottomOfBall >= bottomOfBrick) && brickClass[i].style.visibility != "hidden"){
            if(leftOfBrick - ballRadius <=leftOfBall && rightOfBrick + ballRadius >= rightOfBall){
                ball[ballNumber].ballSpeedY = -ball[ballNumber].ballSpeedY;
                brickClass[i].brickHealth = brickClass[i].brickHealth - 1;
                brickClass[i].style["background-color"] = brickColor[brickClass[i].brickHealth];
                //console.log("Brick Number "+i+" has been hit once.");
                continue;
            }
        }
        if((bottomOfBall >= topOfBrick && !(topOfBall >= topOfBrick)) && brickClass[i].style.visibility != "hidden"){
            if(leftOfBrick - ballRadius <=leftOfBall && rightOfBrick + ballRadius >= rightOfBall){
                ball[ballNumber].ballSpeedY = -ball[ballNumber].ballSpeedY;
                brickClass[i].brickHealth = brickClass[i].brickHealth - 1;
                brickClass[i].style["background-color"] = brickColor[brickClass[i].brickHealth];
                //console.log("Brick Number "+ i +" has been deleted.");
                continue;
        }
        }
        if((leftOfBall <= rightOfBrick && rightOfBall >= rightOfBrick) && brickClass[i].style.visibility != "hidden" ){
            if(topOfBall >= (topOfBrick - ballRadius) && bottomOfBall <= (bottomOfBrick + ballRadius)){
                ball[ballNumber].ballSpeedX = -ball[ballNumber].ballSpeedX;
                brickClass[i].brickHealth = brickClass[i].brickHealth - 1;
                brickClass[i].style["background-color"] = brickColor[brickClass[i].brickHealth];
                console.log("The left side of the ball hit the right side of brick #"+ i +".");
                continue;
            }
        }
        if((rightOfBall >= leftOfBrick && leftOfBall <= leftOfBrick) && brickClass[i].style.visibility != "hidden" ){
            if(topOfBall >= (topOfBrick - ballRadius) && bottomOfBall <= bottomOfBrick + ballRadius){
                ball[ballNumber].ballSpeedX = -ball[ballNumber].ballSpeedX;
                brickClass[i].brickHealth = brickClass[i].brickHealth - 1;
                brickClass[i].style["background-color"] = brickColor[brickClass[i].brickHealth];
                console.log("The right  lol side of the ball hit the left side of brick #"+ i +".");
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
    if( ball[ballNumber].ballPosY + (ballRadius*2) >= paddle.offsetTop && ball[ballNumber].ballPosY <= paddle.offsetTop){
        if(ball[ballNumber].ballPosX > paddlePosX-10 && ball[ballNumber].ballPosX < paddlePosX + paddleWidth + 10){
            ball[ballNumber].ballSpeedY = -ball[ballNumber].ballSpeedY;
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
    if (e.keyCode == '80') {            
        cloneBall(ball.length-1);
        console.log("Ninja Clone Juitsu number "+ ball.length-1);
    }
    
}, false);

document.addEventListener('keydown', function (e) {
    if(startGameBool){
        if (e.keyCode == '37') {      // left arrow
            paddleSpeedX = -14; 
        }
        else if (e.keyCode == '39') { // right arrow
            paddleSpeedX = 14 ; 
        }
    }
    
}, false);
document.addEventListener('keyup', function (e) {
    if (e.keyCode == '37') {            
        paddleSpeedX = 0; 
    }
    else if (e.keyCode == '39') {           
        paddleSpeedX = 0; 
    }
}, false);
//Update Ball
function updateBall(ballNumber){
    //Sets Ball Speed to Paddle Speed
    if(ball[ballNumber].ballSpeedX == 0){
        ball[ballNumber].ballSpeedX = paddleSpeedX/2;
        ball[ballNumber].ballSpeedY = paddleSpeedX/2;

    }
    ball[ballNumber].ballPosX += ball[ballNumber].ballSpeedX;
    ball[ballNumber].ballPosY += ball[ballNumber].ballSpeedY;
    ball[ballNumber].style.left  = (ball[ballNumber].ballPosX)+"px";
    ball[ballNumber].style.top  = (ball[ballNumber].ballPosY)+"px"
}
//Ball Shadow Clone Jitsu
function cloneBall(ballNumber){
    var ball2 = ball[ballNumber].cloneNode(true);
    border.appendChild(ball2);
    ball[ballNumber+1].ballSpeedX = - ball[ballNumber].ballSpeedX;
    ball[ballNumber+1].ballSpeedY = - ball[ballNumber].ballSpeedY;
    ball[ballNumber+1].ballPosX = ball[ballNumber].ballPosX;
    ball[ballNumber+1].ballPosY = ball[ballNumber].ballPosY;
}

//FrameRate
window.setInterval(function show() {    
    
    
    for (let i = 0; i < ball.length; i++) {
        //Border Collisions for Ball
        if(ball[i].ballPosX >= (window.innerWidth - (ballRadius*2))){
            ball[i].ballSpeedX = -ball[i].ballSpeedX;
        }
        else if(ball[i].ballPosX <= 0){
            ball[i].ballSpeedX = -ball[i].ballSpeedX;
        }
        if(ball[i].ballPosY <= 0){
            ball[i].ballSpeedY = -ball[i].ballSpeedY;
        }
        if(ball[i].ballPosY >= (window.innerHeight - (ballRadius*2))){
            if(ball.length > 1){
                ball[i].remove();
                break;
            }
            gameOverCheck(i);
            console.log("You lost as life!");``
        }
        updateBall(i);
        updateBricks(i);
        updatePaddle(i);
        winConditionCheck(i);
        
    }
    
}, 1000/60);


