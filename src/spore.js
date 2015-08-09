/**
 * Created by WGC on 2015/8/8.
 * 孢子类型有3种，静止的为0，电脑控制的为1，玩家控制的为2
 */

var Spore = cc.Sprite.extend({
    type: null,     //0,1,2
    size: 0,        //体积大小
    vel: 0,         //速度

    ctor: function(spPath) {
        this._super(spPath);
        this.setType(spPath);
        this.setSize();
    },

    setType: function(spPath) {
        var _p = spPath.split('/')[2][0];
        if(_p === 'S'){
            this.type = 0;
        }else if(_p === 'E'){
            this.type = 1;
        }else{
            this.type = 2;
        }
    },

    getType: function(){
        return this.type;
    },

    setSize: function(){
        if(this.type === 0){
            this.size = FOOD_SPORE_SIZE;
        }else if(this.type === 1){
            this.size = ENEMY_SPORE_SIZE;
        }else{
            this.size = PLAYER_SPORE_SIZE;
        }
        //被动触发
        this.setVelocity();
    },

    getSize: function() {
        return this.size;
    },

    setVelocity: function() {
        this.vel = getVelocityBySize(this.size);
    },

    getVelocity: function(){
        return this.vel;
    },

    /**
     * 逃避算法
     * 仅供电脑控制的孢子调用
     * @param obj
     * @param t
     * @returns {null}
     */
    escape: function(obj, t){
        if(this.type === 1) {
            var _d = Math.sqrt(Math.pow(this.getPositionX() - obj.getPositionX(), 2) + Math.pow(this.getPositionY() - obj.getPositionY(), 2));
            if(_d < ESCAPE_DIST){
                var _offset = getOffset(obj, this, t);
                this.setPosition(cc.p(this.x - _offset.x, this.y - _offset.y));
            }
        }else{
            return null;
        }
    },

    /**
     * 吞噬算法
     * 无法运动的孢子（即食物）没有此方法
     * @param obj
     * @returns {null}
     */
    eat: function(obj){
        if(this.type === 0) return null;
        //吞噬算法
    }
});

Spore.createSpore = function(spPath){
    return new Spore(spPath);
}