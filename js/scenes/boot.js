class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key:'BootScene'
        });
    }
 
    preload() {
        this.load.spritesheet('ui:long_buttons', 'assets/sprites/long_buttons.png', { frameWidth: 190, frameHeight: 49 });
        this.load.spritesheet('ui:small_buttons', 'assets/sprites/small_buttons.png', { frameWidth: 45, frameHeight: 49 });

        this.load.spritesheet('tileset:world', 'assets/sprites/world.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('tileset:units', 'assets/sprites/units.png', { frameWidth: 24, frameHeight: 24 });
        this.load.spritesheet('tileset:items', 'assets/sprites/items.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('tileset:actions', 'assets/sprites/actions.png', { frameWidth: 40, frameHeight: 40 });

        this.load.spritesheet('ui:ninepatch-brown', 'assets/ui/ninepatch-brown.png', { frameWidth: 16, frameHeight: 16 });

        this.load.image('blank', 'assets/blank.png');
        
        //this.load.image('player', 'assets/player/player.png');
        this.load.spritesheet('player', 'assets/player/blue.png', {frameWidth: 64, frameHeight: 54});
        this.load.spritesheet('player-jump', 'assets/player/jump.png', {frameWidth: 46, frameHeight: 54});
        this.load.image('platform', 'assets/platform/tile.png');

        this.load.bitmapFont('font:guiOutline', 'assets/fonts/guiOutline.png', 'assets/fonts/guiOutline.xml');
        this.load.bitmapFont('font:gui', 'assets/fonts/gui.png', 'assets/fonts/gui.xml');

        this.load.spritesheet('tileset:effectsLarge', 'assets/sprites/effectsLarge.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('tileset:effectsSmall', 'assets/sprites/effectsSmall.png', { frameWidth: 48, frameHeight: 48 });

        this.load.json('data:units', 'assets/units.json');
        this.load.json('data:spells', 'assets/spells.json');
    }
 
    create() {
        this.scene.start('MainScene');
    }
};