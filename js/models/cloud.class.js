class Cloud extends MovableObject {
    y = 10;
    width = 500;
    height = 250;
    offset = {
        top: 10,
        left: 0,
        right: 0,
        bottom: 150
    };

    /**
     * Initializes a cloud with a random horizontal position and speed.
     * Loads the cloud image and starts the animation.
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 100 + Math.random() * 3000; // Random starting position on the x-axis
        this.speed = 0.05 + Math.random() * 0.15; // Random speed for cloud movement
        this.animate();
    }

    /**
     * Animates the cloud by continuously moving it to the left.
     * This simulates the cloud drifting across the sky.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60); // Move left at 60 frames per second
    }

    /**
     * Resets the cloud's position to a new random location on the x-axis.
     * Used when resetting the game or when a cloud needs to be repositioned.
     */
    reset() {
        this.x = Math.random() * 2000; // Random new starting position on the x-axis
    }
}