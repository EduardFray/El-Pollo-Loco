let canvas;
let world;
let keyboard = new Keyboard();
let chicken_sound;
let game_music;

/**
 * Initializes the game by setting up the canvas, drawing the start screen, and configuring audio settings.
 */
function init() {
    canvas = document.getElementById('canvas');
    drawStartScreen();
    chickenSettings();
    musicSettings();
    addHUDListeners();
    restoreMuteState();
}

/**
 * Restores the mute state when the page loads.
 */
function restoreMuteState() {
    const isMuted = localStorage.getItem('isMuted') === 'true';

    // Apply the mute state to the world if initialized
    if (world) {
        world.setMute(isMuted);
    }

    // Update the icon based on the mute state
    const icon = document.getElementById('volumeIcon');
    icon.src = isMuted ? 'img/no-sound.png' : 'img/volume.png';

    // Mute/unmute global sounds directly
    if (chicken_sound && game_music) {
        chicken_sound.muted = isMuted;
        game_music.muted = isMuted;
    }
}

/**
 * Configures the chicken walking sound settings.
 */
function chickenSettings() {
    chicken_sound = new Audio('audio/chicken-walking.mp3');
    chicken_sound.loop = true;
    chicken_sound.volume = 0.025;
}

/**
 * Configures the background music settings.
 */
function musicSettings() {
    game_music = new Audio('audio/music.mp3');
    game_music.loop = true;
    game_music.volume = 0.5;
}

/**
 * Draws the start screen and displays the start button.
 */
function drawStartScreen() {
    let ctx = canvas.getContext('2d');
    let startScreenImage = new Image();
    startScreenImage.src = 'img/9_intro_outro_screens/start/startscreen_1.png';
    startScreenImage.onload = () => {
        ctx.drawImage(startScreenImage, 0, 0, 720, 480);
        document.getElementById('startButton').style.display = 'block';
    }
}

/**
 * Starts the game, hides the start button, and initializes the game world.
 */
function startGame() {
    document.getElementById('startButton').style.display = 'none';
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height); // Clear start screen
    world = new World(canvas, keyboard);
    world.gameStarted = true;
    world.resetHandler.reset();
    addKeyboardListeners();
    world.draw(); // Start drawing the world
    chicken_sound.play();
    game_music.play();
    restoreMuteState(); // Apply mute state after world is initialized
}

/**
 * Resets the game world and restarts the game.
 */
function tryAgain() {
    world.resetHandler.reset();
    world.character.reset();
    document.getElementById('tryAgainBtn').style.display = 'none'; 
    world.draw(); 

    const isMuted = localStorage.getItem('isMuted') === 'true';
    world.setMute(isMuted);
    chicken_sound.muted = isMuted;
    game_music.muted = isMuted;
}


/**
 * Adds keyboard event listeners to handle game controls.
 */
function addKeyboardListeners() {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
}

/**
 * Handles keydown events to update keyboard states.
 * @param {KeyboardEvent} event - The keyboard event.
 */
function handleKeyDown(event) {
    preventScroll(event);

    if (event.key === 'ArrowRight') {
        keyboard.RIGHT = true;
    } else if (event.key === 'ArrowLeft') {
        keyboard.LEFT = true;
    } else if (event.key === 'ArrowUp') {
        keyboard.UP = true;
    } else if (event.key === 'ArrowDown') {
        keyboard.DOWN = true;
    } else if (event.key === ' ') {
        keyboard.SPACE = true;
    } else if (event.key === 'd' || event.key === 'D') {
        keyboard.KEY_D = true;
    }

    console.log(event);
}

/**
 * Handles keyup events to reset keyboard states.
 * @param {KeyboardEvent} event - The keyboard event.
 */
function handleKeyUp(event) {
    if (event.key === 'ArrowRight') {
        keyboard.RIGHT = false;
    } else if (event.key === 'ArrowLeft') {
        keyboard.LEFT = false;
    } else if (event.key === 'ArrowUp') {
        keyboard.UP = false;
    } else if (event.key === 'ArrowDown') {
        keyboard.DOWN = false;
    } else if (event.key === ' ') {
        keyboard.SPACE = false;
    } else if (event.key === 'd' || event.key === 'D') {
        keyboard.KEY_D = false;
    }

    console.log(event);
}

/**
 * Prevents the default scrolling behavior for certain keys.
 * @param {KeyboardEvent} event - The keyboard event.
 */
function preventScroll(event) {
    if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", " "].includes(event.key)) {
        event.preventDefault();
    }
}

function addHUDListeners() {
    // Linksknopf
    document.getElementById('leftBtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('leftBtn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('leftBtn').addEventListener('mousedown', () => {
        keyboard.LEFT = true;
    });
    document.getElementById('leftBtn').addEventListener('mouseup', () => {
        keyboard.LEFT = false;
    });
    document.getElementById('leftBtn').addEventListener('mouseleave', () => {
        keyboard.LEFT = false;
    });

    // Rechtsknopf
    document.getElementById('rightBtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('rightBtn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('rightBtn').addEventListener('mousedown', () => {
        keyboard.RIGHT = true;
    });
    document.getElementById('rightBtn').addEventListener('mouseup', () => {
        keyboard.RIGHT = false;
    });
    document.getElementById('rightBtn').addEventListener('mouseleave', () => {
        keyboard.RIGHT = false;
    });

    // Springknopf
    document.getElementById('jumpBtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('jumpBtn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById('jumpBtn').addEventListener('mousedown', () => {
        keyboard.SPACE = true;
    });
    document.getElementById('jumpBtn').addEventListener('mouseup', () => {
        keyboard.SPACE = false;
    });
    document.getElementById('jumpBtn').addEventListener('mouseleave', () => {
        keyboard.SPACE = false;
    });

    // Wurfknopf
    document.getElementById('thorwBtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.KEY_D = true;
    });
    document.getElementById('thorwBtn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.KEY_D = false;
    });
    document.getElementById('thorwBtn').addEventListener('mousedown', () => {
        keyboard.KEY_D = true;
    });
    document.getElementById('thorwBtn').addEventListener('mouseup', () => {
        keyboard.KEY_D = false;
    });
    document.getElementById('thorwBtn').addEventListener('mouseleave', () => {
        keyboard.KEY_D = false;
    });
}


/**
 * Adjusts the canvas size when toggling fullscreen mode.
 */
function adjustCanvasSizeForFullscreen() {
    const canvas = document.getElementById('canvas');
    if (document.fullscreenElement) {
        // Use CSS to set the size to 100% of the viewport
        canvas.style.width = '100%';
        canvas.style.height = '100vh';
    } else {
        // Reset CSS styles
        canvas.style.width = '720px';
        canvas.style.height = '480px';
    }
}

function toggleGameUI(fullscreen) {
    const uiElements = document.querySelectorAll('.game-ui');
    uiElements.forEach(el => {
        el.style.display = fullscreen ? 'none' : 'flex'; // oder 'block', abhängig von deinem Layout
    });
}

/**
 * Toggles fullscreen mode for the canvas container.
 */
function canvasFullscreen() {
    let fullscreenElement = document.getElementById('fullscreen-canvas');
    if (document.fullscreenElement) {
        closeFullscreen();
        toggleGameUI(false);  // UI einblenden, wenn Vollbildmodus verlassen wird
    } else {
        openFullscreen(fullscreenElement);
        toggleGameUI(true);  // UI ausblenden, wenn Vollbildmodus betreten wird
    }
}

/**
 * Requests fullscreen mode for a specified element.
 */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen().then(() => {
            adjustCanvasSizeForFullscreen(); // Stelle sicher, dass die Größe nach dem Wechsel angepasst wird
            toggleGameUI(true);  // Stelle sicher, dass die UI Elemente ausgeblendet werden
        });
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen().then(() => {
            adjustCanvasSizeForFullscreen();
            toggleGameUI(true);
        });
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen().then(() => {
            adjustCanvasSizeForFullscreen();
            toggleGameUI(true);
        });
    }
}

/**
 * Exits fullscreen mode and adjusts canvas size accordingly.
 */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
            adjustCanvasSizeForFullscreen(); // Ensure size is adjusted after exiting fullscreen
        });
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen().then(() => {
            adjustCanvasSizeForFullscreen();
        });
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen().then(() => {
            adjustCanvasSizeForFullscreen();
        });
    }
}


// Event Listener für Änderungen im Vollbildstatus
document.addEventListener('fullscreenchange', adjustCanvasSizeForFullscreen);
document.addEventListener('webkitfullscreenchange', adjustCanvasSizeForFullscreen);
document.addEventListener('msfullscreenchange', adjustCanvasSizeForFullscreen);

/**
 * Switches the audio icon and mutes/unmutes all game sounds.
 */
function switchIcon() {
    let icon = document.getElementById('volumeIcon');
    let isCurrentlyMuted = icon.src.includes('no-sound'); // Überprüfen, ob das aktuelle Symbol für Stummschaltung steht
    let isMuted = !isCurrentlyMuted;
    icon.src = isMuted ? 'img/no-sound.png' : 'img/volume.png';

    if (world) {
        world.setMute(isMuted);
    }

    chicken_sound.muted = isMuted;
    game_music.muted = isMuted;
    localStorage.setItem('isMuted', isMuted.toString());
}

function checkOrientation() {
    const overlay = document.getElementById('rotateOverlay');
    if (window.innerWidth <= 768 && window.innerHeight > window.innerWidth) {
        overlay.style.display = 'block';
    } else {
        overlay.style.display = 'none';
    }
}


window.addEventListener('load', checkOrientation);
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);


