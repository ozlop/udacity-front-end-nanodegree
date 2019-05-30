// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
    this.x = 200;
    this.y = 375;

    // Player boundary variables
    this.xBoundaryMin = 0;
    this.xBoundaryMax = 400;
    this.yBoundaryMin = -50;
    this.yBoundaryMax = 375;

};

Player.prototype.update = function(x=0, y=0) {
    this.x += x;
    this.y += y;
    console.log(this.x, this.y)
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Player();
const allEnemies = [];


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
