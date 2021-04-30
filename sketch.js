var PLAY = 1;
var END = 0;
var STOP = 2;
var spaceBackground;
var playerRocket;
var alienSpaceship;
var score;
var gameState;
var GameOver;
var newLevel;


function preload(){
    spaceImg = loadImage("space33.png");
    rocketImg = loadImage("rocket-2.png");
    alienSpaceshipImg = loadImage("alienSpaceship.png");
    asteroidImg = loadImage("blueFire.png");
    gameOverImg = loadImage("game_over.png");
    newLevelImg = loadImage("LevelUp.png");
}

function setup() {
    createCanvas(800,750);
    
    score = 0;
    
    spaceBackground = createSprite(300,320,10,10);
    spaceBackground.addImage(spaceImg);

    playerRocket = createSprite(300,650,10,10);
    playerRocket.addImage(rocketImg);
    playerRocket.scale = 0.5;
    
    playerRocket.setCollider("rectangle",-10,-40,130,300);
    
    alienSpaceshipG = new Group();
    asteroidG = new Group();

   

}

function draw() {
    background(180);
    createEdgeSprites();
    

    //giving velocity to player rocket.
    if(keyWentDown("left")){
        playerRocket.velocityX = -8;
    }
    if(keyWentUp("left")){
        playerRocket.velocityX = 0;
    }
    if(keyDown("right")){
        playerRocket.velocityX = 8;
    }
    if(keyWentUp("right")){
        playerRocket.velocityX = 0;
    }
    //declaring gameState;
    if(keyDown("space")){
        gameState = PLAY;
    }
    if(gameState === PLAY){
        
        //making the background move.
        spaceBackground.velocityY = 3;
        
        //making the gameover sprite.
        GameOver = createSprite(400,375,0,0);
        GameOver.addImage(gameOverImg);
        GameOver.visible = false;
        
        //making endless background.
        if(spaceBackground.y > 800){
            spaceBackground.y = width/2;
        }
        //giving gameOver conditions.
        if(playerRocket.isTouching(asteroidG)){
            gameState = END;
        }
        if(playerRocket.isTouching(alienSpaceshipG)){
            gameState = END;
        }
        //displaying score.
        textSize(40);
        fill("white");
        text("score: " + score,400,400);
        spawnObstacles();
        
        //adding code to increase score.
        score = score + Math.round(getFrameRate()/50);
        //adding levels.
        if(score % 2000 === 0){
            asteroidG.velocityY = asteroidG.velocityY + 1;
            alienSpaceshipG.velocityY = alienSpaceshipG.velocityY + 1;

            newLevel = createSprite(-100,400,0,0);
            newLevel.addImage(newLevelImg);
            newLevel.velocityX = 8;
            newLevel.scale = 0.5;
            newLevel.lifetime = 150;
        } 
        
    }
    if(gameState === END){
        playerRocket.destroy();
        asteroidG.destroyEach();
        alienSpaceshipG.destroyEach();
        spaceBackground.destroy();
        GameOver.visible = true;
        background("brown");
        
        fill("white");
        stroke("black");        
        textSize(30); ;
        text("press 'r' to restart",285,470);
    }
    //giving restart conditions.
    if(keyDown("r") && (gameState === END)){
        gameState = PLAY;
        spaceBackground = createSprite(300,320,10,10);
        spaceBackground.addImage(spaceImg);

        playerRocket = createSprite(300,650,10,10);
        playerRocket.addImage(rocketImg);
        playerRocket.scale = 0.5;
        
        playerRocket.setCollider("rectangle",-10,-40,130,300);
    }
    drawSprites();

}
function alienWrath(){
    
    alienSpaceship = createSprite(Math.round(random(30,770)),-100,10,10);
    alienSpaceship.addImage(alienSpaceshipImg);
    alienSpaceship.velocityY = 6;
    alienSpaceship.scale = 0.4;
    alienSpaceshipG.add(alienSpaceship);
    if(alienSpaceship.y > 800){
        alienSpaceship.destroy();
    }
    alienSpaceship.setCollider("circle",0,0,200);
    playerRocket.collide(alienSpaceshipG);
}
function Fastasteroid(){
   var asteroid = createSprite(Math.round(random(30,740)),-100,101,10);
    
    asteroid.addImage(asteroidImg);
    asteroid.velocityY = 8;
    asteroid.scale = 0.3;
    asteroidG.add(asteroid);
    if(asteroid.y > 800){
        asteroid.destroy();
    }
    
    asteroid.setCollider("rectangle",0,100,240,500);
    playerRocket.collide(asteroidG);
    console.log(asteroid.velocityY);

}
//Spawning obstacles randomly.
function spawnObstacles(){
    if(frameCount % 100 === 0){
        var select_obstacle = Math.round(random(1,3));
        if(select_obstacle === 1){
        alienWrath();
        }else if(select_obstacle === 2){
        Fastasteroid();   
}
}
}
