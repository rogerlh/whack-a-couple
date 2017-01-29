(function (ns) {

    var OverScene = ns.OverScene = Hilo.Class.create({
        Extends: Hilo.Container,
        constructor: function(properties) {
            OverScene.superclass.constructor.call(this, properties);
            this.init(properties);
        },

        init: function(properties) {
            //玩家分数
            // var scoreLabel = this.scoreLabel = new Hilo.BitmapText({
            //     id: 'score',
            //     glyphs: properties.numberGlyphs,
            //     scaleX: 0.5,
            //     scaleY: 0.5,
            //     letterSpacing: 4,
            //     text: 0
            // });

            var scoreLabel;

            var levelImageId = 'levelImage3';

            // 等级人物
            var levelImage = this.levelImage = new Hilo.Bitmap({
                id: levelImageId,
                image: properties.image,
                rect: [0, 0, 320, 500]
            });

            // 重新开始按钮
            var replayBtn = this.replayBtn = new Hilo.Bitmap({
                id: 'replayBtn',
                image: properties.image,
                rect: [0, 0, 290, 176]
            });

            // 分享按钮
            var shareBtn = this.shareBtn = new Hilo.Bitmap({
                id: 'shareBtn',
                image: properties.image,
                rect: [0, 0, 290, 176]
            });

            var sharePanel = this.sharePanel = new Hilo.Bitmap({
                id: 'sharePanel',
                image: properties.image,
                rect: [0, 0, 320, 500]
            });

            var close = this.close = new Hilo.Bitmap({
                id: 'close',
                image: properties.image,
                rect: [0, 0, 14, 14]
            });

            // sharePanel.addChild(close);

            this.addChild(levelImage, replayBtn, shareBtn, sharePanel);
        },

        show: function(score){
            this.scoreLabel.setText('拆散了' + score + '对情侣');

            var imageSrc;

            if (score <= 10) {
                imageSrc = 'images/over/lv1'; // 等级一
            } else if (score > 10 && score <= 20) {
                imageSrc = 'images/over/lv2'; // 等级二
            } else {
                imageSrc = 'images/over/lv3'; // 等级三
            }

            this.levelImage.setImage(imageSrc);
        }
    });

})(window.game);