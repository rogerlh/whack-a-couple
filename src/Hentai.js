
(function(ns){

var Hentai = ns.Hentai = Hilo.Class.create({
    Extends: Hilo.Sprite,
    constructor: function(properties){
        Hentai.superclass.constructor.call(this, properties);
        this.addFrame(properties.sprite);
        this.timeBased = true;
        this.interval = properties.interval;
        this.scaleX = 0.8;
        this.scaleY = 0.8;
        this.x = (properties.sceneWidth - this.width * this.scaleX) / 2 + 100;
        this.y = properties.sceneHeight - this.height * this.scaleY + 10;
        this.loop = false;
    },

    getReady: function(){
        this.play();
        // this.tween = Hilo.Tween.to(this, {rotation:-8}, {duration:500, reverse:true, loop:true});
    },

    onUpdate: function(){
    }
});

})(window.game);
