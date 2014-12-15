// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
//= require phaser

var game = new Phaser.Game(800, 600, Phaser.AUTO, '.game', {
    preload: preload,
    create: create,
    update: update
});

function preload() {
    game.load.tilemap('level_one', 'assets/big_level.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/castle_0.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

var map;
var layer;
var cursors;


function create() {
    game.stage.backgroundColor = 'black';
    game.world.setBounds(0, 0, 4064, 608);
    map = game.add.tilemap('level_one');
    map.addTilesetImage("castle_0", 'tiles');
    bgLayer = map.createLayer("Tile Layer 1");
    collide = map.createLayer("collision");
    map.setCollisionBetween(0, 280, true, collide);

    player = game.add.sprite(0, game.world.height - 300, 'dude');
    game.physics.arcade.enable(player);
    game.camera.follow(player);
    player.body.checkCollision.up = false;

    
    player.body.gravity.y = 300;
    
    player.body.collideWorldBounds = true;
    cursors = game.input.keyboard.createCursorKeys();
   
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
}

function update() {

	game.physics.arcade.collide(player, collide);

	  player.body.velocity.x = 0;
 
    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;
 
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;
 
        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();
 
        player.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.onFloor())
    {
        player.body.velocity.y = -300;
    }

}


// function render() {

//     game.debug.cameraInfo(game.camera, 32, 32);
//     game.debug.spriteCoords(player, 32, 500);

// }