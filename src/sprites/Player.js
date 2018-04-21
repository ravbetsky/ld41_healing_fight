import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset, frame }) {
    super(game, x, y, asset, frame)
    this.canFart = false;
    this.fartCounts = 1;
    this.currentFrame = 0
    this.animations.add("right", [0, 1, 2], 10, true)
    this.animations.add("left", [4, 5, 6], 10, true)
  }
  
  update () {
    const cursors = game.input.keyboard.createCursorKeys();

    this.body.velocity.x = 0;

    if (this.body.onFloor()) {
      this.canFart = false;
      this.fartCounts = 1;
    } else {
      this.animations.stop();
      this.animations.frame = this.currentFrame;
    }

    // Move right
    if (cursors.right.isDown) {
      this.currentFrame = 0
      this.body.velocity.x = 220;
      this.animations.play("right");
      this.weapon.trackOffset.x = this.body.width;
      this.weapon.fireAngle = 0
    }
    // Move left
    else if (cursors.left.isDown) {
      this.currentFrame = 4
      this.body.velocity.x = -220;
      this.animations.play("left");
      this.weapon.trackOffset.x = 0;
      this.weapon.fireAngle = 180
    }
    else {
      this.animations.stop();
      this.animations.frame = this.currentFrame;
    }
    
    if (cursors.up.isUp && this.fartCounts > 0)  {
      this.canFart = true;
    }
  
    
    // Jump
    if (cursors.up.isDown) {
      if (this.body.onFloor()) {
        this.body.velocity.y = -250;
      } else {
        if (this.canFart) {
          this.body.velocity.y = -300;
          this.canFart = false;
          this.fartCounts--;
        }
      }
    }
  }
}
