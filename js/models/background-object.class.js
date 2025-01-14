/**
 * Represents a background object in the game.
 * Extends MovableObject to utilize basic properties and methods for rendering.
 */
class BackgroundObject extends MovableObject {
    /** @type {number} */
    width = 720;

    /** @type {number} */
    height = 480;

    /**
     * Constructs a BackgroundObject with a specified image and position.
     * @param {string} imagePath - The path to the image used for the background object.
     * @param {number} x - The x-coordinate of the background object.
     * @param {number} y - The y-coordinate of the background object.
     */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.y = y;
        this.x = x;
    }
}
