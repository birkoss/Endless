class MainScene extends Phaser.Scene {
	constructor() {
		super({
			key: 'MainScene'
		});
	}

	init() {
		this.config = {
			playerGravity: 900,
			playerJumpForce: 400,
			playerStartX: 200,
			playerSpeed: 200
		};
	}

	create() {

        this.anims.create({
            key: "running",
            frames: [{
                frame: 0,
                key: "player"
            },{
                frame: 1,
                key: "player"
            },{
                frame: 2,
                key: "player"
            },{
                frame: 3,
                key: "player"
            },{
                frame: 4,
                key: "player"
            }],
            frameRate: 10,
            yoyo: true,
            repeat: -1
        });

        this.anims.create({
            key: "jumping",
            frames: [{
                frame: 0,
                key: "player-jump"
            },{
                frame: 1,
                key: "player-jump"
            }],
            frameRate: 8,
            yoyo: true,
            repeat: -1
        });

        this.anims.create({
            key: "falling",
            frames: [{
                frame: 2,
                key: "player-jump"
            }],
            frameRate: 8,
            yoyo: true,
            repeat: -1
        });

		this.platforms = this.add.group();
		this.platformsPool = this.add.group();

		let platform = this.addPlatform(0);

		let nbrPlatforms = Math.ceil(this.game.config.width / platform.width) + 1;

		for (let i=1; i<nbrPlatforms; i++) {
			platform = this.addPlatform(platform.x + platform.width);
		}

		this.player = new Player(this, this.config.playerStartX, 200, "player");
		//this.player = this.physics.add.sprite(this.config.playerStartX, 200, "player");

		this.player.setGravityY(this.config.playerGravity);

		// Collide the player and the platforms
        this.physics.add.collider(this.player, this.platforms);

        this.input.on("pointerdown", this.tryToJump, this);

        this.player.anims.play("running");
	}

	update() {
        if (this.player.y > this.game.config.height) {
            this.scene.start("MainScene");
        }

        // Always force the place at the same X
		this.player.x = this.config.playerStartX;

		if (this.player.body.velocity.y > 0 && this.player.anims.currentAnim.key != "falling") {
			this.player.anims.play("falling");
		} else if (this.player.body.velocity.y == 0 && this.player.anims.currentAnim.key != "running") {
			this.player.anims.play("running");
		}

		// Watch each platform for out of bound and move them back
		this.platforms.getChildren().forEach(platform => {
			// Is this platform is out of bound ?
            if (platform.x < - platform.displayWidth / 2) {

            	// Remove it from the group (should be at the first position)
                this.platforms.remove(platform);

                // Get the last platform in the group
                let lastPlatform = this.platforms.getLast(true);

                // Place this platform after the last platform
                platform.x = lastPlatform.x + lastPlatform.width;

                // Add it back to the group
                this.platforms.add(platform);
            }
        });
	}

	addPlatform(x) {
		let platform = this.physics.add.sprite(x, 0, "platform");
		platform.setImmovable(true);
		platform.setVelocityX(this.config.playerSpeed * -1);
		this.platforms.add(platform);

		platform.y = this.game.config.height - platform.height/2;

		return platform;
	}

	tryToJump() {
		if (this.player.body.touching.down) {
			this.player.setVelocityY(this.config.playerJumpForce * -1);
			this.player.anims.play("jumping");
		}
	}

};