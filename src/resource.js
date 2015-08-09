var res = {
    //pictures
    Title_png: "res/image/title.png",
    StartButtonNormal: "res/image/btnStartNormal.png",
    StartButtonSelected: "res/image/btnStartSelected.png",
    HelloWorld_png : "res/image/HelloWorld.png",
    CloseNormal_png : "res/image/CloseNormal.png",
    CloseSelected_png : "res/image/CloseSelected.png",
    PlayerSpore: "res/image/PlayerSpore.png",
    EnemySpore: "res/image/EnemySpore.png",
    StaticSpore1: "res/image/StaticSpore1.png",
    StaticSpore2: "res/image/StaticSpore2.png",
    StaticSpore3: "res/image/StaticSpore3.png",

    //sounds
    Effect_eatEnemy: "res/sound/effect_eatEnemy.wav",
    Effect_eatFood: "res/sound/effect_eatFood.wav",
    Music_bg: "res/sound/music_bg.mp3",
    Music_mainScene: "res/sound/music_mainScene.mp3"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}