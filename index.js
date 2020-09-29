// const backgroundColor = [230,220,190];
const myCanvas = { width: 600, height: 600};
const backgroundColor = [230,220,190];
const lineColor = [0, 0, 0];
const activeLineColor = [190, 20, 110];
const lineWidth = 3;
const activelineWidth = 9;
const sounds = Array.from({ length: 4 });

const ball1 = {
    x: 300,
    y: 100,
    size: 110,
    speed: 0.5,
    fillColor: [190,80,230],
    strokeColor: [0,220,20],
    ballStrokeWeight: 2,
    
} 

const ball2 = {
    x: 300,
    y: 300,
    size: 80,
    speed: 2,
    fillColor: [190,80,230],
    strokeColor: [0,220,20],
    ballStrokeWeight: 2,

} 

const ball3 = {
    x: 300,
    y: 450,
    size: 60,
    speed: 2.7,
    fillColor: [190,80,230],
    strokeColor: [0,220,20],
    ballStrokeWeight: 2,
    /*rightSound: sounds[4],
    leftSound: sounds[5],
    soundLength: 500,*/
} 

const ball4 = {
    x: 300,
    y: 550,
    size: 50,
    speed: 3.5,
    fillColor: [190,80,230],
    strokeColor: [0,220,20],
    ballStrokeWeight: 2,
}

const leftEdge = {
    x1: 10,
    y1: 0,
    x2: 10,
    y2: 600,
    color: lineColor,
    width: lineWidth,

}

const bottomEdge = {
    x1: 10,
    y1: 10,
    x2: 570,
    y2: 10,
    color: lineColor,
    width: lineWidth,

}

const topEdge = {
    x1: 10,
    y1: 580,
    x2: 570,
    y2: 580,
    color: lineColor,
    width: lineWidth,

}

const rightEdge = {
    x1: 570,
    y1: 0,
    x2: 570,
    y2: 600,
    color: lineColor,
    width: lineWidth,
}


const balls = [ball1, ball2, ball3];//ball4



function preload(){

    sounds.forEach((sound, i) => {
        sounds[i] = loadSound(`sounds/hit${i+1}.mp3`)
    })

    console.log(sounds);

    /*ball1.rightSound = sounds[0];
    ball1.leftSound = sounds[1];
    ball2.rightSound = sounds[2];
    ball2.leftSound = sounds[3];
    ball3.rightSound = sounds[4];
    ball3.leftSound = sounds[5];*/

    // for(let i = 0; i < sounds.length; i++){
    //     sounds[i] = loadSound(`sounds/${i}.mp3`)
    // }
}

function setup(){
    createCanvas(myCanvas.width, myCanvas.height);
    background(backgroundColor);
}



function draw(){
    
    background(backgroundColor);

    balls.forEach((ball) => {
        updateBall(ball);
        displayBall(ball);
    })
  
    drawLine(leftEdge);
    drawLine(rightEdge);
  
    drawLine(topEdge);
    drawLine(bottomEdge);
}


function updateBall(ball){
    console.log(ball.x);
    if(ball.y + ball.size/2 > topEdge.y1 ){
        ball.speed *= -1;
        //ball.rightSound.play();
        activateLine(topEdge);
    } else if(ball.y - ball.size/2 < bottomEdge.y1 ){
        ball.speed *= -1;
        //ball.leftSound.play();
        activateLine(bottomEdge);
    } /*else if(ball.y - ball.size/2 < ball2.y + ball2.size/2){
      if(ball.y + ball.size/2 >= ball2.y - ball2.size/2){
        if(sign(ball1.speed) != sign(ball2.speed)){
          temp = ball2.speed;
          ball2.speed = ball.speed;
          ball.speed = temp;
        }

      }
    }*/ 
  
  balls.forEach((ball2) => {
    if(ball2 != ball){
      if(ball.y > ball2.y){ //above ball2
      if(ball.y - ball.size/2 <= ball2.y + ball2.size/2){
        /*if(sign(ball1.speed) != sign(ball2.speed)){
          temp = ball2.speed;
          ball2.speed = ball.speed;
          ball.speed = temp;
          activateLine(rightEdge);
        }*/
        temp = ball2.speed;
          ball2.speed = ball.speed;
          ball.speed = temp;
          hitSound();

      }
    } else if(ball.y < ball2.y){ //below ball2  //smaller on top
      if(ball.y + ball.size/2 >= ball2.y - ball2.size/2){
        temp = ball2.speed;
          ball2.speed = ball.speed;
          ball.speed = temp;
          hitSound();
      }
    }
    }
  })
  
  
    ball.y+= ball.speed;
}

function sign(speed){
 if(speed>0){
   return 1;
 } else {
   return 0;
 }
}

function hitSound(){
  sounds[Math.floor(Math.random() * sounds.length)].play();
}

const displayBall = ({x, y, size, strokeColor, fillColor, ballStrokeWeight}) => {
        stroke(strokeColor);
        fill(fillColor);
        strokeWeight(ballStrokeWeight);
        ellipse(x, y, size);
}

function drawLine({x1, y1, x2, y2, color, width}){
    stroke(color);
    strokeWeight(width);
    line(x1, y1, x2, y2);
}



function activateLine(line){

    line.color = activeLineColor;
    line.width = activelineWidth;

    setTimeout(() => resetLines(line), 500);
}


function resetLines(line){
    line.color = lineColor;
    line.width = lineWidth;
}