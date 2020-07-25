var paddleHeight = 15;
var paddleWidth = 200;
var paddleSpeedX = 0;
var paddlePosX = (window.innerWidth/2)-(paddleWidth/2);  //Middle of the screen

var ballSpeedX = 0;
var ballSpeedY = 0;
var ballRadius = 15;
var ballPosX = (window.innerWidth/2)-15; //Middle of the screen
var ballPosY = 600-paddleHeight-ballRadius-2;

var brickWidth = 163;
var brickHeight = 30;
var brickPosX = 40;
var brickPosY = 10;
var brickColor = ['FireBrick',"lightskyblue", "PaleGreen", "PaleGoldenRod", "Orange"];

var playerLives = 2;
var playerScore = 0;
var wins = 0;
var debug = 0;

gos.style.top = ((window.innerHeight/2)-(160/2))+"px"
gos.style.right  = ((window.innerWidth/2)-(115/2))+"px";

var gameOverBool = false;

function winConditionCheck(){
    var brickVisCount = 0;
    for (let i = 0; i < document.getElementsByClassName("brick").length; i++) {
        if(document.getElementsByClassName("brick")[i].style.visibility == 'hidden'){
            brickVisCount++;
            playerScore = brickVisCount*2;
            Score.innerHTML = "Score: " + playerScore;

            if(brickVisCount == document.getElementsByClassName("brick").length){
                ballSpeedX = 0;
                ballSpeedY = 0;
                ballPosX = (window.innerWidth/2)-15; //Middle of the screen
                ballPosY = 600-paddleHeight-ballRadius-2;
                for (let i = 0; i < document.getElementsByClassName("brick").length; i++){
                    document.getElementsByClassName("brick")[i].style.visibility = 'visible';
                }
                wins = 1;
                Wins.innerHTML = "Wins: " + wins;
                brickVisCount = 0;
                break;
            }
        }
        
    }
}
function gameOverCheck(){
    ballSpeedX = 0;
    ballSpeedY = 0;


    if(playerLives == 0){
        Lives.innerHTML = playerLives+' Lives Left';
        gos.style.display = "inline";
        ball.style.display = "none";
    }else{
        ballPosX = (window.innerWidth/2)-15; //Middle of the screen
        ballPosY = 600-paddleHeight-ballRadius-2;
        Lives.innerHTML = playerLives+' Lives Left';
        playerLives -= 1;
        paddlePosX = (window.innerWidth/2)-(paddleWidth/2);
        
}
}

function createBrickField(){
    for (let i = 0; i < 23; i++) {
        var brickMaker = document.getElementsByClassName("brick")[i];
        var brickBaker = brickMaker.cloneNode(true);
        brickfield.appendChild(brickBaker);
        console.log("Brick is Fresh and Ready Out the oven.")
    }
}
createBrickField();

document.addEventListener('keydown', function (e) {
    if (e.keyCode == '37') {      // left arrow
        paddleSpeedX = -7; 
    }
    else if (e.keyCode == '39') { // right arrow
        paddleSpeedX = 7 ; 
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

window.setInterval(function show() {    
    paddlePosX += paddleSpeedX;
    
    //Ball Physics
    if(ballSpeedX == 0){
        ballSpeedX = paddleSpeedX;
        ballSpeedY = paddleSpeedX; //ball speed

    }
    ballPosX += ballSpeedX;
    ballPosY += ballSpeedY;

    //Border Collisions for Ball
    if(ballPosX >= (window.innerWidth - (ballRadius*2))){
        ballSpeedX = -ballSpeedX;
    }
    else if(ballPosX <= 0){
        ballSpeedX = -ballSpeedX;
    }
    for (var i = 0; i < 24; i++) {
        var topOfBrick = document.getElementsByClassName("brick")[i].offsetTop + 100;
        var leftOfBrick = document.getElementsByClassName("brick")[i].offsetLeft;
        var rightOfBrick = leftOfBrick + brickWidth;
        var bottomOfBrick = topOfBrick + brickHeight;
        var topOfBall = ballPosY;
        var leftOfBall = ballPosX;
        var rightOfBall = leftOfBall + (ballRadius*2);
        var bottomOfBall = ballPosY + (ballRadius*2);
        var brickVisCount = 0;


        if((topOfBall <= bottomOfBrick && bottomOfBall >= bottomOfBrick) && document.getElementsByClassName("brick")[i].style.visibility != "hidden"){
            if(leftOfBrick - 15 <=leftOfBall && rightOfBrick + 15 >= rightOfBall){
                    ballSpeedY = -ballSpeedY;
                    document.getElementsByClassName("brick")[i].brickHealth = document.getElementsByClassName("brick")[i].brickHealth - 1;
                    document.getElementsByClassName("brick")[i].style["background-color"] = brickColor[document.getElementsByClassName("brick")[i].brickHealth];
                    //console.log("Brick Number "+i+" has been hit once.");
                    continue;
            }
        }
        else if((bottomOfBall >= topOfBrick && !(topOfBall >= topOfBrick)) && document.getElementsByClassName("brick")[i].style.visibility != "hidden"){
            if(leftOfBrick - 15 <=leftOfBall && rightOfBrick + 15 >= rightOfBall){
                ballSpeedY = -ballSpeedY;
                document.getElementsByClassName("brick")[i].brickHealth = document.getElementsByClassName("brick")[i].brickHealth - 1;
                document.getElementsByClassName("brick")[i].style["background-color"] = brickColor[document.getElementsByClassName("brick")[i].brickHealth];
                //console.log("Brick Number "+ i +" has been deleted.");
                continue;
        }
        }
        if((rightOfBall >= leftOfBrick && leftOfBall <= leftOfBrick) && document.getElementsByClassName("brick")[i].style.visibility != "hidden" ){
            if(topOfBall >= topOfBrick && bottomOfBall <= bottomOfBrick){
                ballSpeedX = -ballSpeedX;
                //document.getElementsByClassName("brick")[i].brickHealth = document.getElementsByClassName("brick")[i].brickHealth - 1;
                //document.getElementsByClassName("brick")[i].style["background-color"] = brickColor[document.getElementsByClassName("brick")[i].brickHealth];
                //console.log("Brick Number "+ i +" has been deleted.");
                continue;
            }
        }
        if(document.getElementsByClassName("brick")[i].brickHealth == 0){
            document.getElementsByClassName("brick")[i].style.visibility = "hidden";
            
            
        }else if(document.getElementsByClassName("brick")[i].brickHealth < 0){
            document.getElementsByClassName("brick")[i].brickHealth = 0;
        }
    }
    if(ballPosY <= 0){
        ballSpeedY = -ballSpeedY;
    }
    else if(ballPosY >= 640){
        gameOverCheck();
        console.log("You lost a life!");
    }
    //Ball-Paddle Collision
    else if(ballPosY>= 600-paddleHeight-ballRadius){
        if(ballPosX > paddlePosX-10 && ballPosX < paddlePosX + paddleWidth + 10){
            ballSpeedY = -ballSpeedY;
        }
    }

    //Border Collisions for Paddles
    if(paddlePosX >= (window.innerWidth - paddleWidth)){
        paddlePosX = window.innerWidth - paddleWidth;
    }
    else if(paddlePosX<1){
        paddlePosX = 0;
    }





    ball.style.left  = (ballPosX)+"px";
    ball.style.top  = (ballPosY)+"px"
    paddle.style.left  = (paddlePosX)+"px";
    winConditionCheck();
}, 1000/60);


for (var i = 0; i < 24; i++) {
    document.getElementsByClassName("brick")[i].brickHealth = 1;
}