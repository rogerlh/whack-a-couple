
(function(ns){

var GameScene = ns.GameScene = Hilo.Class.create({
    Extends: Hilo.Container,
    constructor: function(properties){
        GameScene.superclass.constructor.call(this, properties);
        this.init(properties);
    },

    init: function(properties){
        var ground1 = new Hilo.Bitmap({
            image: properties.ground1,
            rect: [0, 0, 131, 1000]
        });
        var ground2 = new Hilo.Bitmap({
            image: properties.ground2,
            rect: [0, 0, 108, 1000]
        });

        var hentai = new Hilo.Bitmap({
            image: properties.hentai,
            rect: [0, 0, 640, 1000]
        });

        var countdown = new Hilo.Bitmap({
            image: properties.countdown,
            rect: [0, 0, 141, 67]
        });

        var secondsText = new Hilo.BitmapText({
            scaleX: 0.5,
            scaleY: 0.5,
            text: 60
        }).addTo(this);

        var second = 60;
        var interval;

        interval = setInterval(function(){
            if (second > 0) {
                second--;
            } else if (second <= 0) {
                clearInterval(interval);
                this.gameOver(); // 倒计时结束, 结束游戏
            }
        }, 1000);

        //放置ground的位置
        ground1.x = 0;
        ground1.y = 0;
        ground2.x = 532;
        ground2.y = 0;
        //放置hentai的大小和位置
        hentai.scaleX = 0.8;
        hentai.scaleY = 0.8;
        hentai.x = (this.width - hentai.width * hentai.scaleX) / 2;
        hentai.y = this.height - hentai.height * hentai.scaleY;
        //街道循环的动画
        // Hilo.Tween.to(ground, {y:-2}, {duration:200, loop:true});
        //hentai左右晃动的动画
        Hilo.Tween.to(hentai, {x: hentai.x - 10}, {duration:400, reverse:true, loop:true});
        this.addChild(ground1, ground2, hentai, countdown, secondsText);
    }
});

})(window.game);
