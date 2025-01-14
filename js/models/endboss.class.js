class Endboss extends MovableObject {

    y = 60;
    height = 400;
    width = 250;
    hitPoints = 5;
    isHurt = false;
    moving = false;
    speedY = 0;
    acceleration = 1;
    speed = 5;
    offset = {
        top: 90,
        left: 30,
        right: 60,
        bottom: 15
    };
    win_sound = new Audio('audio/you-win.mp3');

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Initializes the Endboss with its images and animations, setting its position and starting conditions.
     */
    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500; 
        this.animate();
        this.applyGravity();
    }

    /**
     * Handles the animation and movement of the Endboss.
     * Plays animations and moves the Endboss according to its state (walking, attacking, etc.).
     */
    animate() {
        setInterval(() => {
            if (this.dead) {
                return;
            }
            if (this.moving) {
                this.playAnimation(this.IMAGES_WALK);
                this.moveLeft();
            } else {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 200);

        setInterval(() => {
            if (this.moving && !this.dead && !this.isHurt) {
                this.attack();
            }
        }, 2000); //Attack after 2 sec
    }

    /**
     * Starts the movement of the Endboss.
     * This method sets the moving state to true, allowing the Endboss to walk and attack.
     */
    startMoving() {
        this.moving = true;
    }

    /**
     * Handles the Endboss being hit, reducing its hit points and updating its status.
     * Plays the hurt animation and checks if the Endboss should die.
     */
    hit() {
        if (this.isHurt || this.dead) return; 

        this.hitPoints--;
        this.updateStatusBar(); 

        if (this.hitPoints > 0) {
            this.playHurtAnimation();
        } else {
            this.die();
        }
    }

    /**
     * Updates the status bar of the Endboss based on its current hit points.
     * Calculates the health percentage and sets it on the status bar.
     */
    updateStatusBar() {
        const healthPercentage = (this.hitPoints / 5) * 100;
        this.world.statusBarEndboss.setPercentage(healthPercentage);
    }

    /**
     * Plays the hurt animation for the Endboss, indicating it has been damaged.
     * The animation runs for a specified duration and interval.
     */
    playHurtAnimation() {
        this.isHurt = true;
        let hurtDuration = 2000; 
        let hurtInterval = 100; 
        let elapsed = 0; 

        let interval = setInterval(() => {
            this.playAnimation(this.IMAGES_HURT);
            elapsed += hurtInterval;

            if (elapsed >= hurtDuration) {
                clearInterval(interval);
                this.isHurt = false; 
            }
        }, hurtInterval);
    }

    /**
     * Handles the death of the Endboss, playing the dead animation and triggering the end of the game.
     * The Endboss moves down after dying and the end game is delayed for dramatic effect.
     */
    die() {
        this.dead = true;
        let currentFrame = 0;
        let dieInterval = setInterval(() => {
            if (currentFrame < this.IMAGES_DEAD.length) {
                this.playAnimation(this.IMAGES_DEAD);
                currentFrame++;
            } else {
                clearInterval(dieInterval);
                this.img = this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]]; 
                this.moveDown();
                setTimeout(() => { 
                    this.world.endGame();
                }, 4000); 
            }
        }, 200);
    }

    /**
     * Moves the Endboss downward when it dies.
     * This method animates the Endboss slowly falling off the screen.
     */
    moveDown() {
        let moveDownInterval = setInterval(() => {
            if (this.y < canvas.height) { 
                this.y += 10; 
            } else {
                clearInterval(moveDownInterval);
            }
        }, 100);
    }

    /**
     * Executes an attack by the Endboss, involving jumping and moving towards the player.
     * The attack animation and movement are executed at a set interval.
     */
    attack() {
        this.speedY = 20; 
        this.speed = 12; 
        let frameInterval = 80; 
    
        let attackInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_ATTACK); 
            this.y -= this.speedY; 
            this.x -= this.speed; 
            this.speedY -= this.acceleration; 
    
            if (this.y >= 60) { 
                this.y = 60; 
                this.speedY = 0; 
                clearInterval(attackInterval); 
            }
        }, frameInterval); 
    }

    /**
     * Determines if the Endboss is above the ground.
     * Used to check if the Endboss is in the air during its attack or other movements.
     * @returns {boolean} - Returns true if the Endboss is above ground level.
     */
    isAboveGround() {
        return this.y < 60; 
    }

    /**
     * Resets the Endboss to its initial state, including position, health, and animations.
     * Used when the game is reset or restarted.
     */
    reset() {
        this.x = 2500;  
        this.y = 60;    
        this.hitPoints = 5;  
        this.isHurt = false; 
        this.dead = false;   
        this.moving = false; 
        this.img = this.imageCache[this.IMAGES_ALERT[0]]; 
        this.updateStatusBar(); 
    }
}