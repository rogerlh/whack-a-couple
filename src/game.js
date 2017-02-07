(function() {

    window.onload = function() {
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
        lastTime: 0,
        coupleMaxY: 0, //情侣出现位置的极限
        coupleMinY: 0,
        coupleMaxX: 0,
        coupleMinX: 0,
        seconds: 0, //倒计时, 秒数设置在 gameStart() 里
        gameTime: 20, //游戏时间
        secondsText: null,

        gameReadyScene: null, //开始界面
        gameScene: null, //游戏界面
        gameOverScene: null, //结束界面
        opening: null, //开场动画

        hitSound: null, // 点击情侣的声效

        init: function() {
            this.asset = new game.Asset();
            this.asset.on('complete', function(e) {
                this.asset.off('complete');
                this.initStage();
            }.bind(this));
            this.asset.load();
        },

        initStage: function() {
            this.width = 640;
            this.height = window.innerHeight;
            this.scale = 1;

            //舞台
            this.stage = new Hilo.Stage({
                renderType: 'dom',
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
            this.coupleMaxY = this.height - 220 - 240;
            this.coupleMinY = 0;
            this.coupleMaxX = this.width - 50 - 180;
            this.coupleMinX = 50;

            //准备游戏
            this.gameReady();
        },
        initOpening: function() {
            var that = this;
            this.opening = new game.Opening({
                id: 'opening',
                width: this.width,
                // height: this.height,
                background: '#fff',
                atlas: this.asset.openingAtlas,
                startX: 0,
                startY: 0,
                callbackFun: function() {
                    that.opening.visible = false;
                    that.gameReadyScene.visible = true;
                }
            }).addTo(this.stage);
        },
        initScenes: function() {
            var that = this;

            //准备场景
            this.gameReadyScene = new game.ReadyScene({
                id: 'gameReadyScene',
                width: this.width,
                height: this.height,
                background: '#FBD1D2',
                startBtn: this.asset.startBtn,
                ground1: this.asset.ground1,
                ground2: this.asset.ground2,
                logo: this.asset.logo,
                hentai: this.asset.hentai,
                buttonTip: this.asset.buttonTip,
                couple_b_1: this.asset.couple_b_1,
                visible: false //开始界面在动画播放完之前是隐藏的
            }).addTo(this.stage);

            //游戏场景
            this.gameScene = new game.GameScene({
                id: 'gameScene',
                width: this.width,
                height: this.height,
                background: '#FBD1D2',
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
                background: '#FBD1D2',
                replayBtn: this.asset.replayBtn,
                shareBtn: this.asset.shareBtn,
                sharePanel: this.asset.sharePanel,
                closeBtn: this.asset.closeBtn,
                moreBtn: this.asset.moreBtn,
                logo: this.asset.logo,
                visible: false
            }).addTo(this.stage);

            var countdownContainer = new Hilo.Container({
                id: 'countdownContainer',
                width: 135,
                height: 40,
                x: this.width - 135 - 20,
                y: 24
            }).addTo(this.gameScene);


            var countdownTip = new Hilo.Text({
                id: 'countdownTip',
                color: '#EF3331',
                width: 60,
                height: 40,
                // x: this.secondsText.x - 20,
                y: 10,
                text: '倒计时'
            }).addTo(countdownContainer);

            countdownTip.setFont('20px youyuan, sans-serif');


            // 倒计时时间
            this.secondsText = new Hilo.Text({
                id: 'secondsText',
                color: '#EF3331',
                width: 120,
                height: 40,
                x: countdownTip.x + countdownTip.width + 5,
                y: -2,
                text: this.seconds + 's'
            }).addTo(countdownContainer);

            this.secondsText.setFont('40px youyuan, sans-serif');

            // 显示分数
            var scoreContainer = new Hilo.Container({
                id: 'scoreContainer',
                width: 150,
                height: 80,
                y: 20
            }).addTo(this.gameScene);
            scoreContainer.x = (this.width - scoreContainer.width) / 2;

            var scoreTip = new Hilo.Bitmap({
                image: 'images/game/score_tip.png',
                width: 90,
                height: 25,
                x: 30
            }).addTo(scoreContainer);

            this.scoreText = new Hilo.Text({
                width: scoreContainer.width,
                y: scoreTip.height + 5,
                color: '#EF3331',
                textAlign: 'center',
                text: '0 对'
            }).addTo(scoreContainer);
            this.scoreText.setFont('40px youyuan, sans-serif');



            //绑定开始游戏按钮
            this.gameReadyScene.getChildById('start').on(Hilo.event.POINTER_START, function(e) {
                e._stopped = true;
                this.gameStart();
            }.bind(this));

            // 重新开始游戏按钮
            this.gameOverScene.getChildById('replayBtn').on(Hilo.event.POINTER_START, function(e) {
                //阻止舞台stage响应后续事件
                e.stopImmediatePropagation();
                this.gameStart();
            }.bind(this));

            // 分享
            this.gameOverScene.getChildById('shareBtn').on(Hilo.event.POINTER_START, function(e) {
                this.gameOverScene.getChildById('shareContainer').visible = true;
            }.bind(this));

            // 关闭分享提示遮罩
            this.gameOverScene.getChildById('shareContainer').getChildById('closeBtn').on(Hilo.event.POINTER_START, function(e) {
                this.gameOverScene.getChildById('shareContainer').visible = false;
            }.bind(this));

            // 获取桃花符
            this.gameOverScene.getChildById('moreBtn').on(Hilo.event.POINTER_START, function(e) {
                this.gameOverScene.getChildById('moreContainer').visible = true;
            }.bind(this));

            // 关闭桃花符
            this.gameOverScene.getChildById('moreContainer').getChildById('closeMoreBtn').on(Hilo.event.POINTER_START, function(e) {
                this.gameOverScene.getChildById('moreContainer').visible = false;
            }.bind(this));


            // 声效
            var sound1 = Hilo.WebSound.getAudio({
                src: 'audio/hit1.mp3',
                loop: false,
                volume: 1
            });

            var sound2 = Hilo.WebSound.getAudio({
                src: 'audio/hit2.mp3',
                loop: false,
                volume: 1
            });

            var sound3 = Hilo.WebSound.getAudio({
                src: 'audio/hit3.mp3',
                loop: false,
                volume: 1
            });

            this.hitSound = [sound1, sound2, sound3];
        },

        onUpdate: function(delta) {
            var that = this;
            if (this.state === 'ready') {
                return;
            }

            if (this.state === 'playing') {
                var now = new Date().getTime(); // 当前的时间
                var coupleSprite = null;
                var coupleBreakSprite = null;
                var coupleSprite_r = null;
                var coupleBreakSprite_r = null;
                var life = 1;
                var timeout = 0;
                var createFlag = 0;
                var interval = 250;
                var frequency = 0;

                if (this.gameTime - this.seconds <= this.gameTime / 6) { //第一阶段
                  frequency = 200;
                }else if (this.gameTime - this.seconds > this.gameTime / 6 && this.gameTime - this.seconds <= this.gameTime / 2) { //第二阶段
                  frequency = 166;
                }else if (this.gameTime - this.seconds > this.gameTime / 2 && this.gameTime - this.seconds <= this.gameTime / 1.2) { //第三阶段
                  frequency = 142;
                }else { //第四阶段
                  frequency = 125;
                }

                //随机算法
                if (this.gameTime - this.seconds <= this.gameTime / 2) { //第一和第二阶段
                    if ((now) - this.lastTime >= frequency) { //1s出现一个
                        this.lastTime = now;
                        life = 1; //生产普通情侣
                        timeout = 1; //1s后消失
                        var ran = parseInt(Math.random() * 3);
                        if (ran == 0) {
                            coupleSprite = this.asset.couple_b_1.getSprite('couple');
                            coupleBreakSprite = this.asset.couple_b_1.getSprite('couple_break');
                        } else if (ran == 1) {
                            coupleSprite = this.asset.couple_b_2.getSprite('couple');
                            coupleBreakSprite = this.asset.couple_b_2.getSprite('couple_break');
                        } else {
                            coupleSprite = this.asset.couple_b_3.getSprite('couple');
                            coupleBreakSprite = this.asset.couple_b_3.getSprite('couple_break');
                        }
                        createFlag = 1;
                    }
                } else { //第三和第四阶段
                    if ((now) - this.lastTime >= frequency) { //0.5s出现一个
                        this.lastTime = now;
                        timeout = 0.5; //0.5s后消失
                        var ran = parseInt(Math.random() * 10);
                        if (ran <= 6) {
                            life = 1; //生产普通情侣
                            ran = parseInt(Math.random() * 3);
                            if (ran == 0) {
                                coupleSprite = this.asset.couple_b_1.getSprite('couple');
                                coupleBreakSprite = this.asset.couple_b_1.getSprite('couple_break');
                            } else if (ran == 1) {
                                coupleSprite = this.asset.couple_b_2.getSprite('couple');
                                coupleBreakSprite = this.asset.couple_b_2.getSprite('couple_break');
                            } else {
                                coupleSprite = this.asset.couple_b_3.getSprite('couple');
                                coupleBreakSprite = this.asset.couple_b_3.getSprite('couple_break');
                            }
                        } else {
                            life = 2; //生产红色情侣
                            ran = parseInt(Math.random() * 3);
                            interval = 125;
                            if (ran == 0) {
                                coupleSprite = this.asset.couple_r_1.getSprite('couple');
                                coupleBreakSprite = this.asset.couple_r_1.getSprite('couple_break');
                                coupleSprite_r = this.asset.couple_r_1.getSprite('couple_r');
                                coupleBreakSprite_r = this.asset.couple_r_1.getSprite('couple_r_break');
                            } else if (ran == 1) {
                                coupleSprite = this.asset.couple_r_2.getSprite('couple');
                                coupleBreakSprite = this.asset.couple_r_2.getSprite('couple_break');
                                coupleSprite_r = this.asset.couple_r_2.getSprite('couple_r');
                                coupleBreakSprite_r = this.asset.couple_r_2.getSprite('couple_r_break');
                            } else {
                                coupleSprite = this.asset.couple_r_3.getSprite('couple');
                                coupleBreakSprite = this.asset.couple_r_3.getSprite('couple_break');
                                coupleSprite_r = this.asset.couple_r_3.getSprite('couple_r');
                                coupleBreakSprite_r = this.asset.couple_r_3.getSprite('couple_r_break');
                            }
                        }
                        createFlag = 1;
                    }
                }
                if(createFlag == 1){
                  var newCouple = new game.Couple({
                      id: 'couple' + (now),
                      sprite: coupleSprite,
                      interval: interval,
                      life: life,
                      startX: this.coupleMinX + (this.coupleMaxX - this.coupleMinX) * Math.random(), //随机选取一个位置
                      startY: this.coupleMinY + (this.coupleMaxY - this.coupleMinY) * Math.random(),
                  }).addTo(this.gameScene);

                  newCouple.getReady();

                  newCouple.on(Hilo.event.POINTER_START, function(e) { //加进舞台里并绑定点击事件
                      e._stopped = true;

                      var ran = parseInt(Math.random() * 3); // 用于随机选择不同声效
                      this.hitSound[ran].play(); // 播放声效

                      this.score += 1; //加1得分

                      if (newCouple.life > 0) {
                          newCouple.life -= 1;
                          if(life == 2){  //是红色情侣被击中
                            newCouple.addFrame(coupleBreakSprite, 0);
                            newCouple.setFrameCallback(1, function() {
                                newCouple.addFrame(coupleSprite_r, 0);
                                newCouple.setFrameCallback(1, null);
                            });
                          }
                      }
                      if (newCouple.life == 0) {
                        if(life == 2){
                          newCouple.addFrame(coupleBreakSprite_r, 0);
                          newCouple.setFrameCallback(2, function() {
                              that.gameScene.removeChild(this); //把情侣从 gameScene 上删掉; 删除时间，用帧来控制，播放完就删
                          });
                        }
                        else{
                          newCouple.addFrame(coupleBreakSprite, 0);
                          newCouple.setFrameCallback(3, function() {
                              that.gameScene.removeChild(this); //把情侣从 gameScene 上删掉; 删除时间，用帧来控制，播放完就删
                          });
                        }
                      }
                      newCouple.getReady();

                  }.bind(this));

                  Hilo.Tween.remove(newCouple);
                  setTimeout(function () {
                    if (newCouple.life > 0) { //只有情侣没被打死前，才用定时来控制消失
                    that.gameScene.removeChild(newCouple);
                    that.stage.removeChild(newCouple);
                  }
                }, timeout * 1000);
              }

              // 更新分数
                this.scoreText.text = this.score + ' 对';


                // 如果过了 1s
                if (now - this.oldTime >= 1000) {
                    this.seconds--; // 倒计时减 1s
                    this.oldTime = now;
                }

                // console.log(this.seconds);

                if (this.seconds < 10) {
                    this.secondsText.text = '0' + this.seconds + 's';
                } else {
                    this.secondsText.text = this.seconds + 's';
                }


                // 倒计时为 0, 游戏结束
                if (this.seconds < 0) {
                    this.gameOver();
                }

            } //endif state == playing
        },

        createCouple: function(){

        },

        /**
         * 游戏准备
         */
        gameReady: function() {
            this.opening.getReady(); //播放开场动画
            this.state = 'ready';
        },

        /**
         * 游戏开始
         */
        gameStart: function() {
            this.state = 'playing';

            this.score = 0; // 清零分数
            this.seconds = this.gameTime; // 重新设定游戏时间
            this.oldTime = new Date().getTime();

            this.opening.visible = false;
            this.gameReadyScene.visible = false;
            this.gameOverScene.visible = false;
            this.gameScene.visible = true;
        },

        /**
         * 游戏结束
         */
        gameOver: function() {
            if (this.state !== 'over') {
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

        // removeCouple: async function(newCouple, timeout) {
        //     await this.sleep(timeout * 1000);
        //
        // },
        //
        // sleep: function(ms) {
        //     return new Promise(resolve => setTimeout(resolve, ms));
        // }
    };

})();
