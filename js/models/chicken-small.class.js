class SmallChicken extends MovableObject {

    height = 50;
    width = 50;
    y = 380;
    isHurt = false;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';
    offset = {
        top:  5,
        left: 5,
        right: 5,
        bottom: 5 
    };

    /**
     * Constructs a SmallChicken instance and initializes its properties.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.imageCache[this.IMAGE_DEAD] = new Image();
        this.imageCache[this.IMAGE_DEAD].src = this.IMAGE_DEAD;
        this.x = 400 + Math.random() * 2500;
        this.speed = 0.25 + Math.random() * 0.35;
        this.animate();
    }

    /**
     * Animates the SmallChicken by moving it left and cycling through its images.
     */
    animate() {
        setInterval(() => {
            if (!this.dead) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.dead) {
                this.img = this.imageCache[this.IMAGE_DEAD];
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }

    /**
     * Resets the SmallChicken to its initial state and position.
     */
    reset() {
        this.x = 400 + Math.random() * 2500; 
        this.speed = 0.15 + Math.random() * 0.25; 
        this.dead = false; 
        this.isHurt = false; 
        this.img = this.imageCache[this.IMAGES_WALKING[0]]; 
    }
}