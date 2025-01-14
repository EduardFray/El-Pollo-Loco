class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];
    collectedCoins = 0;
    collectedBottles = 0;
    gameStarted = false;
    endScreenShown = false;
    throwSound = new Audio('audio/thorw.mp3');
    enemyDeathSound = new Audio('audio/enemy-death.mp3');
    coinSound = new Audio('audio/coin-sound.mp3');
    bottleSound = new Audio('audio/bottle.mp3');
    glassCrushSound = new Audio('audio/glass-crush.mp3');
    youLostSound = new Audio('audio/youLost.mp3');
    youWinSound = new Audio('audio/you-win.mp3');

    /**
     * Creates an instance of the game world.
     * @param {HTMLCanvasElement} canvas - The canvas element for the game.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.collisionHandler = new CollisionHandler(this);
        this.resetHandler = new ResetHandler(this);
        this.audioManager = new AudioManager(this);

        this.draw();
        this.setWorld();
        this.run();
        this.runLandingCheck();
        this.runObjectCheck();
        this.checkBottles();
        this.applyStoredMuteState();
    }

    /**
     * Applies the mute state stored in localStorage.
     */
    applyStoredMuteState() {
        const isMuted = localStorage.getItem('isMuted') === 'true';
        this.setMute(isMuted);
    }


    /**
     * Mutes or unmutes all audio elements in the game.
     * @param {boolean} mute - If true, mutes all sounds; otherwise unmutes.
     */
    setMute(mute) {
        this.audioManager.setMute(mute);
    }

    /**
     * Sets the world reference for game objects, enabling them to access world state.
     */
    setWorld() {
        this.character.world = this;
        this.throwableObjects.world = this;
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.world = this; // Set the world reference for the Endboss
            }
        });
    }

    /**
     * Plays a sound effect.
     * @param {Audio} sound - The audio object to play.
     */
    playSound(sound) {
        sound.play().catch(error => console.error('Audio playback error:', error));
    }

    /**
     * Starts the main game loop, checking various game states.
     */
    run() {
        setInterval(() => {
            if (this.gameStarted) {
                this.checkThrowObjects();
                this.checkForNewBottles();
                this.collisionHandler.checkCollisions();
                this.checkLevelEndReached();
            }
        }, 50);
    }

    /**
     * Checks if the level's end has been reached and triggers the Endboss.
     */
    checkLevelEndReached() {
        if (this.character.x >= this.level.level_endboss_trigger) {
            this.triggerEndBoss();
        }
    }

    /**
     * Initiates the Endboss movement when triggered.
     */
    triggerEndBoss() {
        setTimeout(() => {
            const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
            if (endboss) {
                endboss.startMoving();
            }
        }, 500);
    }

    /**
     * Regularly checks if the character is landing on any enemies.
     */
    runLandingCheck() {
        setInterval(() => {
            this.collisionHandler.checkLandingOnEnemy();
        }, 10);
    }

    /**
     * Regularly checks collisions between the character and objects.
     */
    runObjectCheck() {
        setInterval(() => {
            this.collisionHandler.checkCollisionsWithObjects();
        }, 50);
    }

    /**
     * Regularly checks if bottles should be thrown.
     */
    checkBottles() {
        setInterval(() => {
            this.checkThrowObjects();
        }, 20);
    }

    /**
     * Checks and manages the throwing of bottles by the character.
     */
    checkThrowObjects() {
        if (this.keyboard.KEY_D && this.collectedBottles > 0) {
            this.playSound(this.throwSound);
            this.keyboard.KEY_D = false; // Reset the key state to prevent multiple throws
            this.throwBottle();
            this.collectedBottles--;
            this.statusBarBottle.setBottlePercentage(this.collectedBottles);
        }
    }

    /**
     * Throws a bottle object from the character's current position.
     */
    throwBottle() {
        let characterSpeed = this.getCharacterSpeed();
        let bottle = new ThrowableObject(
            this.character.x + (this.character.otherDirection ? 10 : 40), // Set position based on direction
            this.character.y + 120,
            this.character.otherDirection,
            characterSpeed // Pass character's speed
        );
        this.throwableObjects.push(bottle);
        bottle.animate(bottle.IMAGES);
    }

    /**
     * Retrieves the current speed of the character based on input.
     * @returns {number} The character's speed.
     */
    getCharacterSpeed() {
        if (this.keyboard.RIGHT) {
            return this.character.speed;
        } else if (this.keyboard.LEFT) {
            return -this.character.speed;
        }
        return 0;
    }

    /**
     * Continuously draws the game world on the canvas.
     */
    draw() {
        if (!this.gameStarted) return; // Stop drawing if the game is over
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear canvas
        this.ctx.translate(this.camera_x, 0);
        this.drawGameWorld();
        this.ctx.translate(-this.camera_x, 0); // Move back
        this.drawUI();

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Draws all game objects such as characters, enemies, and collectibles.
     */
    drawGameWorld() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.bottle_ground);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.throwableObjects);
    }

    /**
     * Draws the user interface elements such as status bars.
     */
    drawUI() {
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarEndboss);
    }

    /**
     * Adds an array of objects to the game map.
     * @param {Array<MovableObject>} objects - The objects to add.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    /**
     * Adds a single object to the game map, including its visual representation.
     * @param {MovableObject} mo - The movable object to add.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        //mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips an image horizontally.
     * @param {MovableObject} mo - The movable object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the flipped image to its original orientation.
     * @param {MovableObject} mo - The movable object to restore.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Checks if new bottles should be added and adds them if necessary.
     */
    checkForNewBottles() {
        if (this.collectedBottles === 0 && this.level.bottle_ground.length === 0) {
            this.addNewBottles();
        }
    }

    /**
     * Adds new bottles to the game level.
     */
    addNewBottles() {
        for (let i = 0; i < 5; i++) {
            let newBottle = new BottleGround();
            this.level.bottle_ground.push(newBottle);
        }
    }

    /**
 * Ends the game when the character is dead and displays the losing screen.
 */
/**
 * Ends the game when the character is dead and displays the losing screen.
 */
endGameCharacterDead() {
    this.gameStarted = false;
    this.pauseAllSounds(); // Stoppt alle anderen Sounds

    const isMuted = localStorage.getItem('isMuted') === 'true';
    if (!isMuted) {
        this.playEndSound(this.youLostSound); // Spielt den Verlust-Sound
    }

    this.showEndScreen('img/9_intro_outro_screens/game_over/oh no you lost!.png');
}

/**
 * Ends the game when the player wins and displays the winning screen.
 */
endGame() {
    this.gameStarted = false;
    this.pauseAllSounds(); // Stoppt alle anderen Sounds

    const isMuted = localStorage.getItem('isMuted') === 'true';
    if (!isMuted) {
        this.playEndSound(this.youWinSound); // Spielt den Gewinn-Sound
    }

    this.showEndScreen('img/9_intro_outro_screens/win/won_2.png');
}

/**
 * Plays the end sound if not muted.
 * @param {Audio} sound - The audio object to play.
 */
playEndSound(sound) {
    sound.muted = false; // Sicherstellen, dass der Sound nicht stummgeschaltet ist
    sound.currentTime = 0; // Setzt den Audioclip an den Anfang zurück
    sound.play()
        .then(() => {
            console.log("Sound played successfully");
        })
        .catch(error => {
            console.error("Audio playback error:", error);
        });
}

/**
 * Pauses all game sounds.
 */
pauseAllSounds() {
    this.setMute(true); // Alle Sounds stummschalten
    game_music.pause();
    chicken_sound.pause();
}


    /**
     * Displays the end screen with the specified image.
     * @param {string} imageSrc - The source of the image to display.
     */
    showEndScreen(imageSrc) {
        let ctx = this.canvas.getContext('2d');
        let endScreenImage = new Image();
        endScreenImage.src = imageSrc;
        endScreenImage.onload = () => {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear canvas
            ctx.drawImage(endScreenImage, 0, 0, this.canvas.width, this.canvas.height); // Draw image
        };
        document.getElementById('tryAgainBtn').style.display = 'block';
    }
}
