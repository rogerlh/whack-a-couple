
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
            rect: [0, 0, 80, 2000],
            width: 80
        });
        var ground2 = new Hilo.Bitmap({
            image: properties.ground2,
            rect: [0, 0, 80, 2000],
            width: 80
        });

        var hentai = new Hilo.Bitmap({
            image: properties.hentai,
            rect: [0, 0, 256, 276],
            rotation: -2
        });

        var countdown = new Hilo.Bitmap({
            image: properties.countdown,
            rect: [0, 0, 282, 134]
        });

        var logo = new Hilo.Bitmap({
            image: properties.logo,
            rect: [0, 0, 189, 45]
        });

        countdown.x = 359;
        countdown.y = 0;

        //放置ground的位置
        ground1.x = 0;
        ground1.y = 0;
        ground2.x = this.width - ground2.width;
        ground2.y = 0;

        //放置hentai的大小和位置
        hentai.scaleX = 0.8;
        hentai.scaleY = 0.8;
        hentai.x = (this.width - hentai.width * hentai.scaleX) / 2;
        hentai.y = this.height - hentai.height * hentai.scaleY;

        //街道循环的动画
        Hilo.Tween.to(ground1, {y: -1000}, {duration: 5000, loop:true});
        Hilo.Tween.to(ground2, {y: -1000}, {duration: 5000, loop:true});

        //hentai左右晃动的动画
        Hilo.Tween.to(hentai, {x: hentai.x - 10}, {duration:400, reverse:true, loop:true});
        Hilo.Tween.to(hentai, {rotation: 2}, {duration:400, reverse:true, loop:true});
        this.addChild(ground1, ground2, hentai, countdown, logo);
    }
});

})(window.game);
