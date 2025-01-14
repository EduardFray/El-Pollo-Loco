class Coin extends MovableObject {
    height = 75;
    width = 75;
    offset = {
        top:  25,
        left: 25,
        right: 25,
        bottom: 25 
    };

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * Constructs a Coin instance and initializes its properties.
     */
    constructor() {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = 400 + Math.random() * 1800;
        this.y = 120 + Math.random() * 250;
        this.animate();
    }

    /**
     * Animates the Coin by cycling through its images to create a spinning effect.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 1000 / 5);
    }

    /**
     * Resets the Coin's state to indicate it has not been collected.
     */
    reset() {
        this.collected = false;  // Noch nicht eingesammelt
    }
}