
(function(ns){

var Asset = ns.Asset = Hilo.Class.create({
    Mixes: Hilo.EventMixin,

    queue: null,
    openingAtlas: null,
    logo: null,
    startBtn: null,
    countdown: null,
    ground1: null,
    ground2: null,
    hentai: null,
    milk1: null,
    milk2: null,
    couple_b_1: null,
    couple_b_2: null,
    couple_b_3: null,
    couple_r_1: null,
    couple_r_2: null,
    couple_r_3: null,

    load: function(){
        var resources = [
            {id:'opening', src:'images/opening/opening.png'},
            {id:'logo', src:'images/opening/logo.png'},
            {id:'startBtn', src:'images/opening/start_button.png'},
            {id:'buttonTip', src:'images/opening/button_tip.png'},
            {id:'countdown', src:'images/game/countdown.png'},
            {id:'ground1', src:'images/game/ground1.png'},
            {id:'ground2', src:'images/game/ground2.png'},
            {id:'hentai', src:'images/game/hentai.png'},
            {id:'milk1', src:'images/game/milk1.png'},
            {id:'milk2', src:'images/game/milk2.png'},

            {id:'levelImage1', src:'images/over/lv1.png'},
            {id:'levelImage2', src:'images/over/lv2.png'},
            {id:'levelImage3', src:'images/over/lv3.png'},

            {id:'replayBtn', src:'images/over/replay_button.png'},
            {id:'shareBtn', src:'images/over/share_button.png'},
            {id:'closeBtn', src:'images/over/close_button.png'},
            {id:'moreBtn', src:'images/over/more_button.png'},

            {id:'sharePanel', src:'images/over/panel_share.png'},

            {id:'couple_b_1', src:'images/couple/couple_b_1.png'},
            {id:'couple_b_2', src:'images/couple/couple_b_2.png'},
            {id:'couple_b_3', src:'images/couple/couple_b_3.png'},
            {id:'couple_r_1', src:'images/couple/couple_r_1.png'},
            {id:'couple_r_2', src:'images/couple/couple_r_2.png'},
            {id:'couple_r_3', src:'images/couple/couple_r_3.png'},

        ];

        this.queue = new Hilo.LoadQueue();
        this.queue.add(resources);
        this.queue.on('complete', this.onComplete.bind(this));
        this.queue.start();
    },

    onComplete: function(e){
        this.logo = this.queue.get('logo').content;
        this.startBtn = this.queue.get('startBtn').content;
        this.buttonTip = this.queue.get('buttonTip').content;
        this.hentai = this.queue.get('hentai').content;
        this.countdown = this.queue.get('countdown').content;
        this.ground1 = this.queue.get('ground1').content;
        this.ground2 = this.queue.get('ground2').content;
        this.milk1 = this.queue.get('milk1').content;
        this.milk2 = this.queue.get('milk2').content;
        this.replayBtn = this.queue.get('replayBtn').content;
        this.shareBtn = this.queue.get('shareBtn').content;
        this.closeBtn = this.queue.get('closeBtn').content;
        this.moreBtn = this.queue.get('moreBtn').content;
        this.sharePanel = this.queue.get('sharePanel').content;


        this.couple_b_1 = new Hilo.TextureAtlas({
            image: this.queue.get('couple_b_1').content,
            frames: [[0, 0, 256, 400],
                     [256, 0, 256, 400],
                     [512, 0, 256, 400],
                     [768, 0, 256, 400],
                    ],
            sprites: {
                couple: [0, 1],
                couple_break: [2, 3, 3]
            }
        });
        this.couple_b_2 = new Hilo.TextureAtlas({
            image: this.queue.get('couple_b_2').content,
            frames: [[0, 0, 256, 400],
                     [256, 0, 256, 400],
                     [512, 0, 256, 400],
                     [768, 0, 256, 400],
                    ],
            sprites: {
                couple: [0, 1],
                couple_break: [2, 3, 3]
            }
        });
        this.couple_b_3 = new Hilo.TextureAtlas({
            image: this.queue.get('couple_b_3').content,
            frames: [[0, 0, 256, 400],
                     [256, 0, 256, 400],
                     [512, 0, 256, 400],
                     [768, 0, 256, 400],
                    ],
            sprites: {
                couple: [0, 1],
                couple_break: [2, 3, 3]
            }
        });
        this.couple_r_1 = new Hilo.TextureAtlas({
            image: this.queue.get('couple_r_1').content,
            frames: [[0, 0, 256, 400],
                     [256, 0, 256, 400],
                     [512, 0, 256, 400],
                     [768, 0, 256, 400],
                    ],
            sprites: {
                couple: [0, 1],
                couple_break: [2, 3, 3]
            }
        });
        this.couple_r_2 = new Hilo.TextureAtlas({
            image: this.queue.get('couple_r_2').content,
            frames: [[0, 0, 256, 400],
                     [256, 0, 256, 400],
                     [512, 0, 256, 400],
                     [768, 0, 256, 400],
                    ],
            sprites: {
                couple: [0, 1],
                couple_break: [2, 3, 3]
            }
        });
        this.couple_r_3 = new Hilo.TextureAtlas({
            image: this.queue.get('couple_r_3').content,
            frames: [[0, 0, 256, 400],
                     [256, 0, 256, 400],
                     [512, 0, 256, 400],
                     [768, 0, 256, 400],
                    ],
            sprites: {
                couple: [0, 1],
                couple_break: [2, 3, 3]
            }
        });

        this.openingAtlas = new Hilo.TextureAtlas({
            image: this.queue.get('opening').content,
            frames: [
                [0, 0, 640, 1000],
                [640, 0, 640, 1000],
                [1280, 0, 640, 1000],
                [1920, 0, 640, 1000],
                [2560, 0, 640, 1000],
                [3200, 0, 640, 1000],
                [3840, 0, 640, 1000],
                [4480, 0, 640, 1000],
                [5120, 0, 640, 1000],
                [5760, 0, 640, 1000],
                [6400, 0, 640, 1000],
                [7040, 0, 640, 1000],
                [7680, 0, 640, 1000],
                [8320, 0, 640, 1000],
                [8960, 0, 640, 1000],
                [9600, 0, 640, 1000],
                [10240, 0, 640, 1000],
                [10880, 0, 640, 1000],
                [11520, 0, 640, 1000],
                [12160, 0, 640, 1000],
            ],
            sprites: {
                opening: {from:0, to:19}
            }
        });
        this.queue.off('complete');
        this.fire('complete');
    }
});

})(window.game);
