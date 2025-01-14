class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottle_ground;
    coin;
    level_end_x = 2200;
    level_endboss_trigger = 2100;

    /**
     * Creates an instance of a Level with specified game objects.
     * @param {Array<Enemy>} enemies - The list of enemies present in the level.
     * @param {Array<Cloud>} clouds - The list of clouds present in the level.
     * @param {Array<BackgroundObject>} backgroundObjects - The background objects in the level.
     * @param {Array<BottleGround>} bottle_ground - The list of bottles on the ground.
     * @param {Array<Coin>} coin - The list of coins in the level.
     */
    constructor(enemies, clouds, backgroundObjects, bottle_ground, coin) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottle_ground = bottle_ground;
        this.coin = coin;
    }
}