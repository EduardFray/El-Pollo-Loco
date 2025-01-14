class AudioManager {
    /**
     * Creates an instance of AudioManager.
     * @param {World} world - The game world instance that this manager is associated with.
     */
    constructor(world) {
        this.world = world;
        this.audioElements = [];
        this.collectAudioElements();
    }

    /**
     * Collects all audio elements used in the game and stores them in the audioElements array.
     */
    collectAudioElements() {
        this.audioElements = [
            this.world.character.walking_sound,
            this.world.character.jump_sound,
            this.world.character.hurt_sound,
            this.world.character.youLost_sound,
            this.world.youWinSound, 
            this.world.youLostSound, 
            this.world.throwSound,
            this.world.enemyDeathSound,
            this.world.coinSound,
            this.world.bottleSound,
            this.world.glassCrushSound,
            chicken_sound,
            game_music
        ];
    }

    /**
     * Mutes or unmutes all collected audio elements in the game.
     * @param {boolean} mute - If true, mutes all sounds; otherwise, unmutes them.
     */
    setMute(mute) {
        this.audioElements.forEach(audio => {
            audio.muted = mute;
        });
    }
}
