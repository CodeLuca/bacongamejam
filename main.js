var game = new Phaser.Game(1000, 640, Phaser.CANVAS, 'gameDiv');
var cursors;
var player;
var no = 0;
var score = 0;
var peoples = [];
var gangArray = [];
var exists = false;
var criminalString;
var level = 1;
var scoreText;
var music;
var mute = false;
var criminalHair, criminalSkin, criminalClothes;
var criminalFight, playerFight;

    var mainState = {
    preload: function(){
        game.add.text(30, 320, "Loading... Fact: In Miami, it is forbidden to imitate an animal.", {font: "30px Raleway" , fill:"#fff"});
        game.load.image('background','assets/bg.png');
        game.load.image('player', 'assets/policeman.png');
        game.load.image('blondblackblue', 'assets/blondblackblue.png');
        game.load.image('brownblackblue', 'assets/brownblackblue.png');
        game.load.image('blondwhiteblue', 'assets/blondwhiteblue.png');
        game.load.image('brownwhiteblue', 'assets/brownwhiteblue.png');
        game.load.image('blondblackred', 'assets/blondblackred.png');
        game.load.image('brownblackred', 'assets/brownblackred.png');
        game.load.image('blondwhitered', 'assets/blondwhitered.png');
        game.load.image('brownwhitered', 'assets/brownwhitered.png');
        game.load.audio('sfx', 'assets/music1.mp3');
    },

    create: function(){
        no = 0;
        mute = false;
        music = game.add.audio('sfx');
        music.play('',0,1,true);
        game.time.events.add(Phaser.Timer.SECOND, this.createText, this);
        this.people = game.add.group();
        this.text = game.add.group();
        this.backg = game.add.tileSprite(0, 0, 1920, 1920, 'background');
        this.backg.alpha = 0;
        this.add.tween(this.backg).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 100, false);
        game.world.setBounds(0, 0, 1920, 1920);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.createCriminal();
        player = game.add.sprite(960, 960, 'player');
        player.scale.setTo(2,2);
        player.alpha = 0;
        this.add.tween(player).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 100, false);
        game.physics.arcade.enable(player);
        game.camera.follow(player);
        var MPress = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
        MPress.onDown.add(this.mute1, this);
        cursors = game.input.keyboard.createCursorKeys();
        this.timer = game.time.events.loop(700, this.createPlayer, this);
        this.timer2 = game.time.events.loop(1500, this.movePeople, this);
    },

        mute1: function(){
            if(mute == false){
                music.pause(); mute = true;
            } else {
                music.play(); mute = false;
            }
        },

    createText: function(){
        this.skin = game.add.text(20, 20, "Skin Colour: ", { font: "30px Raleway", fill: "#fff" }, this.text);
        this.skin.text = "Skin Colour: ";
        this.hair = game.add.text(20, 60, "Hair Colour: ", { font: "30px Raleway", fill: "#ffffff" }, this.text);
        scoreText = game.add.text(900, 20, score, { font: "30px Raleway", fill: "#ffffff" }, this.text);
        this.clothes = game.add.text(20, 100, "Clothes Colour: ", { font: "30px Raleway", fill: "#ffffff" }, this.text);
        this.level = game.add.text(20, 600, "Level: " + level + " - Chance of info: 1/" + level, { font: "30px Raleway", fill: "#ffffff" }, this.text);
        game.world.bringToTop(this.text);
        this.text.alpha = 0;
        this.add.tween(this.text).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 100, false);
        scoreText.fixedToCamera = true;
        this.skin.fixedToCamera = true;
        this.hair.fixedToCamera = true;
        this.clothes.fixedToCamera = true;
        this.level.fixedToCamera = true;
        scoreText.text = score;
    },

    update: function(){
        player.anchor.setTo(.5, 1);
        game.physics.arcade.overlap(player, this.people, this.hitPerson, null, this);

        game.physics.arcade.overlap(player, this.criminal, this.hitCriminal, null, this);

        player.body.angle = 0;
        player.body.collideWorldBounds = true;

    if (cursors.up.isDown) { player.body.velocity.y = -300;player.body.angle = 0;}
    else if (cursors.down.isDown) { player.body.velocity.y = 300; }
    else{player.body.velocity.y = 0;}
    if (cursors.left.isDown) {player.body.velocity.x = -300; player.scale.x = -2;}
    else if (cursors.right.isDown) { player.body.velocity.x = 300; player.scale.x = 2; }
    else{player.body.velocity.x = 0;}
    },

    hitPerson: function(p, guy){
        score -= 5;
        var chance = Math.floor((Math.random() * level) + 1);
        if (chance == 1){
            var which = Math.floor((Math.random() * 3) + 1);
            if (which == 1){if(!(this.skin.text == "Skin Colour: " + criminalSkin)){ this.skin.text += criminalSkin; this.skin.fill = criminalSkin;}}
            else if (which == 2){if(!(this.hair.text == "Hair Colour: " + criminalHair)){this.hair.text += criminalHair; this.hair.fill = criminalHair;}}
            else if (which == 3){if(!(this.clothes.text == "Clothes Colour: " + criminalClothes)){this.clothes.text += criminalClothes; this.clothes.fill = criminalClothes;}}
            scoreText.text = score;
        }
        this.people.remove(guy);
        game.world.bringToTop(guy);
        var tweening = this.add.tween(guy).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true, 100, false);
    },

    hitCriminal: function(p, crim){
        this.skin.text = "You Found the criminal Fight Him (Todo)";
        music.stop();
        game.state.start('fight');
    },

    createPlayer: function(){
        var hair = Math.floor((Math.random() * 2) + 1);
        var skin = Math.floor((Math.random() * 2) + 1);
        var clothes = Math.floor((Math.random() * 2) + 1);
        var playerString;
        if (hair == 1){playerString = "brown";} else {playerString = "blond";}
        if (skin == 1){playerString += "black";} else {playerString += "white";}
        if (clothes == 1){playerString += "blue";} else {playerString += "red";}
        if (playerString == criminalString) {return;}

        var place = Math.floor((Math.random() * 4) + 1);
        var x, y;
        if (place == 1){x = 10, y = 10;} else if (place == 2) {x = 1850, y = 10;}
        if (place == 3){x = 10, y = 1850;} else if (place == 4) {x = 1850, y = 1850;}

            peoples[no] = game.add.sprite(x, y, playerString);
            peoples[no].scale.setTo(1.5, 1.5);
            this.people.add(peoples[no]);
            game.world.bringToTop(this.people);
            game.physics.arcade.enable(peoples[no]);
            peoples[no].body.collideWorldBounds = true;
        no++;
        if(no > 4 + (level * 3)){
            game.time.events.remove(this.timer);
        }
            exists = true;
    },
    movePeople: function() {
        for (var p = 0; p < peoples.length; p++) {
            var directionx = Math.floor((Math.random() * 2) + 1);
            var directiony = Math.floor((Math.random() * 2) + 1);

            if(peoples[p].x < 5){peoples[p].body.velocity.x = 150;} if(peoples[p].x > 1900){peoples[p].x = 1800;}
            if(peoples[p].y < 5){peoples[p].body.velocity.y = 150;} if(peoples[p].y > 1900){peoples[p].y = 1800;}
                if (directionx == 1) {
                    peoples[p].body.velocity.x = 100;
                } else if (directionx == 2) {
                    peoples[p].body.velocity.x = -100;
                }
                if (directiony == 1) {
                    peoples[p].body.velocity.y = 100;
                } else if (directiony == 2) {
                    peoples[p].body.velocity.y = -100;
            }
        }
        var directionx = Math.floor((Math.random() * 2) + 1);
        var directiony = Math.floor((Math.random() * 2) + 1);
        if (directionx == 1) {
            this.criminal.body.velocity.x = 100;
        } else if (directionx == 2) {
            this.criminal.body.velocity.x = -100;
        }
        if (directiony == 1) {
            this.criminal.body.velocity.y = 100;
        } else if (directiony == 2) {
            this.criminal.body.velocity.y = -100;
        }
    },
    createCriminal: function() {
        var hair = Math.floor((Math.random() * 2) + 1);
        var skin = Math.floor((Math.random() * 2) + 1);
        var clothes = Math.floor((Math.random() * 2) + 1);

        if (hair == 1){criminalString = "brown"; criminalHair = "brown";} else {criminalString = "blond"; criminalHair = "blond";}
        if (skin == 1){criminalString += "black"; criminalSkin = "black";} else {criminalString += "white"; criminalSkin = "white";}
        if (clothes == 1){criminalString += "blue"; criminalClothes = "blue";} else {criminalString += "red"; criminalClothes = "red";}


        var place = Math.floor((Math.random() * 4) + 1);
        var x, y;
        if (place == 1){x = 10, y = 10;} else if (place == 2) {x = 1850, y = 10;}
        if (place == 3){x = 10, y = 1850;} else if (place == 4) {x = 1850, y = 1850;}

        this.criminal = game.add.sprite(x, y, criminalString);
        this.criminal.scale.setTo(1.5, 1.5);
        game.physics.arcade.enable(this.criminal);
        this.criminal.body.collideWorldBounds = true;
    }
};

var mainMenu = {
    preload: function(){
        game.stage.backgroundColor = "#004b02";
        game.add.text(30, 50, "Loading... Fact: In Miami, it is forbidden to imitate an animal.", {font: "30px Raleway" , fill:"#fff"});
        game.load.image('bg', 'assets/menu.png');
        game.load.audio('sfx', 'assets/music2.mp3');
    },
    create: function(){
        313131
        no = 0;
        score = 0;
        level = 1;
        this.game.add.text(0, 0, "fix", {font:"1px Raleway", fill:"#FFFFFF"});
        this.music2 = game.add.audio('sfx');
        this.timer = game.time.events.loop(1000, this.spacebar, this);
        this.music2.play('', 0, 1, true);
        var bg = game.add.sprite(0, 600, 'bg');
        var sprite_tween = this.add.tween(bg);
        sprite_tween.to({x: 0, y: 0}, 1500 /*duration of the tween (in ms)*/,
        Phaser.Easing.Bounce.Out /*easing type*/, true /*autostart?*/, 100 /*delay*/, false /*yoyo?*/);
        sprite_tween.start(100);
    },
    spacebar: function(){
        var spacePress = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        var MPress = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
        spacePress.onDown.add(this.spaceEvent, this);
        MPress.onDown.add(this.mute, this);
    },
    spaceEvent: function(){
        this.music2.stop();
        game.state.start('main');
    },
    mute: function(){
        if(mute == false){
            this.music2.pause(); mute = true;
        } else {
            this.music2.play(); mute = false;
        }
    }
};

var Fight = {
    preload: function(){
        game.add.text(30, 50, "Loading... Fact: In Miami, it is forbidden to imitate an animal.", {font: "30px Raleway" , fill:"#fff"});
        game.load.image('player', 'assets/policeman.png');
        game.load.image('bullet', 'assets/bullet.png');
        game.load.image('bullet2', 'assets/bullet2.png');
        game.load.image('blondblackblue', 'assets/blondblackblue.png');
        game.load.image('brownblackblue', 'assets/brownblackblue.png');
        game.load.image('blondwhiteblue', 'assets/blondwhiteblue.png');
        game.load.image('brownwhiteblue', 'assets/brownwhiteblue.png');
        game.load.image('blondblackred', 'assets/blondblackred.png');
        game.load.image('brownblackred', 'assets/brownblackred.png');
        game.load.image('blondwhitered', 'assets/blondwhitered.png');
        game.load.image('brownwhitered', 'assets/brownwhitered.png');
        game.load.audio('sfx', 'assets/music1.mp3');
        game.load.image('bg', 'assets/fightbg.png');
        game.load.image('gang', 'assets/gang.png');
        game.load.image('brick', 'assets/brick.png');
    },
    create: function(){
        mute = false;
        music = game.add.audio('sfx');
        music.play('',0,1,true);
        game.add.sprite(0, 0,'bg');
        this.criminalHeathText = game.add.text(20, 20, "Criminal Health: 5", {font: "30px Raleway" , fill:"lime"});
        this.criminalHealth = 5;
        this.gangmembers = game.add.group();
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.bullets = game.add.group();
        this.bullets2 = game.add.group();
        game.world.setBounds(0, 0, 1000, 640);

        game.world.bringToTop(this.bullets);
        game.world.bringToTop(this.gangmembers);
        game.world.bringToTop(this.bullets2);
        playerFight = game.add.sprite(500, 550, 'player');
        playerFight.scale.setTo(1.5, 1.5);
        criminalFight = game.add.sprite(490, -10, criminalString);
        criminalFight.scale.setTo(2, 2);
        game.physics.arcade.enable(playerFight);
        game.physics.arcade.enable(criminalFight);

        cursors = game.input.keyboard.createCursorKeys();

        for(var p = 0; p < 3 + level; p++){
            gangArray[p] = game.add.sprite(p * 100 + 350, 75, "gang");
            this.gangmembers.add(gangArray[p]);
            game.physics.arcade.enable(gangArray[p]);
        }

        for(var p = 0; p < 4 + level; p++){
            gangArray[p] = game.add.sprite(p * 100 + 300, 150, "gang");
            this.gangmembers.add(gangArray[p]);
            game.physics.arcade.enable(gangArray[p]);
        }

        this.gangmembers.forEach(function(p){
            p.scale.setTo(1.25,1.25);
        });

        this.timer = game.time.events.loop(1000 - (level * 3), this.playerShoot, this);
        this.timer = game.time.events.loop(1500+ (level * 10), this.criminalShoot, this);
        this.timer = game.time.events.loop(2000 + (level * 10), this.gangShoot, this);
        this.timer = game.time.events.loop(5000, this.moveGang, this);


    },
    update: function () {
        game.physics.arcade.overlap(playerFight, this.bullets, this.hitPerson, null, this);
        game.physics.arcade.overlap(criminalFight, this.bullets2, this.hitCriminaly, null, this);
        game.physics.arcade.overlap(this.gangmembers, this.bullets2, this.hit, null, this);

        playerFight.body.collideWorldBounds = true;

        if (cursors.up.isDown) { playerFight.body.velocity.y = -200;playerFight.body.angle = 0;}
        else if (cursors.down.isDown) { playerFight.body.velocity.y = 200; }
        else{playerFight.body.velocity.y = 0;}
        if (cursors.left.isDown) {playerFight.body.velocity.x = -200; }
        else if (cursors.right.isDown) { playerFight.body.velocity.x = 200;}
        else{playerFight.body.velocity.x = 0;}
        this.moveCriminal();
    },

    hit: function (one, two) {
        score += 5;
        one.kill();
    },

    hitPerson: function (one, two) {
        game.state.start('menu');
        music.stop();
    },

    hitCriminaly: function (a, b) {
        b.kill();
        this.criminalHealth--;
        if(this.criminalHealth == 0){
            this.nextLevel();
        }
        if(this.criminalHealth == 4 || this.criminalHealth == 3){
            this.criminalHeathText.fill = "orange";
        } else {
            this.criminalHeathText.fill = "red";
        }
        this.criminalHeathText.text = "Criminal Health " + this.criminalHealth;
    },

    nextLevel: function (){
        score += 100;
        level++;
        music.stop();
        game.state.start('main');
    },

    moveGang: function() {
        this.gangmembers.forEach(function(p){
            if(p.body.velocity.x == 20) {
                p.body.velocity.x = -20;
            }
            else if (p.body.velocity.x == -20 || p.body.velocity.x == 0){p.body.velocity.x = 20;}
        });
    },
    gangShoot: function() {
        var which = Math.floor((Math.random() * gangArray.length));
        var useBullet = game.add.sprite(gangArray[which].x, gangArray[which].y, 'bullet');
        this.bullets.add(useBullet);
        game.physics.arcade.enable(useBullet);
        useBullet.body.velocity.y = 250;
        useBullet.checkWorldBounds = true;
        useBullet.outOfBoundsKill = true;
    },
    moveCriminal: function() {

        if(criminalFight.y < playerFight.y && criminalFight.y < 5 + playerFight.y){criminalFight.y += 0.5;} else if (criminalFight.y > playerFight.y && criminalFight.y > 5+ playerFight.y){criminalFight.y += -0.5}
        if(criminalFight.x < playerFight.x && criminalFight.x < 5 + playerFight.x){criminalFight.x += 0.5;} else if (criminalFight.x > playerFight.x && criminalFight.x > 5+ playerFight.x){criminalFight.x += -0.5}
    },
    criminalShoot: function() {
        var useBrick = game.add.sprite(criminalFight.x, criminalFight.y, 'brick');
        game.physics.arcade.enable(useBrick);
        this.bullets.add(useBrick);
        useBrick.body.velocity.y = 250;
        useBrick.checkWorldBounds = true;
        useBrick.outOfBoundsKill = true;
    },
    playerShoot: function(){
        var shot = game.add.sprite(playerFight.x, playerFight.y, 'bullet2');
        game.physics.arcade.enable(shot);
        this.bullets2.add(shot);
        shot.body.velocity.y = -250;
        shot.checkWorldBounds = true;
        shot.outOfBoundsKill = true;
    }
}

game.state.add('main', mainState);
game.state.add('menu', mainMenu);
game.state.add('fight', Fight);
game.state.start('menu');