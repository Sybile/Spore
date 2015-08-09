
var GameLayer = cc.Layer.extend({
    player: null,
    ctor:function () {
        this._super();

        var size = cc.winSize;

        this.player = Spore.createSpore(res.PlayerSpore);
        this.player.setPosition(size.width / 3, size.height / 3);
        this.addChild(this.player);

        this.enemy = Spore.createSpore(res.EnemySpore);
        this.enemy.setPosition(size.width - 300, size.height - 200);
        this.addChild(this.enemy);

        //Ìí¼Ó´¥Ãþ¼àÌý
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

        this.scheduleUpdate();

        return true;
    },

    onTouchBegan: function(touch, event){
        event.getCurrentTarget().isTouch = true;
        event.getCurrentTarget().tempPos = touch.getLocation();
        return true;
    },

    onTouchMoved: function(touch, event){
        event.getCurrentTarget().tempPos = touch.getLocation();
    },

    onTouchEnded: function(touch, event){
        event.getCurrentTarget().isTouch = false;
    },

    update: function(dt) {
        if(this.isTouch){
            var _offset = getOffset(this.tempPos, this.player, dt);
            this.player.setPosition(cc.p(this.player.x + _offset.x, this.player.y + _offset.y));

            this.enemy.escape(this.player, dt);
        }
    }
});

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});