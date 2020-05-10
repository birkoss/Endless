var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [
        BootScene,
        MainScene,
    ],
    physics:{
        default: 'arcade',
        arcade: {
            debug: true
        }
    }
};

var game = new Phaser.Game(config);

game.load = function() {
    let savegame = {
        levels: {}
    };


    let levels = JSON.parse(localStorage.getItem('levels'));
    if (levels != null) {
        savegame.levels = levels;
    }

    return savegame;
}

game.save = function(savegame) {
    if (savegame.levels != null) {
        localStorage.setItem("levels", JSON.stringify(savegame.levels));
    }
}
