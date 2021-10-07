var flyingdino
var duck 
var Sound1 
var Sound2
var Sound3
var GameOver
var Restart
var GameOverimage
var Restartimage
var DeadTrex
var score = 0;
var gameState = "lifeblock";
var cloudGroup;
var cactusGroup;
var cloud,cloudImage
var cactus,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
function preload() {
flyingdino = loadAnimation("turtle3.png", "turtle4.png");
duck = loadAnimation("clearduck2.png", "clearduck1.png");
Sound1 = loadSound("checkpoint.mp3");
Sound2 = loadSound("die.mp3");
Sound3 = loadSound("jump.mp3");
GameOverimage = loadImage("gameOver.png");
Restartimage = loadImage("restart.png");
DeadTrex = loadAnimation("trex_collided.png");
trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
trex_collided = loadImage("trex_collided.png");
groundImage = loadImage("ground2.png");
cloudImage = loadImage("cloud.png");
obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage("obstacle4.png");
obstacle5 = loadImage("obstacle3.png");
obstacle6 = loadImage("obstacle6.png");
}
function setup() {
createCanvas(600, 200);
//create a trex sprite
trex = createSprite(50,190,20,50);
trex.addAnimation("running", trex_running);
trex.addAnimation("Dead", DeadTrex)
trex.addAnimation("clearduck", duck);
trex.scale = 0.5;
//making the collision radius visible
//trex.debug = true
//changing the shape and size of the colision radius for trex
trex.setCollider("circle",0,0,50)
//create a ground sprite
ground = createSprite(200,180,400,20);
ground.addImage("ground",groundImage);
ground.x = ground.width /2;
//creating a fake ground
invisibleGround = createSprite(50,190,50,10)
invisibleGround.visible = false
//creating the cloud and cactus group
cloudGroup = createGroup();
//creating flyingdino group
dino = createGroup();
cactusGroup = new Group();
//creating the restart and Game Over icons
GameOver = createSprite(300,100)
GameOver.addImage(GameOverimage)
GameOver.scale = 0.5
Restart = createSprite(300,150);
Restart.addImage(Restartimage)
Restart.scale = 0.5
}
function draw() {
background("steelblue");
fill("red");
//displaying the score
text("Score: "+ score,450,50);
if (gameState == "lifeblock") {
//making the restart and game over icons invisible
Restart.visible = false
GameOver.visible = false
//Making the ground and cactus same speed
//making duck trex
if (keyWentDown (DOWN_ARROW)) {
trex.changeAnimation("clearduck");
}
//making trex come back to normal
if(keyWentUp(DOWN_ARROW)) {
trex.changeAnimation("running")
}





ground.velocityX = -8-(score/100);

//adding 60 frames per second to score and then dividing it by 60 to add 1 frame per second.
//increasing the score
score = score+ Math.round(getFrameRate()/60);
//jump when the space button is pressed
if (keyDown("space") && trex.collide(ground) ) {
trex.velocityY = -25;
Sound3.play();
}
if (score%100 == 0 && score > 0) {
Sound1.play(); 
}
//adding gravity to Trex
trex.velocityY = trex.velocityY + 2.6
//scrolling this ground to make it infinite
if (ground.x < 0) {
ground.x = ground.width / 2;
}
//spawning the clouds and cactus.
clouds();
danger();
flying();
//checking for collision between cactus and clouds
if (trex.isTouching(cactusGroup)) {
Sound2.play();
gameState = "deathwalk"
}





}
else if(gameState == "deathwalk") {

//stopping ground
ground.velocityX = 0;
//freezing all the clouds and cactuses when trex dies
cactusGroup.setVelocityXEach(0);
cloudGroup.setVelocityXEach(0);
//freezing all of the objects when Trex dies
cactusGroup.setLifetimeEach(-1);
cloudGroup.setLifetimeEach(-1);
//changing the animation of Trex to DeadTrex when he dies
trex.changeAnimation("Dead")
//fixing the flying bug
trex.velocityY = 0
//making Restart and game over icons visible when trex dies
Restart.visible = true
GameOver.visible = true
}
//giving trex ground support and not makng it fall down
trex.collide(invisibleGround);
drawSprites();
//making restart button work
if (mousePressedOver (Restart)) {
reset();
}
}
function reset() {
gameState = "lifeblock"
score = 0;
//existing clouds and cactuses
cloudGroup.destroyEach();
cactusGroup.destroyEach();
//making trex come back to normal after reset button is pressed
trex.changeAnimation("running",trex_running);
}
function clouds(){
if(frameCount % 50 == 0) {
cloud = createSprite(600,100,40,10);
cloud.lifetime = 210;
cloudGroup.add(cloud);
cloud.scale = 0.5
cloud.velocityX = -3-(score/100);
cloud.y = Math.round(random(20,100));
cloud.addImage(cloudImage);
//console.log(cloud.depth);
trex.depth = cloud.depth +1
}
}
function danger(){

if(frameCount % 40 == 0) {
cactus = createSprite(600,160,10,40)
//fixing the depth issue for the restart image
Restart.depth = cactus.depth +1
cactusGroup.add(cactus);
cactus.velocityX = -8 - (score/100);
cactus.lifetime = 210;
var Cool = Math.round(random(1,6));
switch(Cool){
case 1: cactus.addImage(obstacle1);
break;
case 2: cactus.addImage(obstacle2);
break;
case 3: cactus.addImage(obstacle3);
break;
case 4: cactus.addImage(obstacle4);
break;
case 5: cactus.addImage(obstacle5);
break;
case 6: cactus.addImage(obstacle6);
break;
default: break;
}
cactus.scale = 0.5;
}
function flying(){
if(frameCount % 60 == 0) {
flyingdino = creatdeSprite(600,50,20,20);
flyingdino.velocityX = -8 - (score/100)
Restart.depth = flyingdino.depth +1
dino.add(flyingdino);
flyingdino.addAnimation("turtle3", "turtle4");
}
}




}
