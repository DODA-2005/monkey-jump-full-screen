
var monkey, monkey_running
var bananaImage, obstacleImage
var bananasGroup, obstacleGroup
var score, GO, bgS
var ground, iGround
var obstacle, banana

function preload(){
  
  
  monkey_running =   loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  jImg=loadImage("jungle.jpg")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  jumpSound = loadSound("95557__robinhood76__01662-cartoon-jump.wav")
  dieSound = loadSound("421876__sventhors__ouch-2.wav")
  bananaSound = loadSound("345086__metrostock99__oh-yeah-low-4.wav")
  bgS=loadSound("bg.mp3")
 
  
  winImage=loadImage("172-1725252_transparent-you-win-png-transparent-you-win-text.png")
}



function setup() {
  createCanvas(displayWidth-20, displayHeight-140);
  
  bgS.loop();
  
  //creating background
  background=createSprite(290,200,400,400);
  background.addImage(jImg);
  background.scale=1;
  
  GO=createSprite(200,200,400,400);
  GO.visible=false;
  
  //creating monkey;
  monkey=createSprite(80,315,20,20)
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  //creating invisible ground;
  iGround=createSprite(300,350,900,10);
  iGround.visible=false;
  
  
  console.log(monkey.x)
  
 
  
  //creating survival time;
  var survivalTime=0;
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  
  
  //create Obstacle and Cloud Groups
  bananasGroup = createGroup();
  obsGroup = createGroup();
  
  score=0;
}


function draw() {
  
  
  // moving ground
    background.velocityX = -3 

    if (background.x < 0){
      background.x = background.width/2;
    }
  
  stroke=("green");
  textSize(20);
  fill("green");
  text("score = "+score,140,80 )
  text.depth=+4;
  
  stroke=("black")
  textSize(20);
  fill("orange");
  survivalTime=Math.ceil(frameCount/3.5);
  text("survival Time = "+survivalTime,100,50);
  text.depth=+4;
  
  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8
  
  //spawn the clouds
  sBananas();
  
  //spawn obstacles on the ground
  sObstacles();
  
  
  
  
  if(keyDown("space")&& monkey.y >= 300) {
        monkey.velocityY = -15;
        jumpSound.play();
    }
  
  monkey.collide(iGround);
  
    if(score>=10) {
        monkey.destroy();
        bananasGroup.destroyEach();
        obsGroup.destroyEach();
        
        GO.visible=true
        GO.addImage(winImage);
        GO.x=200;
        GO.y=200;
        GO.scale=0.51;
        background.scale=0.0001;
    }
  
  
 
  
  
  //making 
  function sObstacles(){
   if (frameCount % 165 === 0){
     obstacle = createSprite(400,330,10,40);
     obstacle.addImage(obstacleImage);
     obstacle.velocityX = -(3 + 3* survivalTime/100)
     obstacle.scale=0.1
     obsGroup.add(obstacle);
   }
  }
  
  function sBananas() {
  if (World.frameCount % 120 == 0) {
    banana =         createSprite(400,Math.round(random(300, 190)), 10, 10);
    banana.addImage(bananaImage);
    banana.velocityX = -(4 + 3* survivalTime/100)
    banana.lifetime = 200;
    banana.scale = 0.1;
    bananasGroup.add(banana);
  }}
  
  
if(monkey.isTouching(bananasGroup)){
    score=score+1;
    monkey.scale=+0.1
    bananaSound.play();
    bananasGroup.destroyEach();
  }
  
  if(monkey.isTouching(obsGroup)&monkey.scale>0.1){
    score=score-1;
    monkey.scale=monkey.scale-0.05;
    dieSound.play();
    obstacle.destroy();
  }
  
  switch(score){
    case 1:monkey.scale=0.11
        break;
    case 2:monkey.scale=0.115
        break;
    case 3:monkey.scale=0.12
        break;
    case 4:monkey.scale=0.125
        break;
    case 5:monkey.scale=0.13
        break;
    case 6:monkey.scale=0.135
        break;
    case 7:monkey.scale=0.14
        break;
    case 8:monkey.scale=0.14  
        break;
    case 9:monkey.scale=0.145
        break;
        default:break;
    
  }
    
  drawSprites();

}