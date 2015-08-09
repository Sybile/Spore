/**
 * Created by WGC on 2015/8/9.
 */

var MainNode = cc.Node.extend({
    ctor: function(){
        this._super();

        cc.audioEngine.playMusic(res.Music_mainScene, true);

        var size = cc.winSize;
        var title = cc.Sprite.create(res.Title_png);
        title.setPosition(cc.p(size.width / 2, size.height * 2 / 3));
        this.addChild(title);

        //play button
        var playButtonNormal = cc.Scale9Sprite.create(res.StartButtonNormal);
        var playButtonSelected = cc.Scale9Sprite.create(res.StartButtonSelected);
        var playButton = cc.ControlButton.create(playButtonNormal);
        playButton.setBackgroundSpriteForState(playButtonSelected, cc.CONTROL_STATE_HIGHLIGHTED);
        playButton.setPosition(cc.p(size.width / 2, size.height / 2 - 150));
        playButton.setAdjustBackgroundImage(false);
        this.addChild(playButton);
        playButton.addTargetWithActionForControlEvents(this, this.startGame,
            cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
    },

    startGame: function(){
        cc.director.runScene(new GameScene());
    }
});

var MainScene = cc.Scene.extend({
    onEnter: function(){
        this._super();
        var _m = new MainNode();
        this.addChild(_m);
    }
});
