window.onload = function(){

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('block', 'assets/Block-3.gif');
    game.load.image('platform', 'assets/platform.png');
    game.load.image('redNote', 'assets/redNote.png');
    game.load.image('k_note', 'assets/k_note.png');

}

var sprite1;
var sprite2;
var sprite3;
var sprite4;
var sprite5;
var cursors;
var rectA;
var rectB;
var rectC;
var horiz;

var start = 250;

/* CONTROLS */
var A,S,D,F,G,H,I,J,K,L;

var notes;
var note;

function create() {

    game.autoCull = true;

    console.log("GAME",game);
    A = game.input.keyboard.addKey(Phaser.Keyboard.A);
    L = game.input.keyboard.addKey(Phaser.Keyboard.L);
    K = game.input.keyboard.addKey(Phaser.Keyboard.K);

    game.physics.setBoundsToWorld();

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#2d2d2d';

    // rectA = new Phaser.Rectangle(350, 50, 50, 200);


    /* Attempt to make a GROUP */ 


    // 200 X 200 from the bottom of game
    rectA = game.add.sprite(0, 0, null);
    rectB = game.add.sprite(0, 0, null);
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




    sprite1 = game.add.sprite(300, 5, 'redNote');
    sprite1.origHeight = sprite1.height;
    console.log("REDNOTE",sprite1);

    sprite2 = game.add.sprite(400, 50, 'redNote');
    sprite2.origHeight = sprite2.height;

    //Add 5 k_notes, but 30 px apart on the y axis
    notes = game.add.group();

    var arr = [];

    for(var i=0; i<4;i++){

      note = notes.create(start+100*i, 5 - i*150, 'k_note')
      note.origHeight = note.height;
      // note = null;
      // arr.push(note);

    }

    


    game.add.tween(notes).to( { y: 1000 }, 5000, Phaser.Easing.Linear.None, true);
    notes.enableBody = true;

    console.log("NOTES!",notes);



    platform = game.add.sprite(200, 450, 'platform');
    sprite3 = game.add.sprite(200, 50, 'block');
    sprite4 = game.add.sprite(200, 50, 'block');
    sprite5 = game.add.sprite(200, 50, 'block');

    console.log("sprite1",sprite1);
   

    // for(var i=0; i<3;i++){
    //   var note = notes.create(i*250,50,'redNote');
    //   console.log("each NOTE:",note);
    // }

    // console.log("NOTES",notes);

    game.physics.arcade.enable([sprite1,platform,sprite2,sprite4,sprite5,rectA,rectB,notes], Phaser.Physics.ARCADE);
    
    // setSize --> (width,height, x, y)  top of canvas is y = 0, left x = 0
    rectA.body.setSize(30, 150, 200, 50); // set the size of the rectangle
    // rectB.body.setSize(30, 150, 400, 50); // set the size of the rectangle
    // note.body.setSize(20, 20, 0, 0); // set the size of the rectangle
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

    game.add.tween(sprite1).to({ y: 600 }, 8000, Phaser.Easing.Linear.None, true);
    game.add.tween(sprite2).to({ y: 600 }, 8000, Phaser.Easing.Linear.None, true);
    
    // game.add.tween(rectA).to( { y: 600 }, 8000, Phaser.Easing.Linear.None, true);
    // game.add.tween(sprite4).to( { y: 600 }, 10000, Phaser.Easing.Linear.None, true);
    // game.add.tween(sprite5).to( { y: 600 }, 11000, Phaser.Easing.Linear.None, true);
    // game.add.tween(notes).to( { y: 600 }, 2000, Phaser.Easing.Linear.None, true);
    // game.add.tween(rectB).to( { y: 600 }, 2000, Phaser.Easing.Linear.None, true);
    // game.add.tween(rectC).to( { y: 600 }, 5000, Phaser.Easing.Linear.None, true);
    // rectA.origHeight = rectA.body.height;
    // rectB.origHeight = rectB.body.height;
    // console.log("RECT A",rectA);
    // cursors = game.input.keyboard.createCursorKeys();
}

function update() {





    // game.physics.arcade.collide(rectA, horiz, collisionHandler, null, this);
    // game.physics.arcade.collide(rectB, horiz, collisionHandler, null, this);
    //check for overlap, passing in 2 callbacks
    // game.physics.arcade.overlap(notes, platform, overlapHandler, processHandler);
    // game.physics.arcade.overlap(rectA, platform, overlapHandler, processHandler2, this);
    
    // console.log("CHILDREN",notes.children);

    // for(var i=0; i<note.children.length; i++){
    // }

    //works without the 1st callback
    game.physics.arcade.overlap(sprite1, platform, null, processHandler, this);
    
    // game.physics.arcade.overlap(notes, platform, null, processHandler_K2, this);
    game.physics.arcade.overlap(notes.children, platform, null, processHandler_K, this);
    // game.physics.arcade.overlap(notes.children[1], platform, null, processHandler, this);

    game.physics.arcade.overlap(sprite2, platform, overlapHandler, processHandler2, this);
    // game.physics.arcade.overlap(sprite5, platform, overlapHandler, processHandler, this);
    
}



function processHandler(obj1,obj2){

  // console.log(obj1);
  // console.log("PROCESS HANDLER..");
  // if(obj1.y > obj2.y){
  //   // console.log("TRUE!");
  //   return true;
  // }else{
  //   // console.log("FALSE!");

  //   // BIG NOTE
    if (A.isDown && obj1.origHeight >= 100)
    {
      obj1.height--;
      console.log("LEFT IS HIT!");
      // game.stage.backgroundColor = '#00FFFF';
      if(obj1.height <= 0){
        obj1.destroy();
        console.log("DESTROYED!");
      }
    }else if(A.isDown){
       obj1.destroy(false,false);
       console.log("Right IS HIT!",obj1);
      // game.stage.backgroundColor = '#006400';
    return false;
    }
  }
// }


// 1/12/2016
//this func doesn't fully destroy the redNote.....
function processHandler2(obj1,obj2){
  // console.log("PROCESS HANDLER..");
  if(obj1.y > obj2.y){
    // console.log("TRUE!");
    return true;
  }else{
    // console.log("FALSE!");

    // BIG NOTE
    if (L.isDown && obj1.origHeight >= 100)
    {
      obj1.height--;
      console.log("LEFT IS HIT!");
      // game.stage.backgroundColor = '#00FFFF';
      if(obj1.height <= 10){
        obj1.destroy();
        console.log("DESTROYED!");
      }
    }else if(L.isDown){
       obj1.destroy();
       console.log("Right IS HIT!");
      // game.stage.backgroundColor = '#006400';
    }
    return false;
  }
}

function processHandler_K(obj1,obj2){
  
  console.log("obj1_note",obj1);

  if(obj1.y > obj2.y){
    return true;
  }else{

    // BIG NOTE
    if (K.isDown && obj1.origHeight >= 100)
    {
      obj1.height--;
      console.log("LEFT IS HIT!");
      // game.stage.backgroundColor = '#00FFFF';
      if(obj1.height <= 10){
        obj1.destroy();
        console.log("DESTROYED!");
      }
    }else if(K.isDown){
       obj1.destroy();
        console.log("NOW NOTES", notes);

    }
    return false;
  }
}

function processHandler_K2(obj1,obj2){
  
  console.log("obj1",obj1);
  console.log("obj1 parent", obj1.parent)
  debugger;
  if(obj1.y > obj2.y){
    return true;
  }else{
    debugger;
    // BIG NOTE
    if (K.isDown && obj1.origHeight >= 100)
    {
      obj1.height--;
      console.log("LEFT IS HIT!");
      // game.stage.backgroundColor = '#00FFFF';
      if(obj1.height <= 10){
        obj1.destroy();
        console.log("DESTROYED!");
      }
    }else if(K.isDown){
       obj1.destroy();

        console.log("NOW NOTES", notes);

    }
    return false;
  }
}

function overlapHandler (obj1, obj2) {

    console.log("OVERLAP!");
}


// function collisionHandler(obj1,obj2){
//   game.stage.backgroundColor = '#992d2d';
//   console.log("COLLIDE!");

// }


function render() {

    game.debug.body(rectA, 'rgba(200,0,0,0.5)');
    game.debug.body(rectB, 'rgba(200,0,0,0.5)');
    // game.debug.geom(rectB, 'rgba(0,0,255,0.5)');

    // // var intersects = Phaser.Rectangle.intersection(rectA, rectB);

    // game.debug.geom(rectA, 'rgba(200,0,0,0.5)');
    // game.debug.geom(rectB, 'rgba(0,0,255,0.5)');
    // game.debug.geom(horiz, 'rgba(0,200,255,0.5)');

    if (note._bounds) {
      game.debug.spriteInfo(note);
    }
    game.debug.body(platform);
    game.debug.body(notes);
    game.debug.text("Mark's game text", 280, 580);

}

}

/*
   Overlap will persist until fully outside.

   Overlap vs. collision????

   Cut at halfway point instead???

*/

/*
  SCORING

  Decrement total score by the height of sprites passed by the bar.

  Ex:  If a long note only gets held until 10% of its length, take whatever
  has passed off the screen off total score....


*/
