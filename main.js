var game = new Phaser.Game(1000, 640, Phaser.CANVAS, 'gameDiv');
var cursors;
var player;
var no = 0;
var score = 100;
var peoples = [];
var exists = false;
var criminalString;
var music;
var criminalHair, criminalSkin, criminalClothes;

    var mainState = {
    preload: function(){
        game.add.text(30, 50, "Loading... Fact: In Miami, it is forbidden to imitate an animal.", {font: "30px Trebuchet MS" , fill:"#fff"});
        game.load.image('background','assets/bg.png');
        game.load.image('player', 'assets/policeman.png');
        game.load.image('red', 'assets/red.png');
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

        music = game.add.audio('sfx');

        music.play('');
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
        cursors = game.input.keyboard.createCursorKeys();
        this.timer = game.time.events.loop(700, this.createPlayer, this);
        this.timer2 = game.time.events.loop(1500, this.movePeople, this);
    },

    createText: function(){

        this.skin = game.add.text(20, 20, "Skin Colour: ", { font: "30px Raleway", fill: "#fff" }, this.text);
        this.skin.text = "Skin Colour: ";
        this.hair = game.add.text(20, 60, "Hair Colour: ", { font: "30px Raleway", fill: "#ffffff" }, this.text);
        this.score = game.add.text(900, 20, "100", { font: "30px Raleway", fill: "#ffffff" }, this.text);
        this.clothes = game.add.text(20, 100, "Clothes Colour: ", { font: "30px Raleway", fill: "#ffffff" }, this.text);
        game.world.bringToTop(this.text);
        this.text.alpha = 0;
        this.add.tween(this.text).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 100, false);
        this.score.fixedToCamera = true;
        this.skin.fixedToCamera = true;
        this.hair.fixedToCamera = true;
        this.clothes.fixedToCamera = true;

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
        var chance = Math.floor((Math.random() * 1) + 1);
        if (chance == 1){
            var which = Math.floor((Math.random() * 3) + 1);
            if (which == 1){if(!(this.skin.text == "Skin Colour: " + criminalSkin)){ this.skin.text += criminalSkin; this.skin.fill = criminalSkin;}}
            else if (which == 2){if(!(this.hair.text == "Hair Colour: " + criminalHair)){this.hair.text += criminalHair; this.hair.fill = criminalHair;}}
            else if (which == 3){if(!(this.clothes.text == "Clothes Colour: " + criminalClothes)){this.clothes.text += criminalClothes; this.clothes.fill = criminalClothes;}}
            score -= 5;
            this.score.text = score;
        }
        this.people.remove(guy);
        game.world.bringToTop(guy);
        var tweening = this.add.tween(guy).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true, 100, false);
    },

    hitCriminal: function(p, crim){
        this.skin.text = "You Found the criminal Fight Him (Todo)";
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
        if(no > 10){
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
        game.load.image('bg', 'assets/menu.png');
        game.load.audio('sfx', 'assets/music2.mp3');
    },
    create: function(){
        this.game.add.text(0, 0, "fix", {font:"1px Raleway", fill:"#FFFFFF"});
        this.music2 = game.add.audio('sfx');
        this.timer = game.time.events.loop(1000, this.spacebar, this);
        this.music2.play('');
        var bg = game.add.sprite(0, 600, 'bg');
        var sprite_tween = this.add.tween(bg);
        sprite_tween.to({x: 0, y: 0}, 1500 /*duration of the tween (in ms)*/,
        Phaser.Easing.Bounce.Out /*easing type*/, true /*autostart?*/, 100 /*delay*/, false /*yoyo?*/);
        sprite_tween.start(100);
    },
    spacebar: function(){
        var spacePress = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spacePress.onDown.add(this.spaceEvent, this);
    },
    spaceEvent: function(){
        this.music2.stop();
        game.state.start('main');
    }
};

var Fight = {
    prelioad: function(){

    }
}

game.state.add('main', mainState);
game.state.add('menu', mainMenu);;
game.state.start('menu');