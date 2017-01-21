
(function(ns){

var Opening = ns.Opening = Hilo.Class.create({
    Extends: Hilo.Sprite,
    constructor: function(properties){
        Opening.superclass.constructor.call(this, properties);
        this.addFrame(properties.atlas.getSprite('opening'));
        this.setFrameCallback(19, properties.callbackFun);
    },

    getReady: function(){
        //设置起始坐标
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        this.interval = 8;
        this.loop = false;
        this.play();
    },


    onUpdate: function(){
    }
});

})(window.game);
