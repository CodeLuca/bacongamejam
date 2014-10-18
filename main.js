var game = new Phaser.Game(1000, 640, Phaser.CANVAS, 'gameDiv');
var cursors;
var player;
var no = 0;
var score = 100;
var peoples = [];
var exists = false;
var criminalString;
var criminalHair, criminalSkin, criminalClothes;
var mainState = {
    preload: function(){
        game.load.image('background','assets/bg.png');
        game.load.image('player', 'assets/policeman.png');
        game.load.image('red', 'assets/red.png');
        game.load.image('blondblackblue', 'assets/blondblackblue.png');
        game.load.image('brownblackblue', 'assets/brownblackblue.png');
        game.load.image('blondwhiteblue', 'assets/blondwhiteblue.png');
        game.load.image('brownwhiteblue', 'assets/brownwhiteblue.png');
        game.load.image('blondblackred', 'assets/blondblackred.png');
        game.load.image('brownblackred', 'assets/blondblackred.png');
        game.load.image('blondwhitered', 'assets/blondwhitered.png');
        game.load.image('brownwhitered', 'assets/brownwhitered.png');
},
    create: function(){
        this.people = game.add.group();
        game.add.tileSprite(0, 0, 1920, 1920, 'background');
        game.world.setBounds(0, 0, 1920, 1920);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.createCriminal();
        player = game.add.sprite(960, 960, 'player');
        player.scale.setTo(2,2);
        game.physics.arcade.enable(player);
        game.camera.follow(player);
        this.skin = game.add.text(20, 20, "Skin Colour: ", { font: "30px Courier New", fill: "#fff" });
        this.hair = game.add.text(20, 50, "Hair Colour: ", { font: "30px Courier New", fill: "#ffffff" });
        this.score = game.add.text(900, 20, "100", { font: "30px Courier New", fill: "#ffffff" });
        this.clothes = game.add.text(20, 80, "Clothes Colour: ", { font: "30px Courier New", fill: "#ffffff" });
        this.score.fixedToCamera = true;
        this.skin.fixedToCamera = true;
        this.hair.fixedToCamera = true;
        this.clothes.fixedToCamera = true;
        cursors = game.input.keyboard.createCursorKeys();
        this.timer = game.time.events.loop(700, this.createPlayer, this);
        this.timer2 = game.time.events.loop(1500, this.movePeople, this);

    },
    update: function(){
        game.physics.arcade.overlap(player, this.people, this.hitPerson, null, this);

        game.physics.arcade.overlap(player, this.criminal, this.hitCriminal, null, this);

        player.body.angle = 0;
        player.body.collideWorldBounds = true;

    if (cursors.up.isDown) { player.body.velocity.y = -300;player.body.angle = 0;}
    else if (cursors.down.isDown) { player.body.velocity.y = 300; }
    else{player.body.velocity.y = 0;}
    if (cursors.left.isDown) { player.body.velocity.x = -300; }
    else if (cursors.right.isDown) { player.body.velocity.x = 300; }
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
        guy.kill();
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
        if(no > 5){
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

game.state.add('main', mainState);
game.state.start('main');