var doreamon ;
var ground;
var gameState="play";
var rand = 0;
var backgroundimage;
var coronavirusimage;
var sanitizerimage;
var obstacleGroup,sanitizerGroup;


function preload(){
backgroundimage=loadImage("background.jpg");
coronavirusimage=loadImage("coronavirus.png");
sanitizerimage=loadImage("sanitizer.png");
}

function setup(){
createCanvas(windowWidth-20,windowHeight-30)
doreamon = createSprite(100,windowHeight-100,10,10);
ground = createSprite(windowWidth/2,windowHeight-70,windowWidth,10);
ground.visibility=false;
obstacleGroup=createGroup();
sanitizerGroup=createGroup();
}

function draw(){
background(backgroundimage);

if(gameState === "play"){
   
    doreamon.velocityX = 3;
    
    camera.position.x=doreamon.x;
camera.position.y=windowHeight/2;
    
    //if (ground.x < 0){
      //ground.x = ground.width/2;
    //}
    
    

    if(keyDown("space") ){
      doreamon.velocityY = -10 ;
    }
  
    
    doreamon.velocityY = doreamon.velocityY + 0.8;
    
    
    sanitizer();
  
    obstacle();
    
    if(sanitizerGroup.isTouching(doreamon)){
      sanitizerGroup.destroyEach();
    
      for(var i=0;i<5;i++){
   if(obstacleGroup.isTouching(doreamon)){
      obstacleGroup.destroyEach();
   }
  }
  }

    if(obstacleGroup.isTouching(doreamon)){
      gameState = "end";
      
    }
  }
  
  
  else if(gameState === "end") {
    ground.velocityX = 0;
    doreamon.velocityY=0;
    obstacleGroup.setVelocityXEach(0);
    sanitizerGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    sanitizerGroup.setLifetimeEach(-1);
    
  }
doreamon.collide(ground);
console.log(doreamon.distance);

drawSprites();
}

function obstacle(){
    if(World.frameCount % 60 === 0) {
       var Obstacle= createSprite(400,365,10,40);
       Obstacle.addImage(coronavirusimage);
        Obstacle.velocityX = -6;        
        Obstacle.scale = 0.09;
        Obstacle.lifetime = 70;
        obstacleGroup.add(Obstacle)
    }
}


function sanitizer(){
    if(World.frameCount % 80 === 0) {
           var Sanitizer = createSprite(400,365,10,40);
           Sanitizer.addImage(sanitizerimage);
           Sanitizer.velocityX = -6;         
           Sanitizer.scale = 0.5;
           Sanitizer.lifetime = 70;
           sanitizerGroup.add(Sanitizer);
       }
    
}