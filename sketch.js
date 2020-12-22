var trex, trex_running, trex_collided,trex1;
var ground, invisibleGround, groundImage;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score;
var PLAY = 1,
    END = 0;
var gameState = PLAY;
var gameOver, gameOverImage;
var restart, restartImage;
var backgroundImg;


function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png");

  cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  gameOverImage = loadImage("gameOver.png");

  restartImage = loadImage("restart.png");

  //backgroundImg = loadImage("backgoundImg.jpg");


}

function setup() {
 var canvas = createCanvas(displayWidth-20,displayHeight-30);

  trex = createSprite(displayWidth-displayWidth/4, displayHeight-displayHeight/6, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;

  ground = createSprite(displayWidth-displayWidth/8,  displayHeight-displayHeight/8, 400, 20);
  ground.addImage("ground", groundImage);
  ground.velocityX = -4;

  invisibleGround = createSprite(displayWidth-displayWidth/8, displayHeight-displayHeight/8, 400, 10);
  invisibleGround.visible = false;

  gameOver = createSprite(displayWidth-displayWidth/2, displayHeight-displayHeight/2);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  restart = createSprite(displayWidth-displayWidth/2, displayHeight-displayHeight/2.5);
  restart.addImage(restartImage);
  restart.scale = 0.5;
  restart.visible = false;

  cloudsGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
}

function draw() {
  
    background("black");

  textSize(20);
  text("Score: " + score, displayWidth-displayWidth/9,displayHeight-displayHeight/2);


  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate() / 60);

    if (keyDown("space")) {
      trex.velocityY = -10;
    }

    trex.velocityY = trex.velocityY + 0.8;

    if (ground.x < 0) {
      ground.x = displayWidth-displayWidth/8 / 2;
    }

    spawnClouds();
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
      
    }
  }
  
else if(gameState===END){
  gameOver.visible = true;
  restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
 
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  var xPos = 0;
  var yPos = 0;
  //var index = 0;

      for(var plr in trex1){
       index = index+1;
       xPos = xPos+200;
       yPos = displayHeight;
       trex.x = xPos;
       trex.y = yPos;
       
      
      camera.position.x = displayWidth/2;
      camera.position.y = trex(index-1).y;

       
      }

    trex.collide(invisibleGround);

  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  
  if (frameCount % 60 === 0) {
    var cloud = createSprite(displayWidth-displayWidth/8,displayHeight-displayHeight/3, 40, 10);
    //var cloudy = Math.round(random(displayHeight-displayHeight/3, displayHeight-displayHeight/6));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    //add each cloud to the group
    cloudsGroup.add(cloud);
  }

}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(displayWidth-displayWidth/8, displayHeight-displayHeight/6.5, 10, 40);
    obstacle.velocityX = -4;

    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.addImage(obstacle5);
        break;
      case 6:
        obstacle.addImage(obstacle6);
        break;
      default:
        break;
    }

    //assign scale          
    obstacle.scale = 0.5;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;

  ground.velocityX = -4;

  if (ground.x < 0) {
    ground.x = displayWidth-displayWidth/8 / 2;
  }
  
}