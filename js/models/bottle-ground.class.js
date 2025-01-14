class BottleGround extends MovableObject {

    y = 365;
    height = 60;
    width = 60;

    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    offset = {
        top:  10,
        left: 22,
        right: 10,
        bottom: 5 
    };

    /**
     * Constructs a BottleGround object.
     * Initializes the position and image of the bottle on the ground.
     */
    constructor() {
        super();
        this.loadImage(this.getRandomImage());
        this.x = 300 + Math.random() * 1200;
        this.reset();
    }

    /**
     * Retrieves a random image path from the available bottle images.
     * @returns {string} A random image path for the bottle.
     */
    getRandomImage() {
        return this.IMAGES[Math.floor(Math.random() * this.IMAGES.length)];
    }

    /**
     * Resets the position and image of the bottle on the ground.
     * Sets a new random position and loads a new random image.
     */
    reset() {
        this.x = 300 + Math.random() * 1200;  // Neue Position zufällig setzen
        this.loadImage(this.getRandomImage());  // Neues Bild laden
    }
}