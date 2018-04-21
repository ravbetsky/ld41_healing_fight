/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {

    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.player = new Player({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'player',
      frame: 0
    })

    let bg = game.add.tileSprite(0, 0, 512, 384, 'bg');
    bg.fixedToCamera = true;

    this.map = this.game.add.tilemap('map')

    this.map.addTilesetImage('ground')

    this.layer = this.map.createLayer('platforms')

    this.layer.resizeWorld()

    this.map.setCollisionBetween(1, 12)

    this.game.add.existing(this.player)

    this.game.camera.follow(this.player);

    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

    this.player.body.gravity.y = 760;
    
    this.weapon = game.add.weapon(30, 'bullet');
    
    //  The bullet will be automatically killed when it leaves the world bounds
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

    //  Because our bullet is drawn facing up, we need to offset its rotation:
    this.weapon.bulletAngleOffset = 180;
    
    this.weapon.fireAngle = 0; 

    //  The speed at which the bullet is fired
    this.weapon.bulletSpeed = 800;

    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    this.weapon.fireRate = 200;
    
    this.fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    
    this.weapon.trackSprite(this.player, 28, 22);
    
    this.player.weapon = this.weapon

  }

  update() {
    this.game.physics.arcade.collide(this.player, this.layer)
    
    if (this.fireButton.isDown) {
      this.weapon.fire()
    }
  }

  render () {
    this.weapon.debug();
  }
}
