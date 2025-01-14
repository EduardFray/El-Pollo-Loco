class MovableObject extends DrawableObjects {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;
    dead = false;
    invulnerable = false;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Checks if the object is colliding with another movable object.
     * @param {MovableObject} mo - The other movable object to check collision with.
     * @returns {boolean} True if there is a collision, false otherwise.
     */
    isColliding(mo) {
        if (mo.dead) {
            return false; // Keine Kollision, wenn das Objekt tot ist
        }
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Moves the object to the right based on its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left based on its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Plays an animation using a sequence of images.
     * @param {string[]} images - Array of image paths to animate.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Applies gravity to the object, affecting its vertical position.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.speedY = 0; // Reset speed when on the ground
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    /**
     * Makes the object jump by setting its vertical position.
     */
    jump() {
        this.y = 40;
    }

    /**
     * Reduces the object's energy and applies a temporary invulnerability period.
     */
    hit() {
        if (!this.invulnerable) {
            this.energy -= 20;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
                this.invulnerable = true;
                setTimeout(() => {
                    this.invulnerable = false;
                }, 500); // 500 Millisekunden Unverwundbarkeit
            }
        }
    }

    /**
     * Checks if the object is dead (energy is zero).
     * @returns {boolean} True if the object is dead, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Checks if the object is currently hurt (recently hit).
     * @returns {boolean} True if the object is hurt, false otherwise.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Difference in milli sec
        timePassed = timePassed / 1000; // Difference in seconds
        return timePassed < 1;
    }

    /**
     * Marks the object as dead and stops its movement.
     */
    die() {
        this.dead = true;
        this.speed = 0;
    }
}