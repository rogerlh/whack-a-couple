
(function(ns){

var Asset = ns.Asset = Hilo.Class.create({
    Mixes: Hilo.EventMixin,

    queue: null,
    openingAtlas: null,
    logo: null,
    startButton: null,
    countdown: null,
    ground: null,
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
            {id:'ground', src:'images/game/ground.png'},
            {id:'hentai', src:'images/game/hentai.png'},
            {id:'milk1', src:'images/game/milk1.png'},
            {id:'milk2', src:'images/game/milk2.png'},
            {id:'couple1', src:'images/couple/couple1.png'},
            {id:'couple1_break', src:'images/couple/couple1_break.png'},
            {id:'couple2', src:'images/couple/couple2.png'},
            {id:'couple2_break', src:'images/couple/couple2_break.png'},
            {id:'couple3', src:'images/couple/couple3.png'},
            {id:'couple3_break', src:'images/couple/couple3_break.png'},
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
        this.ground = this.queue.get('ground').content;
        this.milk1 = this.queue.get('milk1').content;
        this.milk2 = this.queue.get('milk2').content;

        this.couple1 = new Hilo.TextureAtlas({
            image: this.queue.get('couple1').content,
            frames: [[0, 0, 640, 1000]],
            sprites: {
                couple: [0, 0, 0]
            }
        });
        this.couple1_break = new Hilo.TextureAtlas({
            image: this.queue.get('couple1_break').content,
            frames: [[0, 0, 640, 1000]],
            sprites: {
                couple_break: [0, 0, 0]
            }
        });
        this.couple2 = new Hilo.TextureAtlas({
            image: this.queue.get('couple2').content,
            frames: [[0, 0, 640, 1000]],
            sprites: {
                couple: [0, 0, 0]
            }
        });
        this.couple2_break = new Hilo.TextureAtlas({
            image: this.queue.get('couple2_break').content,
            frames: [[0, 0, 640, 1000]],
            sprites: {
                couple_break: [0, 0, 0]
            }
        });
        this.couple3 = new Hilo.TextureAtlas({
            image: this.queue.get('couple3').content,
            frames: [[0, 0, 640, 1000]],
            sprites: {
                couple: [0, 0, 0]
            }
        });
        this.couple3_break = new Hilo.TextureAtlas({
            image: this.queue.get('couple3_break').content,
            frames: [[0, 0, 640, 1000]],
            sprites: {
                couple_break: [0, 0, 0]
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
