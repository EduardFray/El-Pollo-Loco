class DrawableObjects {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 180;
    height = 150;
    width = 100;

    /**
     * Loads a single image from the specified path and sets it as the current image.
     * @param {string} path - The file path of the image to be loaded.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images from an array of paths into the image cache.
     * @param {Array<string>} array - An array of image paths to be loaded into the cache.
     */
    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the current image of this object onto the specified canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context on which to draw the image.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a blue border around the object's image on the canvas for debugging purposes.
     * This method is applicable to instances of Character, Chicken, SmallChicken, BottleGround, Coin, and Endboss.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context on which to draw the frame.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof BottleGround || this instanceof Coin || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "3";
            ctx.strokeStyle = "blue";
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
        }
    }
}