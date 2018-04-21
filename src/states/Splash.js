import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.tilemap('map', 'assets/map_01.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.image('bg', 'assets/images/bg.png')
    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('bullet', 'assets/images/bullet.png');
    this.load.spritesheet('player', 'assets/images/grandma.png', 28, 36, 8);
  }

  create () {
    this.state.start('Game')
  }
}
