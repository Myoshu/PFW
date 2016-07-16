var Enemy = function(x,y) {
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.sprite = 'images/Red/alienship_new_red_try.png';
};

Enemy.prototype.update = function(dt) {

};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 100, 100);
};

var Player = function() {
    this.x = 450;
    this.y = 700;
    this.speed = 5;
    this.sprite = 'images/Blue/alienship_new_small.png';
};

Player.prototype.update = function (dt) {
    /*if(this.x>900) this.x=900;
    this.x += this.speed*dt;*/
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 100, 100);
}

Player.prototype.handleInput = function(key) {
    if(moveTimeout === -1) {
        loop(key);
    }

    function loop(key) {
        if (player.x < 0) player.x = 0;
        if(player.x>900) player.x=900;

        if(key==="left") {
            player.move(-player.speed);
        } else if (key==="right"){
            player.move(+player.speed);
        }
        moveTimeout = setTimeout(loop, 1000/60, key);
    }
}
Player.prototype.move = function (offset) {
    this.x = this.x+offset;
}

var enemiesCols = 8;
var enemiesRows = 3;

var allEnemies = [];
var x = 100, y = 50;

for(var i=0; i<enemiesRows; i++) {
    for(var j=0; j<enemiesCols; j++) {
        allEnemies.push(new Enemy(x,y));
        x+=100;
    }
    x=100;
    y+=100;
}

var player = new Player();

var moveTimeout = -1;
document.addEventListener('keydown', function(e) {
    e.preventDefault();
    var allowedKeys = {
        37: 'left',
        39: 'right'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

document.addEventListener('keyup', function(e) {
    e.preventDefault();
    clearTimeout(moveTimeout);
    moveTimeout = -1;
});