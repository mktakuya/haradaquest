enchant();

window.onload = function(){
    var windowWidth = 500;
    var windowHeight = 300;
    var game = new Core(windowWidth, windowHeight);

    game.fps = 30;
    game.preload("harada.png");
    game.preload("report.png");

    game.onload = function(){
        var harada = new Sprite(100, 100);
        var hp = 3;
        var timeText = new Label();
        var info = new Label();
        var course = '学士課程'
        var enemy = new Sprite(50, 50);
        var dameged = false;
        var time;

        var haradaSpeed = windowWidth / 60;
        var enemySpeed = 5;

        harada.image = game.assets["harada.png"];
        harada.x = 0;
        harada.y = 0;
        harada.frame = 0;

        enemy.image = game.assets['report.png'];
        enemy.x = windowWidth - 300;
        enemy.y = windowHeight / 2;

        game.rootScene.addChild(harada);
        game.rootScene.addChild(timeText);
        game.rootScene.addChild(info);
        game.rootScene.addChild(enemy);

        harada.addEventListener("enterframe", function(){
            if (game.input.up) this.y -= windowHeight / 30;
            if (game.input.down) this.y += windowHeight / 30;
            if (this.y + this.height > windowHeight) this.y -= windowHeight / 30;
            if (this.y < 0) this.y += windowHeight / 30;

            if (this.x > windowWidth) {
                this.x = 0;
            } else {
                this.x += haradaSpeed;
            }

            if (this.within(enemy, 80)) {
                if (dameged == false) {
                    hp--;
                    dameged = true;
                    harada.frame = 2;
                    setTimeout(function() {
                        dameged = false;
                        harada.frame = 0;
                    }, 1500);
                }
            }
            if (hp == 0) {
                harada.frame = 2;
                info.text = course + ' HP: ' + hp;
                game.stop();
            }
        });

        enemy.addEventListener('enterframe', function() {
            this.y += enemySpeed;
            if (this.y > windowHeight) {
                this.x = 0 + Math.floor( Math.random() * windowWidth );
                this.y = 0;
            }
        });

        info.x = windowWidth - 150;
        info.y = 20;
        info.color = 'red';
        info.font = '14px "Arial"';

        timeText.x = windowWidth - 80;
        timeText.y = 5;
        timeText.color = 'red';
        timeText.font = '14px "Arial"';
        timeText.text = '0';
        timeText.on('enterframe', function() {
            time = (game.frame / game.fps).toFixed(2);
            timeText.text = time;
            if (time > 10) {
                course = '修士課程';
                haradaSpeed = windowWidth / 60 * 2;
            }
            if (time > 20) {
                course = '博士課程';
                haradaSpeed = windowWidth / 60 * 3;
            }
            if (time == 30) {
                harada.frame = 1;
                game.stop();
            }
            info.text = course + ' HP: ' + hp;
        });
    };
    game.start();
};
