class StatusBarBottle extends DrawableObjects {
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    maxBottles = 5;
    collectedBottles = 0;

    /**
     * Constructs a StatusBarBottle instance, initializes its properties, and sets the default image.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.y = 80;
        this.height = 50;
        this.width = 200;
        this.setBottlePercentage(0);
    }

    /**
     * Updates the bottle status bar based on the number of collected bottles.
     * @param {number} collectedBottles - The number of bottles collected.
     */
    setBottlePercentage(collectedBottles) {
        this.collectedBottles = collectedBottles;
        let percentage = (this.collectedBottles / this.maxBottles) * 100;
        let path = this.IMAGES[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the appropriate image index based on the percentage of collected bottles.
     * @param {number} percentage - The percentage of bottles collected.
     * @returns {number} The index of the image to display.
     */
    resolveImageIndex(percentage) {
        if (percentage == 100) {
            return 5;
        } else if (percentage >= 80) {
            return 4;
        } else if (percentage >= 60) {
            return 3;
        } else if (percentage >= 40) {
            return 2;
        } else if (percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}