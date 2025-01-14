class StatusBarCoin extends DrawableObjects {
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    maxCoins = 10;
    collectedCoins = 0;

    /**
     * Constructs a StatusBarCoin instance, initializes its properties, and sets the default image.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.y = 40;
        this.height = 50;
        this.width = 200;
        this.setCoinProgress(0);
    }

    /**
     * Updates the coin status bar based on the number of collected coins.
     * @param {number} collectedCoins - The number of coins collected.
     */
    setCoinProgress(collectedCoins) {
        this.collectedCoins = collectedCoins;
        let percentage = (this.collectedCoins / this.maxCoins) * 100;
        let path = this.IMAGES[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the appropriate image index based on the percentage of collected coins.
     * @param {number} percentage - The percentage of coins collected.
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