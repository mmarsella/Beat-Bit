window.onload = function(){

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('block', 'assets/Block-3.gif');
    game.load.image('platform', 'assets/platform.png');

}

var sprite1;
var sprite2;
var sprite3;
var sprite4;
var sprite5;
var cursors;
var rectA;
var rectB;
var horiz;

function create() {

    game.physics.setBoundsToWorld();

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#2d2d2d';

    // rectA = new Phaser.Rectangle(350, 50, 50, 200);


    // 200 X 200 from the bottom of game
    rectA = game.add.sprite(200, 200, null);
    // game.physics.enable(rectA, Phaser.Physics.ARCADE);

    // rectB = game.add.sprite(0, 0, null);
    // game.physics.enable(rectB, Phaser.Physics.ARCADE);
    // rectB.body.setSize(500, 100, 50, 200); // set the size of the rectangle
    // // horiz = new Phaser.Rectangle(200, 450, 400, 50);

    // horiz = game.add.sprite(0, 0, null);
    // game.physics.enable(horiz, Phaser.Physics.ARCADE);
    // horiz.body.setSize(200, 450, 400, 50);


    // console.log(rectB.y);
    // console.log(rectB.x);

    sprite1 = game.add.sprite(400, 50, 'block');
    platform = game.add.sprite(200, 450, 'platform');
    sprite3 = game.add.sprite(200, 50, 'block');
    sprite4 = game.add.sprite(200, 50, 'block');
    sprite5 = game.add.sprite(200, 50, 'block');

    console.log("sprite1",sprite1);
    console.log("platform",platform);

    console.log("rectA",rectA);



    game.physics.arcade.enable([ sprite1,platform,sprite3,sprite4,sprite5,rectA ], Phaser.Physics.ARCADE);
    
    // setSize --> (width,height, x, y)  top of canvas is y = 0, left x = 0
    rectA.body.setSize(30, 100, 200, 50); // set the size of the rectangle
/*
***TWEEN***

new Tween(target, game, manager)

A Tween allows you to alter one or more properties of a target object over
 a defined period of time. This can be used for things such as alpha fading 
 Sprites, scaling them or motion. Use Tween.to or Tween.from to set-up the 
 tween values. You can create multiple tweens on the same object by calling 
 Tween.to multiple times on the same Tween. Additional tweens specified in 
 this way become "child" tweens and are played through in sequence. 
 You can use Tween.timeScale and Tween.reverse to control the playback of this 
 Tween and all of its children.
 */





    // game.add.tween(sprite1).to( { y: 600 }, 5000, Phaser.Easing.Linear.None, true);
    // game.add.tween(sprite3).to( { y: 600 }, 8000, Phaser.Easing.Linear.None, true);
    // game.add.tween(sprite4).to( { y: 600 }, 10000, Phaser.Easing.Linear.None, true);
    // game.add.tween(sprite5).to( { y: 600 }, 11000, Phaser.Easing.Linear.None, true);
    game.add.tween(rectA).to( { y: 600 }, 8000, Phaser.Easing.Linear.None, true);

    cursors = game.input.keyboard.createCursorKeys();
}

function update() {

    sprite1.events.onOutOfBounds.add(check,this);

    // console.log(rectA.y);


    if(sprite1.onOutOfBounds){
      console.log("OUT OF BOUNDS!");
    }

     if (cursors.up.isDown)
    {
      console.log("UP IS HIT!");
      // game.stage.backgroundColor = '#00FFFF';
      rectA.height--;
    }


    // game.physics.arcade.collide(rectA, horiz, collisionHandler, null, this);
    // game.physics.arcade.collide(rectB, horiz, collisionHandler, null, this);
    //check for overlap, passing in 2 callbacks
    game.physics.arcade.overlap(rectA, platform, overlapHandler, processHandler, this);
    game.physics.arcade.overlap(sprite3, platform, overlapHandler, processHandler, this);
    game.physics.arcade.overlap(sprite4, platform, overlapHandler, processHandler, this);
    game.physics.arcade.overlap(sprite5, platform, overlapHandler, processHandler, this);
}

function check(){

  console.log("HI!");
}

function processHandler(obj1,obj2){
  // console.log("PROCESS HANDLER..");
  if(obj1.y > obj2.y){
    // console.log("TRUE!");
    return true;
  }else{
    // console.log("FALSE!");
    if (cursors.left.isDown)
    {
      console.log("LEFT IS HIT!");
      game.stage.backgroundColor = '#00FFFF';
      obj1.destroy();
     
    }else if(cursors.right.isDown){
       console.log("Right IS HIT!");
      game.stage.backgroundColor = '#006400';
    }
    return false;
  }
}

function overlapHandler (obj1, obj2) {

    game.stage.backgroundColor = '#992d2d';
    console.log("OVERLAP!");
    // obj2.kill();
}


// function collisionHandler(obj1,obj2){
//   game.stage.backgroundColor = '#992d2d';
//   console.log("COLLIDE!");

// }


function render() {

    game.debug.body(rectA, 'rgba(200,0,0,0.5)');
    // game.debug.geom(rectB, 'rgba(0,0,255,0.5)');

    // // var intersects = Phaser.Rectangle.intersection(rectA, rectB);

    // game.debug.geom(rectA, 'rgba(200,0,0,0.5)');
    // game.debug.geom(rectB, 'rgba(0,0,255,0.5)');
    // game.debug.geom(horiz, 'rgba(0,200,255,0.5)');

    game.debug.body(sprite1);
    game.debug.body(platform);

}

}
