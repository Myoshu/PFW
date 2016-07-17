var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 1000;
    canvas.height = 800;
    var canvasDiv = document.getElementsByClassName("game-canvas")[0];
    canvasDiv.appendChild(canvas);

    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        update(dt);
        render();

        lastTime = now;

        win.requestAnimationFrame(main);
    }

    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    function update(dt) {
        updateEntities(dt);
        //checkCollisions();
    }

     function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
         enemy.update(dt);
        });
        player.update(dt);
        player.bullets.forEach(function(bullet) {
           bullet.update(dt);
        });
    }

    function render() {
        var rowImages = [
                'images/background.jpg'
            ],
            numRows = 10,
            numCols = 10,
            row, col;

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[0]), col * 100, row * 100);
            }
        }

        renderEntities();
    }

    function renderEntities() {
        /*allGems.forEach(function(gem) {
            gem.render();
        });*/

        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
        player.bullets.forEach(function(bullet) {
            bullet.render();
        });
    }

    function reset() {
        // noop
    }

    Resources.load([
        'images/background.jpg',
        'images/Red/alienship_new_red_try.png',
        'images/Blue/alienship_new_small.png',
        'images/Blue/bullet.png'
    ]);
    Resources.onReady(init);

    global.ctx = ctx;
})(this);
