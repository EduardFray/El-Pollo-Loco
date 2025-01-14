class CollisionHandler {
    constructor(world) {
        this.world = world;
    }

    /**
     * Checks for collisions between the character and enemies.
     */
    checkCollisions() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.world.character.isLandingOnEnemy(enemy)) {
                console.log("Landed on enemy");
                this.world.character.bounce();
                enemy.die();
                this.world.playSound(this.world.enemyDeathSound);
            } else if (!enemy.dead && this.world.character.isColliding(enemy)) {
                console.log("Collided with enemy");
                this.world.character.hit();
                this.world.statusBar.setPercentage(this.world.character.energy);
            }
            this.checkBottleCollisions(enemy);
        });
        this.checkEndbossCollisions();
    }

    /**
     * Checks if the character is landing on any enemies.
     */
    checkLandingOnEnemy() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.world.character.isLandingOnEnemy(enemy)) {
                console.log("Landed on enemy");
                this.world.character.bounce();
                enemy.die();
                this.world.playSound(this.world.enemyDeathSound);
            }
        });
    }

    /**
     * Checks for collisions between the character and collectible objects like coins and bottles.
     */
    checkCollisionsWithObjects() {
        this.checkCoinCollisions();
        this.checkBottleOnGroundCollisions();
    }

    /**
     * Checks for collisions between the character and coins, updating the game state accordingly.
     */
    checkCoinCollisions() {
        this.world.level.coin.forEach((coin, index) => {
            if (this.world.character.isColliding(coin)) {
                this.world.level.coin.splice(index, 1); // Remove the coin from the level
                this.world.collectedCoins++;
                this.world.statusBarCoin.setCoinProgress(this.world.collectedCoins); // Update coin status bar
                this.world.playSound(this.world.coinSound);
            }
        });
    }

    /**
     * Checks for collisions between the character and bottles on the ground, updating the game state accordingly.
     */
    checkBottleOnGroundCollisions() {
        this.world.level.bottle_ground.forEach((bottle, index) => {
            if (this.world.character.isColliding(bottle) && this.world.collectedBottles < 5) { // Max 5 bottles
                this.world.level.bottle_ground.splice(index, 1);
                this.world.collectedBottles++;
                this.world.statusBarBottle.setBottlePercentage(this.world.collectedBottles);
                this.world.playSound(this.world.bottleSound);
            }
        });
    }

    /**
     * Checks for collisions between the character and the Endboss.
     */
    checkEndbossCollisions() {
        const endboss = this.world.level.enemies.find(enemy => enemy instanceof Endboss);
        if (endboss && !endboss.dead) {
            if (this.world.character.isColliding(endboss)) {
                console.log("Collided with endboss");
                this.world.character.hit();
                this.world.statusBar.setPercentage(this.world.character.energy);
            }

            this.checkBottleCollisions(endboss);
        }
    }

    /**
     * Checks for collisions between throwable bottles and enemies.
     * @param {Enemy} enemy - The enemy to check collisions with.
     */
    checkBottleCollisions(enemy) {
        this.world.throwableObjects.forEach((bottle, bottleIndex) => {
            if (!enemy.dead && !enemy.isHurt && bottle.isColliding(enemy)) {
                console.log("Bottle hit enemy");
                if (enemy instanceof Endboss) {
                    enemy.hit();
                } else {
                    enemy.die();
                }
                this.world.playSound(this.world.glassCrushSound); // Sound for bottle collision
                this.world.throwableObjects.splice(bottleIndex, 1); // Remove the bottle after collision
            }
        });
    }
}
