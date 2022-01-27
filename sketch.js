var spaceImg, space;
var END = 0
var PLAY
var astroImg, astro, astroGroup;
var ship, shipImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var gameOver,gameOverImg
var score


function preload(){
  spaceImg = loadImage("space.png");
  astroImg = loadImage("astro.png");
  shipImg = loadImage("ship.png");
  gameOverImg = loadImage("gameOver.png");
  gameOver.visible = false;
}

function setup() {
  createCanvas(400, 400);
  space = createSprite(200,200);
  space.addImage("space",spaceImg);
  space.velocityY = 1;

  ship= createSprite(200,200,50,50);
  ship.addImage(shipImg)
  ship.scale = 0.25;

  astroGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  gameOverImg = loadImage("gameOver.png");

  gameOver = createSprite(width/2,height/2-50);
  gameOver.addImage(gameOverImg);

  gameOver.scale = 0.5;

  gameOver.visible = false;
 

score = 0;
touches =[];
}
//iam here work and finish this .....reposition like 500 is 600-100 so for text(width-100 as x position)
function draw() {
//trex.debug = true;
background(300);
text("Score:" + score, 200,50);
  background(200);

  score = score + Math.round(getFrameRate()/60);

  
  if(gameState == "play") {

    //infinitely scrolling tower
    if(space.y > 250){
      space.y = 150
    }

    if(keyDown("left_arrow")){
      ship.x = ship.x - 3;
    }
    if(keyDown("right_arrow")){
      ship.x = ship.x + 3;
    }
    
    if(keyDown("space")){
      ship.velocityY = -10;
    }


    //gravity effect
    ship.velocityY = ship.velocityY + 1;

    spawnAstros();
    if(astroGroup.isTouching(ship)){
      ship.velocityY = 0;
      gameState = "end"
    }
    else if (gameState === "end"){
      gameOver.invisible = false;
    }
  

      

    if(ship.y > 600 || invisibleBlockGroup.isTouching(ship)) {
      ship.destroy();
      gameState = END
    }
    else if (gameState == END){
      gameOver.visible = true;
    }
    
  } 
  drawSprites();
  }
  
  
  


function spawnAstros() {
  //introduce delay of 240 frames
  if(frameCount % 240 === 0){
    var astro = createSprite(100, -50);
    astro.scale = 0.1
    var invisibleBlock = createSprite(100,-20);
    invisibleBlock.height = 2;

    astro.addImage(astroImg);


    astro.x = Math.round(random(120,300));
    invisibleBlock.x = astro.x;

    astro.velocityY = 1;
    invisibleBlock.velocityY = 1;

    astro.lifetime = 800;
    invisibleBlock.lifetime = 800;

    ship.depth = astro.depth;
    ship.depth +=1;

    astroGroup.add(astro);
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
  }

}
