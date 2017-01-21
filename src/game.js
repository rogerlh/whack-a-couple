(function(){

window.onload = function(){
    game.init();
}

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

    gameReadyScene: null, //开始界面
    gameScene: null, //游戏界面
    gameOverScene: null, //结束界面
    opening: null, //开场动画

    init: function(){
        this.asset = new game.Asset();
        this.asset.on('complete', function(e){
            this.asset.off('complete');
            this.initStage();
        }.bind(this));
        this.asset.load();
    },

    initStage: function(){
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
              this.tween = Hilo.Tween.to(this, {scaleX: 0.7, scaleY: 0.7, y: this.y + this.height * 0.3 }, {duration:400, loop:false});
              that.gameReadyScene.visible = true;
            },
        }).addTo(this.stage);
    },
    initScenes: function(){
        //准备场景
        this.gameReadyScene = new game.ReadyScene({
            width: this.width,
            height: this.height,
            logo: this.asset.logo,
            startButton: this.asset.startButton,
            visible: false,  //开始界面在动画播放完之前是隐藏的
        }).addTo(this.stage);
        //游戏场景
        this.gameScene = new game.GameScene({
            width: this.width,
            height: this.height,
            ground: this.asset.ground,
            hentai: this.asset.hentai,
            visible: false,
        }).addTo(this.stage);
        //结束场景
        // this.gameOverScene = new game.OverScene({
        //     width: this.width,
        //     height: this.height,
        //     image: this.asset.over,
        //     numberGlyphs: this.asset.numberGlyphs,
        //     visible: false
        // }).addTo(this.stage);

        //绑定开始游戏按钮
        this.gameReadyScene.getChildById('start').on(Hilo.event.POINTER_START, function(e){
            e._stopped = true;
            this.gameStart();
        }.bind(this));
    },

    onUpdate: function(delta){
        var that = this;
        if(this.state === 'ready'){
          return;
        }
        //游戏开始后，主要是要不断产生情侣精灵，先简单写一个算法
        if(this.state === 'playing'){
          if((+new Date()) - this.oldTime > 500){    //0.5秒出现一个
            var newCouple = new game.Couple({
                id: 'couple' + (+new Date()),
                atlas: this.asset.couple1,
                startX: this.coupleMinX + (this.coupleMaxX - this.coupleMinX) * Math.random(),  //随机选取一个位置
                startY: this.coupleMinY + (this.coupleMaxY - this.coupleMinY) * Math.random(),
                callbackFun: function(){
                  that.stage.removeChild(this);  //把情侣从舞台上删掉
                },
            }).addTo(this.stage);
            newCouple.getReady();

            newCouple.on(Hilo.event.POINTER_START, function(e){  //加进舞台里并绑定点击事件
                e._stopped = true;
                this.score += 1;  //加1得分
                newCouple.addFrame(this.asset.couple1_break.getSprite('couple_break'), 0); //把break加到最开始的帧
                newCouple.getReady();
                Hilo.Tween.remove(newCouple);
                this.removeCouple(newCouple);
            }.bind(this));
            this.oldTime = +new Date();
          }
        }
    },

    gameReady: function(){
        this.opening.getReady();  //播放开场动画
        this.state = 'ready';
    },

    gameStart: function(){
        this.state = 'playing';
        this.opening.visible = false;
        this.gameReadyScene.visible = false;
        this.gameScene.visible = true;
    },

    gameOver: function(){
        if(this.state !== 'over'){
            //设置当前状态为结束over
            this.state = 'over';
        }
    },
    removeCouple: async function(newCouple) {
      await this.sleep(1000)
      this.stage.removeChild(newCouple);
    },
    sleep: function(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
};

})();
