class ThrowableObject extends MovableObject {
    speed = 0.15;

    IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
     * Initializes a throwable object at a specific position with a direction and character speed.
     * @param {number} x - The initial x-coordinate of the throwable object.
     * @param {number} y - The initial y-coordinate of the throwable object.
     * @param {boolean} otherDirection - Indicates if the object should move in the opposite direction.
     * @param {number} characterSpeed - The speed of the character throwing the object, affecting the throw speed.
     */
    constructor(x, y, otherDirection, characterSpeed) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES); 
        this.x = x;
        this.y = y;
        this.height = 60; 
        this.width = 50; 
        this.otherDirection = otherDirection; 
        this.characterSpeed = characterSpeed; 
        this.throw(); 
    }

    /**
     * Handles the throwing motion of the object, applying gravity and calculating speed.
     * The object moves based on its initial direction and the speed of the character.
     */
    throw() {
        this.speedY = 7; 
        this.applyGravity(); 
        const baseThrowSpeed = 10; 
        const throwSpeed = baseThrowSpeed + Math.abs(this.characterSpeed); 
        setInterval(() => {
            this.x += this.otherDirection ? -throwSpeed : throwSpeed; 
        }, 25); 
    }

    /**
     * Animates the throwable object using a set of images.
     * This creates the illusion of rotation or movement for the object.
     * @param {string[]} images - The set of images to animate the object with.
     */
    animate(images) {
        setInterval(() => {
            this.playAnimation(images); 
        }, 1000 / 25); 
    }
}
