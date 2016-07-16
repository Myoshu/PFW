var Enemy = function(x,y) {
    this.x = x;
    this.y = y;
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
    this.sprite = 'images/Blue/alienship_new_small.png';
};

Player.prototype.update = function (dt) {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 100, 100);
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