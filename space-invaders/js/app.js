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
    this.width = 100;
    this.height = 100;
    this.speed = 5;
    this.sprite = 'images/Blue/alienship_new_small.png';
    this.bullets = [];
};

Player.prototype.update = function (dt) {
    /*if(this.x>900) this.x=900;
    this.x += this.speed*dt;*/
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
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

    if(key === 'fire') {
        player.bullets.push(new Bullet(this.x, this.y, this.width));
        console.log(player.bullets);
    }
}
Player.prototype.move = function (offset) {
    this.x = this.x+offset;
}

var Bullet = function(x, y, width) {
    this.width = 20;
    this.height = 20;
    this.x = x+(width/2)-this.width/2-2;
    this.y = y-this.height;
    this.speed = 300;
    this.sprite = 'images/Blue/bullet.png';
}

Bullet.prototype.update = function(dt) {
    this.y-=this.speed*dt;
    this.collisions();
}

Bullet.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
}

Bullet.prototype.destroy = function() {
    player.bullets.splice(this, 1);
}

Bullet.prototype.collisions = function() {
    if(this.y<0) this.destroy();
    //console.log(player.bullets);
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
    var allowedKeys = {
        32: 'fire',
        37: 'left',
        39: 'right'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

document.addEventListener('keyup', function(e) {
    clearTimeout(moveTimeout);
    moveTimeout = -1;
});