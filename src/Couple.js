
(function(ns){

var Couple = ns.Couple = Hilo.Class.create({
    Extends: Hilo.Sprite,
    constructor: function(properties){
        Couple.superclass.constructor.call(this, properties);
        this.addFrame(properties.atlas.getSprite('couple'));
        this.setFrameCallback(2, properties.callbackFun);
        this.x = properties.startX;
        this.y = properties.startY;
        this.scaleX = 0.3;
        this.scaleY = 0.3;
    },

    getReady: function(){
        this.timeBased = true;
        this.rotation = 4;
        this.interval = 1000;  //每秒1帧，那就是2秒后到第三帧，用来计时消失....
        this.play();
        this.tween = Hilo.Tween.to(this, {rotation:-8}, {duration:500, reverse:true, loop:true});
    },

    onUpdate: function(){
    }
});

})(window.game);
