// const backgroundColor = [230,220,190];
const myCanvas = { width: 585, height: 595};
const backgroundColor = [0, 177, 86];
const lineColor = [0, 0, 0];
const activeLineColor = [190, 20, 110];
const lineWidth = 5;
const activelineWidth = 9;
const sounds = Array.from({ length: 4 });

const ball1 = {
    x: 300,
    y: 100,
    size: 110,
    speed: 0.5,
    fillColor: [40, 89, 198],
    strokeColor: [230,230,255],
    ballStrokeWeight: 5,
} 

const ball2 = {
    x: 300,
    y: 300,
    size: 80,
    speed: 2,
    fillColor: [190,30,80],
    strokeColor: [255,230,230],
    ballStrokeWeight: 5,
} 

const ball3 = {
    x: 300,
    y: 450,
    size: 60,
    speed: 2.7,
    fillColor: [190,80,230],
    strokeColor: [255,230,255],
    ballStrokeWeight: 5,
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
    y1: 10,
    x2: 10,
    y2: 580,
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
    y1: 10,
    x2: 570,
    y2: 580,
    color: lineColor,
    width: lineWidth,
}


const balls = [ball1, ball2, ball3];//ball4



function preload(){

    sounds.forEach((sound, i) => {
        sounds[i] = loadSound(`sounds/hit${i+1}.mp3`)
    })

    console.log(sounds);

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
    }
  balls.forEach((ball2) => {
    if(ball2 != ball){
      if(ball.y > ball2.y){ //above ball2
      if(ball.y - ball.size/2 <= ball2.y + ball2.size/2){
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