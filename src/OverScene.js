(function (ns) {

    var OverScene = ns.OverScene = Hilo.Class.create({
        Extends: Hilo.Container,
        constructor: function(properties) {
            OverScene.superclass.constructor.call(this, properties);
            this.init(properties);
        },

        init: function(properties) {


            var scoreTip = this.scoreTip = new Hilo.Text({
                width: this.width,
                height: 37,
                x: 66,
                y: 88,
                text: '都别比了！我已经'
            });
            scoreTip.setFont('32px youyuan, sans-serif');

            //玩家分数
            var scoreLabel = this.scoreLabel = new Hilo.Text({
                id: 'scoreLabel',
                width: this.width,
                height: 50,
                x: 66,
                y: scoreTip.y + scoreTip.height + 10,
                text: '拆散了0对情侣'
            });
            scoreLabel.setFont('45px youyuan, sans-serif');

            var scoreTipBottom = this.scoreTipBottom = new Hilo.Text({
                width: this.width,
                height: 37,
                x: 66,
                y: scoreLabel.y + scoreLabel.height + 10,
                text: '明天就可能被人追杀，快保护我。'
            });
            scoreTipBottom.setFont('32px youyuan, sans-serif');



            // 等级人物
            var levelImage = this.levelImage = new Hilo.Bitmap({
                id: 'levelImage',
                image: 'images/over/lv1.png',
                rect: [0, 0, 640, 1000]
            });

            // 分享按钮
            var shareBtn = new Hilo.Button({
                id: 'shareBtn',
                image: properties.shareBtn,
                upState: {rect: [0, 0, 235, 102]},
                downState: {rect: [235, 0, 235, 102]},
                width: 235,
                height: 102,
                x: 66,
                y: 355
            });

            // 重新开始按钮
            var replayBtn = new Hilo.Button({
                id: 'replayBtn',
                image: properties.replayBtn,
                upState: {rect: [0, 0, 235, 102]},
                downState: {rect: [235, 0, 235, 102]},
                width: 235,
                height: 102
            });


            // 分享到朋友圈提示的遮罩
            var shareContainer = new Hilo.Container({
                id: 'shareContainer',
                width: this.width,
                height: this.height,
                visible: false
            });

            var sharePanel = new Hilo.Bitmap({
                id: 'sharePanel',
                image: properties.sharePanel,
                rect: [0, 0, 640, 1000]
            }).addTo(shareContainer);

            // 关闭遮罩按钮
            var closeBtn = new Hilo.Bitmap({
                id: 'closeBtn',
                image: properties.closeBtn,
                rect: [0, 0, 28, 28],
                x: 20,
                y: 20
            }).addTo(shareContainer);

            var moreBtn = new Hilo.Bitmap({
                id: 'moreBtn',
                image: properties.moreBtn,
                rect: [0, 0, 241, 52]
            });

            var logo = new Hilo.Bitmap({
                image: properties.logo,
                rect: [0, 0, 189, 45]
            });

            replayBtn.x = shareBtn.x;
            replayBtn.y = shareBtn.y + 120;

            logo.x = (this.width - logo.width) / 2;
            logo.y = this.height - logo.height;

            moreBtn.x = (this.width - moreBtn.width) / 2;
            moreBtn.y = logo.y - logo.height - 40;



            this.addChild(levelImage, replayBtn, shareBtn, moreBtn, scoreLabel, scoreTip, scoreTipBottom, logo, shareContainer);
        },

        show: function(score){
            this.scoreLabel.text = '拆散了' + score + '对情侣';
            document.title = '我' + this.scoreLabel.text; // 更改网页标题以便分享

            var imageSrc;

            if (score <= 10) {
                imageSrc = 'images/over/lv1.png'; // 等级一

                this.scoreTip.text = '我用微弱的力量';
                this.scoreTipBottom.text = '可累死我了，单身的过来抱紧。'
            } else if (score > 10 && score <= 20) {
                imageSrc = 'images/over/lv2.png'; // 等级二

                this.scoreTip.text = '我实力';
                this.scoreTipBottom.text = '不知道你们想怎么犒劳我'
            } else {
                imageSrc = 'images/over/lv3.png'; // 等级三

                this.scoreTip.text = '都别比了！我已经';
                this.scoreTipBottom.text = '明天就可能被人追杀，快保护我。'
            }

            this.levelImage.setImage(imageSrc);
        }
    });

})(window.game);