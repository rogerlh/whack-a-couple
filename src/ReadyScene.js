
(function(ns){

var ReadyScene = ns.ReadyScene = Hilo.Class.create({
    Extends: Hilo.Container,
    constructor: function(properties){
        ReadyScene.superclass.constructor.call(this, properties);
        this.init(properties);
    },

    init: function(properties){

        var ground1 = new Hilo.Bitmap({
            image: properties.ground1,
            rect: [0, 0, 80, 2000],
            x: 0,
            y: 0
        });
        var ground2 = new Hilo.Bitmap({
            image: properties.ground2,
            rect: [0, 0, 80, 2000],
            y: 0
        });

        ground2.x = this.width - ground2.width;

        var logo = new Hilo.Bitmap({
            image: properties.logo,
            rect: [0, 0, 189, 45],
            x: 0,
            y: 0
        });

        var startBtn = new Hilo.Button({
            id: 'start',
            image: properties.startBtn,
            width: 250,
            height: 108,
            upState: {rect: [0, 0, 250, 108]},
            overState: {rect: [250, 0, 250, 108]},
            downState: {rect: [250, 0, 250, 108]}
        });

        var hentai = new Hilo.Bitmap({
            id: 'hentai',
            image: properties.hentai,
            rect: [0, 0, 256, 276]
        });

        var buttonTip = new Hilo.Bitmap({
            image: properties.buttonTip,
            rect: [0, 0, 161, 58]
        });

        var launchCouple = new Hilo.Sprite({
            id: 'launchCouple',
            timeBased: true,
            interval: 500
        });
        launchCouple.addFrame(properties.couple_b_1.getSprite('couple'));

        hentai.x = (this.width - hentai.width) / 2;
        hentai.y = this.height - hentai.height;

        //放置startButton的位置
        startBtn.x = (this.width - startBtn.width) / 2;
        startBtn.y = hentai.y - startBtn.height - 100;

        // 按钮提示文字
        buttonTip.x = (this.width - buttonTip.width) / 2;
        buttonTip.y = startBtn.y - buttonTip.height - 20;

        launchCouple.x = (this.width - launchCouple.width) / 2;
        launchCouple.y = buttonTip.y - launchCouple.height - 40;

        Hilo.Tween.to(buttonTip, {y: buttonTip.y - 5}, {duration:600, reverse:true, loop:true});

        this.addChild(startBtn, ground1, ground2, logo, hentai, buttonTip, launchCouple);
    }
});

})(window.game);
