class ResetHandler {
    /**
     * Creates an instance of ResetHandler.
     * @param {World} world - The game world instance that this handler is associated with.
     */
    constructor(world) {
        this.world = world;
    }

    /**
     * Resets the game world to its initial state, including the character, collectibles, and environment.
     */
    reset() {
        this.world.character.reset();  // Reset character
        this.world.collectedCoins = 0;
        this.world.collectedBottles = 0;
        this.world.statusBar.setPercentage(this.world.character.energy);
        this.world.statusBarCoin.setCoinProgress(this.world.collectedCoins);
        this.world.statusBarBottle.setBottlePercentage(this.world.collectedBottles);

        // Reset all enemies and objects
        this.world.level.enemies.forEach(enemy => enemy.reset());
        this.resetCoinsAndBottles(); // Reset all coins and bottles
        this.world.level.clouds.forEach(cloud => cloud.reset());

        // Empty the array of thrown bottles
        this.world.throwableObjects = [];

        this.world.camera_x = 0;
        this.world.gameStarted = true;

        // Reactivate sounds
        this.world.setMute(false);
        chicken_sound.play();
        game_music.play();
    }

    /**
     * Resets all coins and bottles to their initial states, distributing bottles randomly.
     */
    resetCoinsAndBottles() {
        // Reset all coins and bottles to their initial states
        this.world.level.coin.forEach(coin => coin.reset());

        this.world.level.bottle_ground = [];
        for (let i = 0; i < 5; i++) {  // Reset bottles and distribute them randomly
            let newBottle = new BottleGround();
            this.world.level.bottle_ground.push(newBottle);
        }
    }
}