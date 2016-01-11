window.onload = function(){

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('block', 'assets/Block-3.gif');
    game.load.image('platform', 'assets/platform.png');

}

var sprite1;
var sprite2;
var cursors;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#2d2d2d';

    sprite1 = game.add.sprite(400, 50, 'block');
    sprite2 = game.add.sprite(200, 450, 'platform');

    game.physics.arcade.enable([ sprite1, sprite2 ], Phaser.Physics.ARCADE);

    game.add.tween(sprite1.body).to( { y: 600 }, 3000, Phaser.Easing.Linear.None, true);

    cursors = game.input.keyboard.createCursorKeys();
}

function update() {

    if (cursors.left.isDown)
    {
       console.log("LEFT IS HIT!");
       game.stage.backgroundColor = 'blue';
    }





    game.physics.arcade.overlap(sprite1, sprite2, overlapHandler, null, this);

}

function overlapHandler (obj1, obj2) {

    game.stage.backgroundColor = '#992d2d';
    console.log("OVERLAP!");

    obj2.kill();

}

function render() {

    game.debug.body(sprite1);
    game.debug.body(sprite2);

}

}
