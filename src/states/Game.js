/* globals __DEV__ */
import Phaser from 'phaser'
import Enemy from '../sprites/Enemy'
import Player from '../sprites/Player'
import AI from '../sprites/AI'

export default class extends Phaser.State {
  init() {}
  preload() {}

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.enemy = new Enemy({
      game: this.game,
      x: 0,
      y: 300,
      asset: 'player',
      frame: 0,
      AI: new AI(),
    })

    this.player = new Player({
      game: this.game,
      x: game.world.centerX,
      y: game.world.centerY,
      asset: 'player',
      frame: 0,
    })

    // const bg = game.add.tileSprite(0, 0, 512, 384, 'bg');

    // bg.fixedToCamera = true;

    this.map = this.game.add.tilemap('map')

    this.map.addTilesetImage('ground')

    this.layer = this.map.createLayer('platforms')

    this.layer.resizeWorld()

    window.layer = this.layer;

    this.map.setCollisionBetween(1, 12)

    // Player
    this.game.add.existing(this.player)

    this.game.camera.follow(this.player);

    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

    this.player.body.gravity.y = 760;

    this.player.body.collideWorldBounds = true;

    // Enemy
    this.game.add.existing(this.enemy)

    this.game.physics.enable(this.enemy, Phaser.Physics.ARCADE);

    this.enemy.body.gravity.y = 760;

    this.enemy.body.collideWorldBounds = true;

    // game.input.onDown.add(() => {
    //   const playerPosition = { x: this.player.position.x, y: this.player.position.y };
    //   this.enemy.setTarget(playerPosition);
    // }, this);

    window.enemy = this.enemy;
  }

  update() {
    this.game.physics.arcade.collide(this.enemy, this.layer);
    this.game.physics.arcade.collide(this.player, this.layer);
    // this.game.physics.arcade.collide(this.enemy, this.player);

    const playerPosition = { x: this.player.position.x, y: this.player.position.y };
    this.enemy.setTarget(playerPosition);

    // Enemy
    this.enemy.raycast.attachRays()
    const raycastResult = this.enemy.raycast.raycast(this.layer);
    if (this.enemy.hasTarget()) {
      this.enemy.manageMoves(raycastResult)
    }
  }

  render () {
    this.enemy.raycast.debug()
    // game.debug.spriteInfo(this.enemy, 32, 32);
  }
}
