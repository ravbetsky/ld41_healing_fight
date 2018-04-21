import AnimatedTiles from 'phaser-animated-tiles';

class BootScene extends Phaser.Scene {
    constructor(test) {
      super({
        key: 'BootScene'
      });
    }
    preload() {
      console.log('booting')
    }

    create() {
        
    }
}

export default BootScene;
