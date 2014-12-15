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
    game.load.image('bullet', 'assets/bullet.png')
}

var map;
var layer;
var cursors;
var bulletTime = 0;


function create() {
    game.stage.backgroundColor = 'black';
    game.world.setBounds(0, 0, 4064, 608);
    map = game.add.tilemap('level_one');
    map.addTilesetImage("castle_0", 'tiles');
    bgLayer = map.createLayer("Tile Layer 1");
    collide = map.createLayer("collision");
    map.setCollisionBetween(0, 280, true, collide);

    player = game.add.sprite(0, game.world.height - 150, 'dude');
    game.physics.arcade.enable(player);
    game.camera.follow(player);
    player.body.checkCollision.up = false;


    player.body.gravity.y = 300;

    player.body.collideWorldBounds = true;
    cursors = game.input.keyboard.createCursorKeys();
    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7], 10, true);

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.createMultiple(100, 'bullet');
    bullets.setAll('anchor.x', 0);
    bullets.setAll('anchor.y', 0.2);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);
    game.physics.enable(bullets, Phaser.Physics.ARCADE);
}

function update() {

    game.physics.arcade.collide(player, collide);

    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        //  Move to the left
        player.body.velocity.x = -150;
        player.animations.play('left');
        facing = 'left'
    } else if (cursors.right.isDown) {
        //  Move to the right
        player.body.velocity.x = 150;
        player.animations.play('right');
        facing = 'right'
    } else {
        //  Stand still
        player.animations.stop();
        player.frame = 4;
        facing = 'right'
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.onFloor()) {
        player.body.velocity.y = -300;
    }

    if (spaceKey.isDown) {
        shoot();
    }

}

function shoot() {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime) {
        //  Grab the first bullet we can from the pool
        bullet = bullets.getFirstExists(false);

        if (bullet) {
            //  And fire it
            bullet.reset(player.x, player.y + 8);
            if (facing == 'right') {
                bullet.body.velocity.x = 400;
            }
            if (facing == 'left') {
                bullet.body.velocity.x = -400;
            }
            bulletTime = game.time.now + 200;
        }
    }

}