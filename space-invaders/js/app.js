var Enemy = function() {
    this.x = 450;
    this.y = 100;
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

var ship = new Enemy();
var allEnemies = [ship];

var player = new Player();