var boy1Img, boy1;
var boyRunningImg;
var background1, background1Img;
var background2, background2Img;
var spaceships;
var spaceship1Img, spaceship2Img, spaceship3Img;
var laserbulletsound;
var laserbullet, laserbulletImg;
var asteroid, asterroidImg;
var heart, heartImg;
var score  = 0
var lives = 3;
var asteroidGroup;

function preload() {
boy1Img = loadImage("images/boy1.png");
boyRunningImg = loadAnimation("images/boy2.png","images/boy3.png");
background1Img = loadImage("images/background1.jpg");
background2Img = loadImage("images/background2.png");
spaceship1Img = loadImage("images/spaceship1.png");
spaceship2Img = loadImage("images/spaceship2.png");
spaceship3Img = loadImage("images/spaceship3.png");
laserbulletsound = loadSound("images/laserbulletsound.mp3");
laserbulletImg = loadImage("images/laserbullet.png");
asteroidImg = loadImage("images/asteroid.png");
heartImg = loadImage("images/heart.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  background1 = createSprite(windowWidth/2, windowHeight/2);
  background1.addImage(background1Img);
  //background1.x = background1.width/2
  background1.scale = 2;
  background1.velocityX = -6;
  boy1 = createSprite(200, 500, 30, 40);
  boy1.addImage("shooting",boy1Img);
  boy1.addAnimation("running",boyRunningImg);
  asteroidGroup = new Group();

heart1 = createSprite(30, 50);
heart1.addImage(heartImg);
heart1.scale = 0.10;

heart2 = createSprite(85, 50);
heart2.addImage(heartImg);
heart2.scale = 0.10;

heart3 = createSprite(140, 50);
heart3.addImage(heartImg);
heart3.scale = 0.10;
}

function draw() {
  background(0,0,0); 
  //console.log(background1.x);
  boy1.velocityY = 0;
  boy1.velocityX = 0;
  if(background1.x< 0) {
    background1.x = width/2;
  }
 if(keyDown("UP_ARROW")) {
   boy1.velocityY = -3
 }
 if(keyDown("DOWN_ARROW")) {
   boy1.velocityY = 3;
 }
 if(keyDown("LEFT_ARROW")) {
  boy1.velocityX = -3;
}
if(keyDown("RIGHT_ARROW")) {
  boy1.velocityX = 3;
}
if(keyDown("R")) {
  boy1.changeAnimation("running");
  boy1.scale = 1.5;
  laserbulletsound.stop();
}
if(keyDown("space")){
  boy1.changeImage("shooting");
  boy1.scale = 1;
  laserbulletsound.loop();
  mousePressed();
}
  Spawnasteroids();
  spawnSpaceships();
  heartlives();
  asteroidCollide();
  drawSprites();
  textSize(40);
  fill("lightblue");
  text("Score: " + score, 1065, 50);
}
function spawnSpaceships() {
  if(frameCount % 250 === 0) {
  spaceships = createSprite(1200, 200);
  spaceships.y = Math.round(random(600, 200));
  spaceships.scale = 0.4;
  spaceships.velocityX = -3;
  spaceships.lifetime = 500;
  spaceships.rotation = 180;
  var rand = Math.round(random(1,3))
  switch(rand){
  case 1: spaceships.addImage(spaceship1Img);
          break
  case 2: spaceships.addImage(spaceship2Img);
          break
  case 3: spaceships.addImage(spaceship3Img);
          break
  }
  }
}
function mousePressed() {
  if (frameCount % 5 === 0) {
    laserbullet = createSprite(200, 500, 50, 50);
    laserbullet.addImage(laserbulletImg);
    laserbullet.velocityX = Math.round(random(2, 5));
    laserbullet.lifetime = 200;
    laserbullet.x = boy1.x
    laserbullet.y = boy1.y
  }
}
function Spawnasteroids() {
  if (frameCount % 100 === 0) {
    asteroid = createSprite(Math.round(random(200, 1500)), 20, 40, 10);
    asteroid.addImage(asteroidImg);
    asteroid.scale = 0.5;
    asteroid.velocityX = -4;
    asteroid.velocityY = 4;
  }
}
function asteroidCollide() {
  if (boy1.isTouching(asteroid)) {
    lives = lives - 1;
    boy1.x = 200;
    boy1.y = 500;
    boy1.velocityX = 0;
    boy1.velocityY = 0;
  }
}
function heartlives() {
  if (lives == 2) {
    heart1.visible = false;
  }
  if (lives == 1) {
    heart2.visible = false;
  }
  if (lives == 0) {
    heart3.visible = false;
  }
}