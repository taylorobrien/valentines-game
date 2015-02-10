 var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
   
function preload() {

    //game.load.tilemap('level1', 'assets/tilemaps/pinktiledmap.json', null, Phaser.Tilemap.TILED_JSON);
    //game.load.image('tiles-1', 'assets/tilemaps/tiles/tiles2.png');
    game.load.spritesheet('dude', 'assets/spritesheet-twilight.png', 26.375,35,8);
    //game.load.spritesheet('droid', 'assets/twilight_girl.png', 32, 32);
    game.load.image('background', 'assets/pink-clouds.jpg',3000,3000);
   // game.load.text('textload');

}
//var textload = "Loading!";
var map;
var tileset;
var layer;
var player;
var facing = 'left';
var jumpTimer = 0;
var cursors;
var jumpButton;
var bg;

function create() {


    game.physics.startSystem(Phaser.Physics.ARCADE);

    //game.stage.backgroundColor = '#000000';

    bg = game.add.tileSprite(0, 0, 800, 600, 'background');
    game.physics.arcade.gravity.y = 250;

    player = game.add.sprite(32, 32, 'dude');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    player.body.setSize(20, 32, 5, 16);

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function update() {
    bg.tilePosition.x -= 10;

    game.physics.arcade.collide(player, layer);

    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;

        if (facing != 'left')
        {
            player.animations.play('left');
            facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;

        if (facing != 'right')
        {
            player.animations.play('right');
            facing = 'right';
        }
    }
    else
    {
        if (facing != 'idle')
        {
            player.animations.stop();

            if (facing == 'left')
            {
                player.frame = 0;
            }
            else
            {
                player.frame = 5;
            }

            facing = 'idle';
        }
    }
    // && player.body.onFloor()
    if (jumpButton.isDown && game.time.now > jumpTimer)
    {
        player.body.velocity.y = -250;
        jumpTimer = game.time.now + 750;
    } 

}

function render () {

     //game.debug.text(game.time.physicsElapsed, 32, 32);
     game.debug.body(player);
     game.debug.bodyInfo(player, 16, 24);

}

//http://fc03.deviantart.net/fs70/f/2014/028/1/d/custom_eqg_twilight_sparkle_sprite_sheet_by_ikuntyphoon-d742vds.png

//http://cdnpix.com/show/199565827209467706_T909KkG6_c.jpg

