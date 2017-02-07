
(function(ns){

var Couple = ns.Couple = Hilo.Class.create({
    Extends: Hilo.Sprite,
    constructor: function(properties){
        Couple.superclass.constructor.call(this, properties);
        this.addFrame(properties.sprite);
        this.x = properties.startX;
        this.y = properties.startY;
        this.timeBased = true;
        this.interval = properties.interval;
        this.life = properties.life;
        this.scaleX = 0.6;
        this.scaleY = 0.6;
    },

    getReady: function(){
        this.play();
        // this.tween = Hilo.Tween.to(this, {rotation:-8}, {duration:500, reverse:true, loop:true});
    },

    onUpdate: function(){
    }
});

})(window.game);
