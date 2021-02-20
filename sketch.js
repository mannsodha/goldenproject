var doreamon ;
var ground;
var gameState="play";
var rand = 0;
var backgroundimage;
var coronavirusimage;
var sanitizerimage;
var doctorimage;
var obstacleGroup,sanitizerGroup;
var distance = 0;
var doctor;


function preload(){
backgroundimage=loadImage("background.jpg");
coronavirusimage=loadImage("coronavirus.png");
sanitizerimage=loadImage("sanitizer.png");
doctorimage=loadImage("doctor.png");
doreamonAnimation=loadAnimation("image 1.png,image 2.png,image 3.png,image 4.png,image 5.png,image 6.png")
}

function setup(){
createCanvas(windowWidth-20,windowHeight-30)
doreamon = createSprite(100,height-100,10,10);
doreamon.addAnimation("running",doramonAnimation);
ground = createSprite(0,height-100,width*4,10);
ground.visibility=false;
obstacleGroup=createGroup();
sanitizerGroup=createGroup();

}

function draw(){
background(0);

if(gameState === "play"){
   
  if(keyIsDown(LEFT_ARROW))  
    {
      doreamon.x=doreamon.x+5;
      distance++
    }
    if(keyIsDown(RIGHT_ARROW))  
    {
      doreamon.x=doreamon.x-5;
      distance--
    }
    camera.position.x=doreamon.x;
camera.position.y=windowHeight/2;
    
    //if (ground.x < 0){
      //ground.x = ground.width/2;
    //}

    if(distance>=1000){
      doctor=createSprite(doreamon.x+250,doreamon.y-30);
    doctor.addImage(doctorimage);  
    doctor.sclae=0.5; 
    }
    
    

    if(keyDown("space") ){
      doreamon.velocityY = -10 ;
    }
  
    
    doreamon.velocityY = doreamon.velocityY + 0.8;
    
    
    sanitizer();
  
    obstacle();
    
    if(sanitizerGroup.isTouching(doreamon)){
      sanitizerGroup.destroyEach();
    
      
   if(obstacleGroup.isTouching(doreamon)){
      obstacleGroup.destroyEach();
   }
  
  }

    if(obstacleGroup.isTouching(doreamon)){
      gameState = "end";
      
    }
  }
  
  
 if(gameState === "end") {
    ground.velocityX = 0;
    doreamon.velocityY=0;
    obstacleGroup.setVelocityXEach(0);
    sanitizerGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    sanitizerGroup.setLifetimeEach(-1);
    
  }
doreamon.collide(ground);
console.log(distance);

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