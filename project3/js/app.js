// Enemies our player must avoid
const Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';


    // Randomize enemy speed
    this.speed = Math.floor(Math.random() * 3) + .5;

    // Set enemy start position
    this.x = -100;
    this.y = y;

    //Enemy attributes
    this.width = 95;
    this.height = 15;

    // Enemy boundary variables
    this.xBoundaryMin = -100;
    this.xBoundaryMax = 500;


};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    const move = 200 * dt * this.speed;

    if (this.x < this.xBoundaryMax) {
        this.x += move;
    } else {
        this.x = this.xBoundaryMin;
        this.updateSpeed();
        this.updateLane();
    }

    this.checkCollision(player);
};

// Method to change enemy speed, used on respawn
Enemy.prototype.updateSpeed = function() {
    this.speed = Math.floor(Math.random() * 3) +1;
};

// Method to change enemy lane, used on respawn
Enemy.prototype.updateLane = function() {
    const lanes = [50, 135, 220];

    this.y = lanes[Math.floor(Math.random() * lanes.length)];
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemy collision check with player. Player dies if collision occurs
Enemy.prototype.checkCollision = function(player) {
    if (this.x < player.x + player.width &&
        this.x + this.width > player.x &&
        this.y - this.height === player.y) {

        player.die()
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';

    // Starting player position
    this.playerStartx = 200;
    this.playerStarty = 375;
    this.x = this.playerStartx;
    this.y = this.playerStarty;

    //Player attributes
    this.width = 65;

    // Player boundary variables
    this.xBoundaryMin = 0;
    this.xBoundaryMax = 400;
    this.yBoundaryMin = -50;
    this.yBoundaryMax = 375;

    // Player score
    this.gameScore = 0;

    // Player lives
    this.lives = 5;
};

/*
update method continuously running in game engine. Used to update player
position and run player object checkScore method
*/
Player.prototype.update = function(x=0, y=0) {
    this.x += x;
    this.y += y;

    this.checkScore()
};

//Method used to reset player position
Player.prototype.reset = function() {
    this.x = this.playerStartx;
    this.y = this.playerStarty;
};

// Method used to increment score
Player.prototype.score = function() {
    this.gameScore += 1;
    this.reset();
    this.updateScore();
};

// Method used to check player position for scoring
Player.prototype.checkScore = function () {
    if (this.y === -50) {
        this.score();
    }
};

// Player position is reset and a life is lost after a player dies.
Player.prototype.die = function () {
    this.lives -= 1;
    this.reset();
    this.updateLives();
    this.checkLose();
};

// Check player total lives, runs game end method if lives are 0
Player.prototype.checkLose = function () {
    if (this.lives === 0) {
        this.endGame();
    }
};

// Page score results
Player.prototype.updateScore = function(){
    const scoreDiv = document.querySelector('.game-grid__score');
    const scoreValue = player.gameScore;
    scoreDiv.innerHTML = `Score: ${scoreValue}`;
};

// Method updates page score element
Player.prototype.updateLives = function(){
    const livesDiv = document.querySelector('.game-grid__lives');
    const livesValue = player.lives;
    livesDiv.innerHTML = `Lives: ${livesValue}`;
};

// Run end game sequence
Player.prototype.endGame = function(){
    // New modal and elements created
    const endGameModal = new Modal(document.querySelector('.game-modal__modal-overlay'));
    const restartButton = document.querySelector('.game-modal__btn-play');
    const endScore = document.createElement("h3");

    // Update endScore element to reflect player's final score
    endScore.innerHTML = `Your Score: ${this.gameScore}`;

    // Change restart button text and add game restart click even listener
    restartButton.innerHTML = 'Play Again';
    restartButton.parentElement.appendChild(restartButton);
    restartButton.parentElement.appendChild(endScore);
    restartButton.addEventListener('click', this.restartGame());

    // Display new endGameModal in DOM
    window.openmodal = endGameModal.open.bind(endGameModal);
    window.openmodal();
};

// Game restart player method
Player.prototype.restartGame = function(){
    this.gameScore = 0;
    this.lives = 5;
    this.updateScore();
    this.updateLives();
};

// Render player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
Arrow key up handler Player method.

X and Y movement values are passed to the game Player object update method
according to the arrow key pressed.
 */
Player.prototype.handleInput = function(event) {
    const yMove = 85;
    const xMove = 100;

    switch(event) {
        case 'up':
            if (this.y > this.yBoundaryMin) {
                this.update(0, -yMove);
            }

            break;

        case 'down':
            if (this.y < this.yBoundaryMax) {
                this.update(0, yMove);
            }

            break;

        case 'left':
            if (this.x > this.xBoundaryMin) {
                this.update(-xMove);
            }

            break;

        case 'right':
            if (this.x < this.xBoundaryMax) {
                this.update(xMove);
            }
    }

};

// Modal class used to generate Start and End Game modals
const Modal = function (overlay) {
    this.overlay = overlay;

    this.open = function () {
        this.overlay.classList.remove('is-hidden');
    };

    this.close = function () {
        this.overlay.classList.add('is-hidden');
    };

    const closeButton = overlay.querySelector('.game-modal__btn-play');
    closeButton.addEventListener('click', this.close.bind(this));
    overlay.addEventListener('click', e => {
        if (e.srcElement.id === this.overlay.id) {
            this.close();
        }
    });
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Player();
const enemy1 = new Enemy(50);
const enemy2 = new Enemy(135);
const enemy3 = new Enemy(220);
const allEnemies = [enemy1, enemy2, enemy3];

//Modal objects
const startGameModal = new Modal(document.querySelector('.game-modal__modal-overlay'));
window.openModal = startGameModal.open.bind(startGameModal);
window.openModal();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


