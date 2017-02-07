
(function(ns){

var Opening = ns.Opening = Hilo.Class.create({
    Extends: Hilo.Sprite,
    constructor: function(properties){
        Opening.superclass.constructor.call(this, properties);
        this.addFrame(properties.atlas.getSprite('opening'));
        this.setFrameCallback(19, properties.callbackFun);

        // this.init(properties);
    },

    // init: function(properties) {
    //     var logo = new Hilo.Bitmap({
    //         image: 'images/opening/logo.png',
    //         rect: [0, 0, 189, 45],
    //         x: 0,
    //         y: 0
    //     }).addTo(this);
    // },

    getReady: function(){
        //设置起始坐标
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        this.interval = 8;
        this.loop = false;
        this.background = '#fff';
        this.play();
    },


    onUpdate: function(){
    }
});

})(window.game);
