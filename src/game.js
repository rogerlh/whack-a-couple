(function(){

window.onload = function(){
    game.init();
};

var game = window.game = {
    width: 0,
    height: 0,
    scale: 0,
    asset: null,
    stage: null,
    ticker: null,
    state: null,
    score: 0,
    oldTime: 0,
    coupleMaxY: 0,   //情侣出现位置的极限
    coupleMinY: 0,
    coupleMaxX: 0,
    coupleMinX: 0,
    seconds: 0, //倒计时, 秒数设置在 gameStart() 里
    secondsText: null,

    gameReadyScene: null, //开始界面
    gameScene: null, //游戏界面
    gameOverScene: null, //结束界面
    opening: null, //开场动画

    hitSound: null, // 点击情侣的声效

    init: function(){
        this.asset = new game.Asset();
        this.asset.on('complete', function(e){
            this.asset.off('complete');
            this.initStage();
        }.bind(this));
        this.asset.load();
    },

    initStage: function(){
        //TODO: 改为网页的实际大小
        this.width = 640;
        this.height = 1000;
        this.scale = 0.5;

        //舞台
        this.stage = new Hilo.Stage({
            renderType:'dom',
            width: this.width,
            height: this.height,
            scaleX: this.scale,
            scaleY: this.scale
        });
        document.body.appendChild(this.stage.canvas);

        //启动计时器
        this.ticker = new Hilo.Ticker(60);
        this.ticker.addTick(Hilo.Tween);
        this.ticker.addTick(this.stage);
        this.ticker.start();

        //绑定交互事件
        this.stage.enableDOMEvent(Hilo.event.POINTER_START, true);
        // this.stage.on(Hilo.event.POINTER_START, this.onUserInput.bind(this));

        //舞台更新
        this.stage.onUpdate = this.onUpdate.bind(this);

        //初始化
        this.initOpening();
        this.initScenes();

        //计算情侣出现位置的极限
        this.coupleMaxY = this.height - 100 - 100; //140是hentai的高度，不准确需再确认；100是情侣的高度
        this.coupleMinY = 0;
        this.coupleMaxX = this.width - 50 * 2; //50是街道的大致宽度，不准确
        this.coupleMinX = 50;
        console.log(this.coupleMaxY, this.coupleMinY, this.coupleMaxX, this.coupleMinX);
        //准备游戏
        this.gameReady();
    },
    initOpening: function(){
        var that = this;
        this.opening = new game.Opening({
            id: 'opening',
            atlas: this.asset.openingAtlas,
            startX: 0,
            startY: 0,
            callbackFun: function(){
                that.opening.visible = false;
              // this.tween = Hilo.Tween.to(this, {scaleX: 0.7, scaleY: 0.7, y: this.y + this.height * 0.3 }, {duration:400, loop:false});
              that.gameReadyScene.visible = true;
            }
        }).addTo(this.stage);
    },
    initScenes: function(){
        var that = this;

        //准备场景
        this.gameReadyScene = new game.ReadyScene({
            id: 'gameReadyScene',
            width: this.width,
            height: this.height,
            startBtn: this.asset.startBtn,
            ground1: this.asset.ground1,
            ground2: this.asset.ground2,
            logo: this.asset.logo,
            hentai: this.asset.hentai,
            buttonTip: this.asset.buttonTip,
            visible: false  //开始界面在动画播放完之前是隐藏的
        }).addTo(this.stage);

        //游戏场景
        this.gameScene = new game.GameScene({
            id: 'gameScene',
            width: this.width,
            height: this.height,
            ground1: this.asset.ground1,
            ground2: this.asset.ground2,
            hentai: this.asset.hentai,
            countdown: this.asset.countdown,
            logo: this.asset.logo,
            visible: false
        }).addTo(this.stage);

        //结束场景
        this.gameOverScene = new game.OverScene({
            id: 'gameOverScene',
            width: this.width,
            height: this.height,
            replayBtn: this.asset.replayBtn,
            shareBtn: this.asset.shareBtn,
            sharePanel: this.asset.sharePanel,
            closeBtn: this.asset.closeBtn,
            moreBtn: this.asset.moreBtn,
            logo: this.asset.logo,
            visible: false
        }).addTo(this.stage);


        // 倒计时时间
        this.secondsText = new Hilo.Text({
            id: 'secondsText',
            color: '#EF3331',
            width: 120,
            height: 65,
            x: this.width - 35 - 120,
            y: 24,
            text: this.seconds + 's'
        }).addTo(this.gameScene);

        this.secondsText.setFont('72px youyuan, sans-serif');

        var countdownTip = new Hilo.Text({
            id: 'countdownTip',
            color: '#EF3331',
            width: 120,
            height: 65,
            x: this.secondsText.x - 90,
            y: 50,
            text: '倒计时'
        }).addTo(this.gameScene);
        countdownTip.setFont('30px youyuan, sans-serif');


        //绑定开始游戏按钮
        this.gameReadyScene.getChildById('start').on(Hilo.event.POINTER_START, function(e){
            e._stopped = true;
            this.gameStart();
        }.bind(this));

        // 重新开始游戏按钮
        this.gameOverScene.getChildById('replayBtn').on(Hilo.event.POINTER_START, function(e){
            //阻止舞台stage响应后续事件
            e.stopImmediatePropagation();
            this.gameStart();
        }.bind(this));

        // 分享
        this.gameOverScene.getChildById('shareBtn').on(Hilo.event.POINTER_START, function(e){
            this.gameOverScene.getChildById('shareContainer').visible = true;
        }.bind(this));

        // 关闭分享提示遮罩
        this.gameOverScene.getChildById('shareContainer').getChildById('closeBtn').on(Hilo.event.POINTER_START, function(e){
            this.gameOverScene.getChildById('shareContainer').visible = false;
        }.bind(this));

        // 看看主角的故事
        this.gameOverScene.getChildById('moreBtn').on(Hilo.event.POINTER_START, function(e){
            window.href = '#';
        }.bind(this));

        // 声效
        //TODO: 区分不同等级的声音
        this.hitSound = Hilo.WebSound.getAudio({
            src: 'audio/hit1.mp3',
            loop: false,
            volume: 1
        });
    },

    onUpdate: function(delta){
        var that = this;
        if(this.state === 'ready'){
          return;
        }
        //游戏开始后，主要是要不断产生情侣精灵，先简单写一个算法
        if(this.state === 'playing'){

            var now = new Date().getTime(); // 当前的时间

          if((now) - this.oldTime >= 500){    //0.5秒出现一个
            var ran = parseInt(Math.random() * 3);
            var coupleSprite = null;
            var coupleBreakSprite = null;
            if(ran == 0){
              coupleSprite = this.asset.couple1_black.getSprite('couple');
              coupleBreakSprite = this.asset.couple1_black.getSprite('couple_break');
            }else if (ran == 1){
              coupleSprite = this.asset.couple2_black.getSprite('couple');
              coupleBreakSprite = this.asset.couple2_black.getSprite('couple_break');
            }else{
              coupleSprite = this.asset.couple3_black.getSprite('couple');
              coupleBreakSprite = this.asset.couple3_black.getSprite('couple_break');
            }
            var newCouple = new game.Couple({
                id: 'couple' + (+now),
                atlas: atlas,
                interval: 500,
                life: 1,
                startX: this.coupleMinX + (this.coupleMaxX - this.coupleMinX) * Math.random(),  //随机选取一个位置
                startY: this.coupleMinY + (this.coupleMaxY - this.coupleMinY) * Math.random(),
                callbackFun: function(){
                  that.gameScene.removeChild(this);  //把情侣从 gameScene 上删掉
                }
            }).addTo(this.gameScene);

            newCouple.getReady();

            newCouple.on(Hilo.event.POINTER_START, function(e){  //加进舞台里并绑定点击事件
                e._stopped = true;

                this.hitSound.play(); // 播放声效

                this.score += 1;  //加1得分

                if(newCouple.life > 0){
                  newCouple.life -= 1;
                }
                if(newCouple.life == 0){
                  newCouple.addFrame(coupleBreakSprite);
                }

                newCouple.getReady();

                Hilo.Tween.remove(newCouple);
                this.removeCouple(newCouple); // 移除情侣

            }.bind(this));

          } //endif


            // 如果过了 1s
            if (now - this.oldTime >= 1000) {
                this.seconds--; // 倒计时减 1s
                this.oldTime = now;
            }

            // console.log(this.seconds);

            this.secondsText.text = this.seconds + 's';

            // 倒计时为 0, 游戏结束
            if (this.seconds < 0) {
                this.gameOver();
            }

        } //endif state == playing
    },

    /**
     * 游戏准备
     */
    gameReady: function(){
        this.opening.getReady();  //播放开场动画
        this.state = 'ready';
    },

    /**
     * 游戏开始
     */
    gameStart: function(){
        this.state = 'playing';

        this.score = 0; // 清零分数
        this.seconds = 2; // 重新设定游戏时间
        this.oldTime = new Date().getTime();

        this.opening.visible = false;
        this.gameReadyScene.visible = false;
        this.gameOverScene.visible = false;
        this.gameScene.visible = true;
    },

    /**
     * 游戏结束
     */
    gameOver: function(){
        if(this.state !== 'over'){
            //设置当前状态为结束over
            this.state = 'over';
        }

        this.gameOverScene.show(this.score);
        this.gameOverScene.visible = true;
        this.gameScene.visible = false;
    },


    /**
     * 计算得分
     * @returns {number} 分数
     */
    calcScore: function() {

        // YOUR CODE HERE
        // ...

        return this.score;
    },

    removeCouple: async function(newCouple) {
      await this.sleep(1000);
      this.stage.removeChild(newCouple);
    },

    sleep: function(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
};

})();
