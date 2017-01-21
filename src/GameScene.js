
(function(ns){

var GameScene = ns.GameScene = Hilo.Class.create({
    Extends: Hilo.Container,
    constructor: function(properties){
        GameScene.superclass.constructor.call(this, properties);
        this.init(properties);
    },

    init: function(properties){
        var ground = new Hilo.Bitmap({
            image: properties.ground,
            rect: [0, 0, 640, 1000]
        });

        var hentai = new Hilo.Bitmap({
            image: properties.hentai,
            rect: [0, 0, 640, 1000]
        });
        //放置ground的位置
        ground.x = 0;
        ground.y = 0;
        //放置hentai的大小和位置
        hentai.scaleX = 0.8;
        hentai.scaleY = 0.8;
        hentai.x = (this.width - hentai.width * hentai.scaleX) / 2;
        hentai.y = this.height - hentai.height * hentai.scaleY;
        //街道循环的动画
        // Hilo.Tween.to(ground, {y:-2}, {duration:200, loop:true});
        //hentai左右晃动的动画
        Hilo.Tween.to(hentai, {x: hentai.x - 10}, {duration:400, reverse:true, loop:true});
        this.addChild(ground, hentai);
    }
});

})(window.game);
