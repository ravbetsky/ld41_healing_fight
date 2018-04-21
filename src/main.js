import 'phaser';
import BootScene from './BootScene';

const config = {
  type: Phaser.WEBGL,
  parent: 'content',
  width: 400,
  height: 240,
  scaleMode: 0, //Phaser.ScaleManager.EXACT_FIT,
  physics: {
    default: 'arcade',
      arcade: {
        gravity: { y: 800 },
        debug: false
      }
  },
  scene: [
    BootScene,
  ]
};

const game = new Phaser.Game(config);