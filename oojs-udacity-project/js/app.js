// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    this.x = x;
    this.y = y;

    //if speed does not exists set def speed
    //do that for the position also?
    if(speed) {
        this.speed = speed;
    } else {
        this.speed = 60;
    }

    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    allEnemies.forEach(function(enemy) {
        enemy.x += enemy.speed*dt;
        if (enemy.x > 480) {
            enemy.x = -80;
            enemy.speed = Math.random()*240+60;
        }
    });
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player
var Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-cat-girl.png';

};

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'up':
            if(this.y > -30) this.y-=82;
            if(this.y == -30) this.reset();
        break;
        case 'down':
            if(this.y < 380) this.y+=82;
        break;
        case 'left':
            if(this.x > 0) this.x-=100;
        break;
        case 'right':
            if(this.x < 400) this.x+=100;
        break;
        default:
        break;
    }
};

Player.prototype.reset = function() {
    this.y=380;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

Evul = new Enemy(0,60);
Bug = new Enemy(60,140,95);
Noms = new Enemy(30,220,80);
var allEnemies = [Evul, Bug, Noms];
var player = new Player(200,380);


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