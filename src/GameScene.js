
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

        var countdown = new Hilo.Bitmap({
            image: properties.countdown,
            rect: [0, 0, 188, 90],
        });

        var logo = new Hilo.Bitmap({
            image: properties.logo,
            rect: [0, 0, 189, 45]
        });

        countdown.x = this.width - countdown.width;
        countdown.y = 0;
        countdown.scaleX = 1.2;
        countdown.scaleY = 1.2;

        //放置ground的位置
        ground1.x = 0;
        ground1.y = 0;
        ground2.x = this.width - ground2.width;
        ground2.y = 0;

        //街道循环的动画
        Hilo.Tween.to(ground1, {y: -1000}, {duration: 5000, loop:true});
        Hilo.Tween.to(ground2, {y: -1000}, {duration: 5000, loop:true});


        this.addChild(ground1, ground2, countdown, logo);
    }
});

})(window.game);
