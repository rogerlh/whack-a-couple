
(function(ns){

var Hentai = ns.Hentai = Hilo.Class.create({
    Extends: Hilo.Sprite,
    constructor: function(properties){
        Hentai.superclass.constructor.call(this, properties);
        this.addFrame(properties.atlas.getSprite('hentai'));
        this.x = properties.x;
        this.y = properties.y;
        this.rotation = 0;
        this.interval = 8;
    },

    getReady: function(){
        this.play();
    },


    onUpdate: function(){
    }
});

})(window.game);
