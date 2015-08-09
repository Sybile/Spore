
var GameLayer = cc.Layer.extend({
    player: null,
    ctor:function () {
        this._super();

        cc.audioEngine.playMusic(res.Music_bg, true);

        this.init();

        //添加触摸监听
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

    init: function(){
        var size = cc.winSize;

        this.player = Spore.createSpore(res.PlayerSpore);
        this.player.setPosition(size.width / 3, size.height / 3);
        this.addChild(this.player, 2);

        this.enemy = Spore.createSpore(res.EnemySpore);
        this.enemy.setPosition(size.width - 300, size.height - 200);
        this.addChild(this.enemy, 1);

        this.food1 = Spore.createSpore(res.StaticSpore1);
        this.food1.setPosition(size.width - 300, size.height - 100);
        this.addChild(this.food1);

        this.food2 = Spore.createSpore(res.StaticSpore2);
        this.food2.setPosition(size.width - 100, size.height - 250);
        this.addChild(this.food2);

        this.food3 = Spore.createSpore(res.StaticSpore3);
        this.food3.setPosition(size.width / 2, 100);
        this.addChild(this.food3);
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

            //for tests
            if(this.food1.getParent() && this.overlapDetect(this.player, this.food1).isOverlap)
                this.player.eat(this.food1);
            if(this.food2.getParent() && this.overlapDetect(this.player, this.food2).isOverlap)
                this.player.eat(this.food2);
            if(this.food3.getParent() && this.overlapDetect(this.player, this.food3).isOverlap)
                this.player.eat(this.food3);
            if(this.food1.getParent() && this.overlapDetect(this.enemy, this.food1).isOverlap)
                this.enemy.eat(this.food1);
            if(this.food2.getParent() && this.overlapDetect(this.enemy, this.food2).isOverlap)
                this.enemy.eat(this.food2);
            if(this.food3.getParent() && this.overlapDetect(this.enemy, this.food3).isOverlap)
                this.enemy.eat(this.food3);
        }
    },

    /**
     * 检测两个孢子是否完全重叠，返回较小的孢子
     * @param s1
     * @param s2
     * @returns {{isOverlap: Boolean, obj: *}}
     */
    overlapDetect: function(s1, s2){
        if(s1.getSize() < s2.getSize()){
            var _temp = s1;
            s1 = s2;
            s2 = _temp;
        }

        var s1_rect = s1.getBoundingBox();
        var s2_rect = s2.getBoundingBox();
        var _rect = cc.rectIntersection(s1_rect, s2_rect);
        var _o = cc.rectEqualToRect(_rect, s2_rect);
        return {isOverlap: _o, obj: s2};
    }
});

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});