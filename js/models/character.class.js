class Character extends MovableObject {
    height = 250;
    y = 80;
    x = 100;
    currentImage = 0;
    speed = 5;
    idleTime = 0;  // Timer for sleep animation
    isIdle = false;  // Flag to check if character is in idle 
    isJumping = false;
    isDeadAnimationPlaying = false;
    endGameTriggered = false;
    deathInterval = null;
    offset = {
        top: 120,
        left: 40,
        right: 30,
        bottom: 15
    };
    dead = false;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMP = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_STANDING = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];
    IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    world;
    walking_sound = new Audio('audio/foot-step-2-new.mp3');
    jump_sound = new Audio('audio/jump.mp3');
    hurt_sound = new Audio('audio/ouch.mp3');
    youLost_sound = new Audio('audio/youLost.mp3');

    /**
    * Initializes a new character instance and loads its assets.
    */
    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_SLEEPING);
        this.walking_sound.volume = 1.0;
        this.applyGravity();
        this.animate();
    }

    /**
     * Sets up the animation and movement handlers for the character.
     */
    animate() {
        this.handleMovement();
        this.handleAnimation();
    }

    /**
     * Resets the character to its initial state.
     */
    reset() {
        this.x = 100;
        this.y = 80;
        this.energy = 100;  // Set energy to 100
        this.dead = false;
        this.speedY = 0;
        this.isJumping = false;
        this.isDeadAnimationPlaying = false;
        this.endGameTriggered = false;
        this.currentImage = 0;  // Reset the animation frame counter
        this.clearTimers(); // Clear any running timers or intervals
        this.updateEnergyStatusBar(); // Update the energy status bar after reset
    }
    
    clearTimers() {
        if (this.deathInterval) {
            clearInterval(this.deathInterval);
            this.deathInterval = null;
        }
    }

    /**
     * Updates the energy status bar with the character's current energy level.
     */
    updateEnergyStatusBar() {
        if (this.world && this.world.statusBar) {
            this.world.statusBar.setPercentage(this.energy);
        }
    }

    /**
     * Handles the character's movement based on keyboard input.
     */
    handleMovement() {
        setInterval(() => {
            this.walking_sound.pause();
            this.checkRightMovement();
            this.checkLeftMovement();
            this.checkJump();
            this.updateIdleState();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    /**
     * Checks and handles the character's movement to the right.
     */
    checkRightMovement() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            if (!this.isAboveGround()) {
                this.walking_sound.play();
            }
            this.resetIdleTimer();
        }
    }

    /**
     * Checks and handles the character's movement to the left.
     */
    checkLeftMovement() {
        if (this.world.keyboard.LEFT && this.x > 100) {
            this.moveLeft();
            this.otherDirection = true;
            if (!this.isAboveGround()) {
                this.walking_sound.play();
            }
            this.resetIdleTimer();
        }
    }

    /**
     * Checks and handles the character's jump action.
     */
    checkJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround() && !this.isJumping) {
            this.isJumping = true;
            this.jump();
            this.jump_sound.play();
            this.playJumpAnimation();
            this.resetIdleTimer();
        }
    }

    /**
     * Plays the jump animation once when the character jumps.
     */
    playJumpAnimation() {
        this.currentImage = 0;
        this.jumpAnimationPlaying = true;
        const jumpInterval = setInterval(() => {
            if (this.currentImage < this.IMAGES_JUMP.length) {
                this.playAnimation(this.IMAGES_JUMP);
            } else {
                clearInterval(jumpInterval);
                this.isJumping = false;
                this.jumpAnimationPlaying = false;
            }
        }, 110);
    }

    /**
     * Updates the idle state of the character based on keyboard activity.
     */
    updateIdleState() {
        if (this.world.keyboard.SPACE || this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.KEY_D) {
            this.resetIdleTimer();
        } else {
            this.incrementIdleTime();
        }
    }

    /**
     * Handles the character's animation based on its state.
     */
    handleAnimation() {
        setInterval(() => {
            if (this.isDead()) {
                this.handleDeath();
            } else if (this.isHurt()) {
                this.handleHurt();
            } else if (this.isJumping) {
                if (!this.jumpAnimationPlaying) {
                    this.playJumpAnimation();
                }
            } else if (this.isAboveGround()) {
                this.img = this.imageCache[this.IMAGES_JUMP[this.IMAGES_JUMP.length - 1]];
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.isIdle) {
                this.playAnimation(this.IMAGES_SLEEPING);
            } else {
                this.playAnimation(this.IMAGES_STANDING);
            }
        }, 100);
    }

    /**
 * Handles the character's death animation and triggers the game over.
 */
handleDeath() {
    if (!this.isDeadAnimationPlaying) {
        this.startDeathAnimation();
    }
}

/**
 * Starts the death animation and schedules the game over sequence.
 */
startDeathAnimation() {
    this.isDeadAnimationPlaying = true;
    this.dead = true;
    this.currentImage = 0;

    this.deathInterval = setInterval(() => {
        if (this.currentImage < this.IMAGES_DEAD.length) {
            this.playAnimation(this.IMAGES_DEAD);
        } else {
            clearInterval(this.deathInterval);
            this.scheduleGameOver();
        }
    }, 150);
}

/**
 * Schedules the game over sequence with a delay.
 */
scheduleGameOver() {
    if (!this.endGameTriggered) {
        this.endGameTriggered = true; 
        setTimeout(() => {
            this.world.endGameCharacterDead();
            this.youLost_sound.play();
            this.isDeadAnimationPlaying = false;  
        }, 1000); 
    }
}
    /**
     * Handles the character's hurt animation and sound.
     */
    handleHurt() {
        if (!this.isDeadAnimationPlaying) { // Don't play hurt animation if dead animation is playing
            this.playAnimation(this.IMAGES_HURT);
            if (!this.hurt_sound.playing) this.hurt_sound.play();
        }
    }

    /**
     * Makes the character jump by setting the vertical speed.
     */
    jump() {
        this.speedY = 17;
    }

    /**
     * Resets the idle timer and state.
     */
    resetIdleTimer() {
        this.idleTime = 0;
        this.isIdle = false;
    }

    /**
     * Increments the idle time and checks if the character should switch to idle animation.
     */
    incrementIdleTime() {
        this.idleTime += 1000 / 60;
        if (this.idleTime > 5000) {
            this.isIdle = true;
        }
    }

    /**
     * Checks if the character is landing on an enemy.
     * @param {MovableObject} enemy - The enemy object to check collision with.
     * @returns {boolean} True if the character is landing on the enemy, false otherwise.
     */
    isLandingOnEnemy(enemy) {
        if (!enemy.dead && this.speedY < 0) {
            // Verwenden Sie `offset` für präzisere Grenzen
            const characterBottom = this.y + this.height - this.offset.bottom;
            const enemyTop = enemy.y + enemy.offset.top;

            const overlapY = characterBottom >= enemyTop && characterBottom <= enemy.y + enemy.height / 2;
            const overlapX = this.x + this.width - this.offset.right > enemy.x + enemy.offset.left &&
                this.x + this.offset.left < enemy.x + enemy.width - enemy.offset.right;

            return overlapY && overlapX;
        }
        return false;
    }

    /**
     * Makes the character bounce upwards after landing on an enemy.
     */
    bounce() {
        this.speedY = 17;
        this.y = 80;
        this.isJumping = true;
        this.playJumpAnimation();
    }
}
