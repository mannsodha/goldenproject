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
var m=120;
var turn =3;

function preload(){
backgroundimage=loadImage("bg1.png");
coronavirusimage=loadImage("coronavirus.png");
sanitizerimage=loadImage("sanitizer.png");
//doctorimage=loadImage("doctor.png");
doreamonAnimation=loadAnimation("images 5.png","image2.png","images 4.png")
doreamon_standingImg=loadAnimation("images 5.png")
restartImg=loadImage("restart.png")
}

function setup(){
createCanvas(windowWidth-20,windowHeight-30)
doreamon = createSprite(100,height-50,10,10);
doreamon.addAnimation("standing",doreamon_standingImg);
doreamon.addAnimation("running",doreamonAnimation);
ground = createSprite(0,height-50,width*4,10);
ground.visible=false;
obstacleGroup=createGroup();
sanitizerGroup=createGroup();
restart=createSprite(width/2,height/2)
  restart.addImage(restartImg)
  restart.visible=false
  

}

function draw(){
background(backgroundimage);

if(gameState === "play"){
   if (frameCount % round(frameRate()) === 0 && m > -1) {
    
        m --;
       
      }
      camera.position.x=doreamon.x+350;
      camera.position.y=windowHeight/2;
      ground.x=doreamon.x
      doreamon.collide(ground);
      console.log(distance);
      if(keyIsDown(LEFT_ARROW))  
        {
          doreamon.x=doreamon.x-5;
          distance++
          doreamon.changeAnimation("running",doreamonAnimation);
        }
        else{
          doreamon.changeAnimation("standing",doreamon_standingImg);
        }
      if(keyIsDown(RIGHT_ARROW))  
      {
      doreamon.x=doreamon.x+5;
      distance--
      doreamon.changeAnimation("running",doreamonAnimation);
     }
     else{
      doreamon.changeAnimation("standing",doreamon_standingImg);
     }
    
     if(keyDown("space") )
     {
      doreamon.velocityY = -10 ;
     }
     doreamon.velocityY = doreamon.velocityY + 0.8;
    
    
    var r =Math.round(random(1,2))
      if(frameCount%80===0)
      {
        if(r===1)
        sanitizer();
        else
        obstacle();
      }
      
    
    if(sanitizerGroup.isTouching(doreamon)){
      sanitizerGroup.destroyEach();
    }      
   if(obstacleGroup.isTouching(doreamon)){
      obstacleGroup.destroyEach();
      gameState = "end";
      turn=turn-1
      fill("black")
      textSize(30)
      text("GAME OVER",doreamon.x-100,height-200);
      restart.x=doreamon.x
      restart.visible=true
    }
  
  if(distance>=1000)
    {
      doctor=createSprite(doreamon.x+250,doreamon.y-30);
     // doctor.addImage(doctorimage);  
      doctor.sclae=0.5; 
      fill("black")
      textSize(30)
      text("You Are Immunized Now",doctor.x-100,height-50);
    }
  
    if(turn===0)
    {
      gameState="end"
      fill("black")
      textSize(15)
      text("GAME OVER!!!",doreamon.x-100,height-200);
      text("BETTER LUCK NEXT TIME!!!",doreamon.x-100,height-250);
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
  if(mousePressedOver(restart))
  {
    reset();
  }


drawSprites();
fill("black")
  textSize(20)
  text("Turns: "+turn,doreamon.x-180,50)
  text("Time: "+m,doreamon.x-300,50)
}
function reset()
{
  gameState="play";
  doreamon.changeAnimation("standing",doreamon_standingImg);
  restart.visible=false
  totalCoins=0
 
  m=120
}

function obstacle(){
    
       var Obstacle= createSprite(doreamon.x+400,height-240,10,40);
       Obstacle.addImage(coronavirusimage);
       
        Obstacle.scale = 0.09;
        Obstacle.lifetime = 100;
        obstacleGroup.add(Obstacle)
    
}


function sanitizer(){
    
           var Sanitizer = createSprite(doreamon.x+200,height-210,10,40);
           Sanitizer.addImage(sanitizerimage);
           Sanitizer.scale = 0.1;
           Sanitizer.lifetime = 100;
           sanitizerGroup.add(Sanitizer);
       
    
}
