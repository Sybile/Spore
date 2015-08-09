/**
 * Created by WGC on 2015/8/8.
 */

/**
 * About size
 */
var STATIC_SPORE_SIZE = 10;
var ENEMY_SPORE_SIZE = 20;
var PLAYER_SPORE_SIZE = 40;
var MAX_SPORE_SIZE = 2000;

function _getVelocityBySize(size){
    if(size >= MAX_SPORE_SIZE) return 1;
    return (MAX_SPORE_SIZE / size);
}


/**
 * About distance
 */
//���ܵļ�����
var ESCAPE_DIST = 120;
//ͻȻ�˹�ȥ�ľ���
var RUSH_DIST = 80;

/**
 * ����λ��
 * @param o1    �����ĳһ��
 * @param o2    �����ĳһ��
 * @param t     ʱ��
 * @returns {{x: number, y: number}}
 */
function getOffset(o1, o2, t){
    if(!o2.getVelocity){
        var _temp = o1;
        o1 = o2;
        o2 = _temp;
    }

    var _d = Math.sqrt(Math.pow(o1.x - o2.x, 2) + Math.pow(o1.y - o2.y, 2));
    var _x = (o1.x - o2.x) * (o2.getVelocity() * t) / _d;
    var _y = (o1.y - o2.y) * (o2.getVelocity() * t) / _d;

    return {x: _x, y: _y};
}