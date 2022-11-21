var hero, heroImg;
var backgroundImg;
var bg;
var bullet, bulletImg, bullets;
var m1Img;
var bulletGroup;
var monstorGroup;
var gameState = "fight";
var life = 3; 
var lose,winning;
var score = 0;
function preload(){
  backgroundImg = loadImage("images/background.jpg")
 // bomb = loadImage("images/bomb.jpg")
  bulletImg = loadImage("images/bullet.png")
  heroImg = loadImage("images/hero.png")
  m1Img = loadImage("images/monster1.png")
  // m2Img = loadImage("images/monster2.png")
  heroImg1 = loadImage("images/standinghero.png")
  heartImg1 = loadImage("images/heart1.png")
  heartImg2 = loadImage("images/heart_2.png")
  heartImg3 = loadImage("images/heart_3.png")
}


function setup() {
  createCanvas(900,500);
   bg = createSprite(0,0,800,500);
  bg.addImage(backgroundImg);
  bg.velocityX = -4;
  hero = createSprite(100,40, 50, 50);
  hero.addImage(heroImg)
  hero.scale=0.09
  heart1 = createSprite(displayWidth-150,40,20,20)
  heart1.visible = false
  heart1.addImage("heart1",heartImg1)
  heart1.scale = 0.4
  heart2 = createSprite(displayWidth-100,40,20,20)
  heart2.visible = false
  heart2.addImage("heart2",heartImg2)
  bulletCount = 50 
  heart2.scale = 0.4
  heart3 = createSprite(displayWidth-150,40,20,20)
  heart3.addImage("heart3",heartImg3)
  heart3.scale = 0.4
  bulletGroup = new Group;
  monstorGroup = new Group;
}

function draw() {
  background(0);  
if(gameState === "fight"){
  if(life == 3){
    heart3.visible=true
    heart2.visible = false
    heart1.visible = false
  }
  if(life == 2){
    heart2.visible=true
    heart3.visible = false
    heart1.visible = false
  }
  if(life == 1){
    heart1.visible=true
    heart2.visible = false
    heart3.visible = false
  }
  if(life == 0){
    gameState = "lost"
  }
  if(score == 100){
    gameState = "won"
  }
  if(keyDown("up")){
    hero.y = hero.y -3;
  }
  if(keyDown("down")){
    hero.y = hero.y+3;
  }
  if(bg.x<0){
    bg.x = width/2;
  }
  if(keyWentDown("right")){
    bullet = createSprite(hero.x,hero.y)
    bullet.addImage(bulletImg)
    bullet.scale = 0.05
    bullet.velocityX = 10
    bulletCount-=1
    bulletGroup.add(bullet)
    hero.depth = bullet.depth
    hero.depth = hero.depth+2
  }
  else if(keyWentUp("right")){
    hero.addImage(heroImg)

  }
  if(bulletCount == 0){
    gameState = "bullet"
  }
  if(monstorGroup.isTouching(bulletGroup)){
    for(var i = 0; i<monstorGroup.length;i++){
      console.log(monstorGroup.length)
      if(monstorGroup[i].isTouching(bulletGroup)){
        monstorGroup[i].destroy()
        score += 5
        bulletGroup.destroyEach()
      }
    }
  }
  if (hero.isTouching(monstorGroup)){
    for(var i = 0; i<monstorGroup.length;i++){
      if(monstorGroup[i].isTouching(hero)){
        monstorGroup[i].destroy()
      }
    }
  }
  spawnMonstor1()
  drawSprites();
  textSize(20);
  fill("white")
  console.log("Bullets = " + bulletCount)
  console.log("score =" +score)
  console.log("lives =" +life)
  text("Bullets = " + bulletCount, displayWidth-201,displayHeight/2 -250)
  text("score =" +score,displayWidth - 200, displayHeight/2 - 220)
  text("lives =" +life,displayWidth-200,displayHeight/2 -280)

  if(gameState == "lost"){
    fill("red")
    textSize(100);
    text("You LOST",400,400)
    monstorGroup.destroyEach()
    bulletsGroup.destroyEach()
    hero.destroy()
  }
  else if(gameState == "won"){
    fill("yellow")
    textSize(100);
    text("You WON",400,400)
    monstorGroup.destroyEach()
    bulletsGroup.destroyEach()
    hero.destroy()
  }
  else if(gameState=="bullet"){
    fill("red")
    textSize(50);
    text("You ran out of bullets",400,400)
    monstorGroup.destroyEach()
    bulletsGroup.destroyEach()
    hero.destroy()
  }
  
}
 
  

  // spawnbullets()
  // spawnMonstor2()
}

// function spawnbullets(){
//   if(frameCount%10==0){
//     bullet = createSprite(hero.x,hero.y,10,10)
//     bullet.addImage(bulletImg)
//     bullet.scale = 0.05
//     bullet.velocityX = 10
//     bulletGroup.add(bullet)
//   }

  
//}
function spawnMonstor1(){
  if(frameCount%100 == 0){
    monstor1 = createSprite(800,Math.round(random(10,490)))
    monstor1.addImage(m1Img)
    monstor1.scale = 0.1
    monstor1.velocityX = -3 
    monstor1.lifeTime = 300
    monstorGroup.add(monstor1)

  }
}
// function spawnMonstor2(){
//   if(frameCount%150 == 0){
//     monstor2 = createSprite(800,Math.round(random(10,490)))
//     monstor2.addImage(m2Img)
//     monstor2.scale = 0.1
//     monstor2.velocityX = -3 

//   }
// }
