// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    this.x = x;
    this.y = y;
    this.width = 82;
    this.height = 82;
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
            enemy.speed = Math.random()*120+60;
        }
    });
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player
var Player = function() {
    this.x = 200;
    this.y = 380;
    this.width = 82;
    this.height = 82;
    this.sprite = 'images/char-cat-girl.png';

    /*interesantno*/
    /*var heartsCollection = document.getElementById("hearts").getElementsByTagName("img");
    this.hearts = Array.prototype.slice.call(heartsCollection);
    console.log(this.hearts);*/
};

Player.prototype.update = function(dt) {
    //why is this needed?
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.setImage = function(image) {
    this.sprite = image.getAttribute("src");
}

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'up':
            if(this.y > -30) this.y-=82;
            if(this.y == -30) {
                this.score(1);
                this.reset();
            }
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

Player.prototype.score = function(arg) {
    var div = document.getElementsByClassName("count-wins")[0];
    var score = parseInt(div.innerHTML);

    if(arg) {
        score += 1;
    } else {
        score = 0;
    }

    div.innerHTML = score;
}

Player.prototype.points = function(addPoints) {
    var div = document.getElementsByClassName("count-points")[0];
    var points = parseInt(div.innerHTML);

    if(addPoints) {
        points+=addPoints;
    } else {
        points = 0;
    }

    div.innerHTML = points;
}

/*append onoliko srca koliko kažem da igrač ima*/
Player.prototype.removeHeart = function() {
    var hearts = document.getElementById("hearts");
    if(hearts.children.length > 0) {
        hearts.removeChild(hearts.lastElementChild);
    } else {
        resetGame();
    }
}

Player.prototype.reset = function() {
    this.x=200;
    this.y=380;
}

var Gem = function(x,y,image) {
    this.x = x;
    this.y = y;
    this.width = 82;
    this.height = 82;
    this.imageIndex = image;

    switch(image) {
        case 1:
            this.sprite = 'images/Gem Blue.png';
            break;
        case 2:
            this.sprite = 'images/Gem Green.png';
            break;
        case 3:
            this.sprite = 'images/Gem Orange.png';
            break;
        default:
            this.sprite = 'images/Gem Blue.png';
            break;
    }
}

Gem.prototype.update = function() {

}

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Gem.prototype.create = function() {
    function calculateCoordinate(arg) {
        return gemCoordinates[arg][Math.floor(Math.random()*gemCoordinates[arg].length)];
    }
    var x = calculateCoordinate(0);
    var y = calculateCoordinate(1);
    var image = Math.floor(Math.random()*3+1);

    var gem = new Gem(x,y,image);
    allGems.push(gem);
}

Gem.prototype.destroy = function() {
    var index = allGems.indexOf(this);
    var imageIndex = this.imageIndex;

    if (index > -1) {
        allGems.splice(index, 1);
    }

    return imageIndex;
}

function checkCollisions() {
    var count, points;

    allGems.forEach(function(gem){
        if (player.x < gem.x + gem.width &&
            player.x + player.width > gem.x &&
            player.y < gem.y + gem.height &&
            player.y + player.height > gem.y) {
            count = gem.destroy();
            gem.create();

            switch(count) {
                case 1: points = 100;
                    break;
                case 2: points = 200;
                    break;
                case 3: points = 300;
                    break;
                default: points = 100;
                    break;
            }
            player.points(points);
        }
    });

    allEnemies.forEach(function(enemy){
        if (player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y) {
            player.reset();
            player.removeHeart();
        }
    });
}

var resetGame = function() {
    document.getElementById("gameover").style.display = "block";
    player.reset();
    player.score(0);
    player.points(0);
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var gemCoordinates = [
    [0,101,202,303,404],
    [48,130,212]
];

/*default gems, može i ovo na rand*/
var blue = new Gem(101, 130, 1);
var green = new Gem(303,212, 2);

//napravi ovo drugačije (foreach enemy y+82 u odnosu na prethodnog, x može da ostane def)
Evul = new Enemy(0,52);
Bug = new Enemy(60,134,95);
Noms = new Enemy(30,216,80);

var allGems = [blue, green];
var allEnemies = [Evul, Bug, Noms];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    e.preventDefault();
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});