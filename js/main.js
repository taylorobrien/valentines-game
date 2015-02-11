window.onload = function() {
 var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update} );
   

function preload() {


    //game.load.tilemap('level1', 'assets/tilemaps/pinktiledmap.json', null, Phaser.Tilemap.TILED_JSON);
    //game.load.image('tiles-1', 'assets/tilemaps/tiles/tiles2.png');
    game.load.spritesheet('dude', 'assets/spritesheet-twilight.png', 26.375,35,8);
    //game.load.spritesheet('droid', 'assets/twilight_girl.png', 32, 32);
    game.load.image('background', 'assets/pink-clouds.jpg',3000,3000);
    game.load.spritesheet('hearts', 'assets/heartsprites.png',102,97);
    game.load.image('restartbutton', 'assets/restartbutton.png');
    game.load.image('broken', 'assets/brokenheart.png');
    game.load.audio('song',['assets/happysong.mp3', 'assets/happysong.ogg']);
    game.load.audio('kissa',['assets/kiss.mp3', 'assets/kiss.ogg']);
    game.load.audio('boinga',['assets/boing.mp3', 'assets/boing.ogg']);
//101 97
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
var heart;
var score = 0;
var scoretext;
var style1;
var timeleft = 90;
var timer;
var timetext;
var restart;
var broken2;
var music;
var musicboing;
var musickiss;

function create() {
    //restart = game.add.sprite(-1000, 1000, 'restartbutton');
    timer = game.time.create(false);
    timer.loop(1000, updateCounter,this);
    timer.start();
    
    music = game.add.audio('song');
    musickiss = game.add.audio('kissa');
    musicboing = game.add.audio('boinga');
    music.play();
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //game.stage.backgroundColor = '#000000';

    bg = game.add.tileSprite(0, 0, 800, 600, 'background');
    game.physics.arcade.gravity.y = 200;
    style1 = {font: "30px Arial", fill:"#ff0044"};
    scoretext = game.add.text(650, 15, "Score: 0",style1); 
    timetext = game.add.text(0,15, "Time Remaining: 90", style1);
    //player.body.gravity.y = 200;
    
    player = game.add.sprite(32, 32, 'dude');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    player.body.setSize(20, 32, 5, 16);
    player.scale.set(1.5,1.5);
    heart = game.add.group();
    broken2 = game.add.group();
    broken2.enableBody = true;
    //broken2.createMultiple(250, 'broken',0,false);
    game.physics.enable(broken2, Phaser.Physics.ARCADE);
    
    heart.createMultiple(250, 'hearts',0,false);
    heart.scale.set(.75,.75);
    game.physics.enable(heart, Phaser.Physics.ARCADE);
    

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    game.time.events.loop(1500, fire, this);
    game.time.events.repeat(Phaser.Timer.SECOND * 2, 10000, breakme, this);
 //   player.body.setCollisionGroup(playerCollisionGroup);
  //  player.body.collides(heart, getheart,this);
    game.time.events.add(Phaser.Timer.SECOND * 91, endgame, this);
    //restart.anchor.set(0.5);
    //restart.inputEnabled = true;
    //restart.events.onInputDown.add(restartgame, this);

}


function restartgame(){
	alert("Here!");
        player.resetPosition();
	score = 0;
	game.paused = false;
	
	//game.state.start('mystate', true,false);
}

function getheart(body1, body2){
	body2.kill();
        musickiss.play();
	score++;
	scoretext.text = "Score: " + score;

}

function minusfive(body1, body2){
	body2.kill();
        musicboing.play();
	score = score - 5;
	scoretext.text = "Score: " + score;

}

function updateCounter(){
	timeleft--;
	timetext.text = "Time Remaining: " + timeleft;


}

function breakme(){
	var brokencand = broken2.create(1000, game.world.randomY, 'broken');
	//var brokencand = broken2.create(300, 300, 'broken');
	//brokencand.body.gravity.y = 0;
        brokencand.body.velocity.x = -300-(2*(90-timeleft));
	brokencand.body.allowGravity = false;


} 

function fire() {

    var candy = heart.getFirstExists(false);
    candy.body.gravity.y = 20;


    if (candy)
    {
        candy.frame = game.rnd.integerInRange(0,3);
        candy.exists = true;
        candy.reset(1000, game.world.randomY);
        candy.body.velocity.x = -300;
	candy.body.velocity.y = 0;
	candy.body.allowGravity = false;

        //ball.body.bounce.y = 0.8;
    }

}

function endgame(){
    	var style2 = {font: "30px Arial", fill:"#330F53"};
	var scoringstuff = "Congrats! Your score is: " + score;
        var winstatement = game.add.text(game.world.centerX-175,game.world.centerY,scoringstuff,style2);
	//restart = game.add.sprite(game.world.centerX-85, game.world.centerY+50, 'restartbutton');
	game.paused = true;
}


function update() {


    bg.tilePosition.x -= 10;

    game.physics.arcade.collide(player, layer);
    game.physics.arcade.collide(player, heart, getheart, null, this);
    game.physics.arcade.collide(player, broken2, minusfive, null, this);

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
//http://s1036.photobucket.com/user/TaleahCosgrove/media/backgrounds/pink-background-clouds.jpg.html
//http://www.newgrounds.com/audio/listen/605917
//http://fc03.deviantart.net/fs70/f/2014/028/1/d/custom_eqg_twilight_sparkle_sprite_sheet_by_ikuntyphoon-d742vds.png
//http://static1.grsites.com/archive/sounds/cartoon/cartoon008.mp3
//http://cdnpix.com/show/199565827209467706_T909KkG6_c.jpg
//http://static1.grsites.com/archive/sounds/cartoon/cartoon003.mp3
//http://i.myniceprofile.com/548/54838.jpg

}

