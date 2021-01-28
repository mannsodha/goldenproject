var doreamon ;
var sanitizer,obstacle;
var doctor;
var ground;
var gameState=play;
var rand = 0;
var backgroundimage;
var coronavirusimage;
var sanitizerimage;

function preload(){
backgroundimage=loadImage("background.jpg");
coronavirusimage=loadImage("coronavirus.png");
sanitizerimage=loadImage("sanitizer.png");
}

function setup(){
createCanvas(windowWidth-20,windowHeight-30)
doreamon = createSprites(100,windowHeight-100,10,10);
ground = createSprite(windowWidth/2,windowHeight-70,windowWidth,10);
ground.visibility=false;

}

function draw(){
background("backgroundimage");

if(gameState === PLAY){
   
    ground.velocityX = -6;
    
    camera.position.x=doreamon.x;
camera.position.y=windowHeight/2;
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    

    if(keyDown("space") && doreamon.y >= 359){
      doreamon.velocityY = -10 ;
    }
  
    
    doreamon.velocityY = doreamon.velocityY + 0.8;
    
    
    sanitizer();
  
    obstacles();
    
    if(ObstaclesGroup.isTouching(doreamon)){
      gameState = END;
      
    }
  }
  
  
  else if(gameState === END) {
    ground.velocityX = 0;
    doreamon.velocityY=0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
  }
drawSprites();
}

function obstacles(){
    if(World.frameCount % 60 === 0) {
     obstacle = createSprite(400,365,10,40);
        obstacle.velocityX = -6;        
        obstacle.scale = 0.5;
        obstacle.lifetime = 70;
    }
}


function sanitizer(){
    if(World.frameCount % 60 === 0) {
        sanitizer = createSprite(400,365,10,40);
           sanitizer.velocityX = -6;         
           sanitizer.scale = 0.5;
           sanitizer.lifetime = 70;
       }

}