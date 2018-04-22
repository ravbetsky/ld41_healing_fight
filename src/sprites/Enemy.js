import Phaser from 'phaser';
import Raycast from './Raycast';
import { timeout } from '../utils';

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset, frame, AI }) {
    super(game, x, y, asset, frame, AI)
    this.currentFrame = 0;
    this.animations.add("right", [0, 1, 2], 10, true);
    this.animations.add("left", [4, 5, 6], 10, true);
    this.raycast = new Raycast({ sprite: this, game });
    // this.AI = AI;
    // this.AI.defineMoveMethods(['moveRight', 'moveLeft', 'stop', 'moveUp'])
    this.velocityX = 0;
    this.autoPilot = true;
    this.target = null;
  }

  releaseMovements(movements) {
    this.autoPilot = true;
    movements.reduce((acc, [movement, duration]) => {
      return acc
        .then(() => this[movement]())
        .then(() => timeout(duration))
    }, Promise.resolve()).then(() => this.autoPilot = false);
  }

  hasTarget() {
    return this.target ? true : false;
  }

  setTarget(target) {
    this.target = target;
  }

  unsetTarget() {
    this.target = null;
  }

  manageMoves(raycastTiles) {
    const [topLeft, topRight, bottomLeft, bottomRight] = raycastTiles;
    // Stop condition
    if (this.body.hitTest(this.target.x, this.target.y)) {
      this.stop()
      this.unsetTarget()
      return false
    }
    const h = this.body.x + 10 <= this.target.x ? 'Right' : 'Left';
    const v = this.body.y <= this.target.y ? 'Down' : 'Up';
    this['move' + h]();
    if (v === 'Up') {
      if (topRight || topLeft) {
        this.moveUp()
      }      
    }
  }

  moveRight() {
    this.currentFrame = 0
    this.velocityX = 120;
    this.animations.play("right");
    return this;
  }

  moveLeft() {
    this.currentFrame = 4
    this.velocityX = -120;
    this.animations.play("left");
    return this;
  }

  stop() {
    this.animations.stop();
    this.animations.frame = this.currentFrame;
    this.velocityX = 0;
    return this;
  }

  moveUp() {
    this.animations.stop();
    this.animations.frame = this.currentFrame;
    if (this.body.onFloor()) {
      this.body.velocity.y = -450;
    }
    return this;
  }

  moveDown() {
    return this;
  }

  update() {
    const cursors = game.input.keyboard.createCursorKeys();

    if (!this.autoPilot) {
      this.body.velocity.x = 0;
      // Move right
      if (cursors.right.isDown) {
        this.moveRight();
        this.body.velocity.x = this.velocityX;
      }
      // Move left
      else if (cursors.left.isDown) {
        this.moveLeft();
        this.body.velocity.x = this.velocityX;
      } else {
        this.animations.stop();
      }
      
      // Jump
      if (cursors.up.isDown) {
        this.moveUp();
      }
    } else {
      this.body.velocity.x = this.velocityX;
    }
  }
}
