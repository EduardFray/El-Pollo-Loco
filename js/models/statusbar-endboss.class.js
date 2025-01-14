class StatusBarEndboss extends DrawableObjects {

    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ];

    percentage = 100;

    /**
     * Initializes a new StatusBarEndboss instance, loading all necessary images and setting the initial state.
     */
    constructor() {
        super();
        this.loadImage('img/7_statusbars/2_statusbar_endboss/orange/orange0.png');
        this.loadImages(this.IMAGES);
        this.x = 400;
        this.y = 10;
        this.height = 50;
        this.width = 200;
        this.setPercentage(100);
    }

    /**
     * Sets the Endboss health percentage and updates the displayed image accordingly.
     * @param {number} percentage - The current health percentage of the Endboss (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage; // Set the current percentage
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the appropriate image index based on the current health percentage.
     * @returns {number} The index of the image to display from the IMAGES array.
     */
    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
