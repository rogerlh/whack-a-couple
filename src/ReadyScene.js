
(function(ns){

var ReadyScene = ns.ReadyScene = Hilo.Class.create({
    Extends: Hilo.Container,
    constructor: function(properties){
        ReadyScene.superclass.constructor.call(this, properties);
        this.init(properties);
    },

    init: function(properties){
        var logo = new Hilo.Bitmap({
            image: properties.logo,
            rect: [0, 0, 189, 45]
        });

        var startButton = new Hilo.Bitmap({
            id: 'start',
            image: properties.startButton,
            rect: [0, 0, 250, 108]
        });
        //放置logo的位置
        logo.x = 10;
        logo.y = 10;
        //放置startButton的位置
        startButton.x = this.width - startButton.width;
        startButton.y = this.height - startButton.height * 3;

        this.addChild(logo, startButton);
    }
});

})(window.game);
