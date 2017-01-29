
(function(ns){

var Asset = ns.Asset = Hilo.Class.create({
    Mixes: Hilo.EventMixin,

    queue: null,
    openingAtlas: null,
    logo: null,
    startButton: null,
    countdown: null,
    ground1: null,
    ground2: null,
    hentai: null,
    milk1: null,
    milk2: null,
    couple1: null,
    couple1_break: null,
    couple2: null,
    couple2_break: null,
    couple3: null,
    couple3_break: null,

    load: function(){
        var resources = [
            {id:'opening', src:'images/opening/opening.png'},
            {id:'logo', src:'images/opening/logo.png'},
            {id:'startButton', src:'images/opening/start_button.png'},
            {id:'countdown', src:'images/game/countdown.png'},
            {id:'ground1', src:'images/game/ground1.png'},
            {id:'ground2', src:'images/game/ground2.png'},
            {id:'hentai', src:'images/game/hentai.png'},
            {id:'milk1', src:'images/game/milk1.png'},
            {id:'milk2', src:'images/game/milk2.png'},

            {id:'levelImage1', src:'images/over/lv1.png'},
            {id:'levelImage2', src:'images/over/lv2.png'},
            {id:'levelImage3', src:'images/over/lv3.png'},

            {id:'replayBtn', src:'images/over/btn-replay.png'},
            {id:'shareBtn', src:'images/over/btn-share.png'},
            {id:'close', src:'images/over/close.png'},
            {id:'sharePanel', src:'images/over/share-panel.png'},
            {id:'couple1_1_black', src:'images/couple/black/couple1_1.png'},
            {id:'couple1_2_black', src:'images/couple/black/couple1_2.png'},
            {id:'couple2_1_black', src:'images/couple/black/couple2_1.png'},
            {id:'couple2_2_black', src:'images/couple/black/couple2_2.png'},
            {id:'couple3_1_black', src:'images/couple/black/couple3_1.png'},
            {id:'couple3_2_black', src:'images/couple/black/couple3_2.png'},
        ];

        this.queue = new Hilo.LoadQueue();
        this.queue.add(resources);
        this.queue.on('complete', this.onComplete.bind(this));
        this.queue.start();
    },

    onComplete: function(e){
        this.logo = this.queue.get('logo').content;
        this.startButton = this.queue.get('startButton').content;
        this.countdown = this.queue.get('countdown').content;
        this.hentai = this.queue.get('hentai').content;
        this.ground1 = this.queue.get('ground1').content;
        this.ground2 = this.queue.get('ground2').content;
        this.milk1 = this.queue.get('milk1').content;
        this.milk2 = this.queue.get('milk2').content;

        this.couple1_1_black = new Hilo.TextureAtlas({
            image: this.queue.get('couple1_1_black').content,
            frames: [[0, 0, 256, 400],
                     [256, 0, 256, 400]
                    ],
            sprites: {
                couple: [0, 1, 0, 1]
            }
        });
        this.couple1_2_black = new Hilo.TextureAtlas({
            image: this.queue.get('couple1_2_black').content,
            frames: [[0, 0, 256, 400]],
            sprites: {
                couple: [0, 0, 0, 0]
            }
        });
        this.couple2_1_black = new Hilo.TextureAtlas({
            image: this.queue.get('couple2_1_black').content,
            frames: [[0, 0, 256, 400],
                     [256, 0, 256, 400]
                    ],
            sprites: {
                couple: [0, 1, 0, 1]
            }
        });
        this.couple2_2_black = new Hilo.TextureAtlas({
            image: this.queue.get('couple2_2_black').content,
            frames: [[0, 0, 256, 400]],
            sprites: {
                couple: [0, 0, 0, 0]
            }
        });
        this.couple3_1_black = new Hilo.TextureAtlas({
            image: this.queue.get('couple3_1_black').content,
            frames: [[0, 0, 256, 400],
                     [256, 0, 256, 400]
                    ],
            sprites: {
                couple: [0, 1, 0, 1]
            }
        });
        this.couple3_2_black = new Hilo.TextureAtlas({
            image: this.queue.get('couple3_2_black').content,
            frames: [[0, 0, 256, 400]],
            sprites: {
                couple: [0, 0, 0, 0]
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
