import Phaser from 'phaser'

export default class Raycast {
  constructor({ game, sprite }) {
    this.game = game;
    this.sprite = sprite;
    this.lineTopRight = new Phaser.Line();
    this.lineTopLeft = new Phaser.Line();
    this.lineBottomRight = new Phaser.Line();
    this.lineBottomLeft = new Phaser.Line();
  }

  attachRays() {
    this.lineTopRight.start.set(this.sprite.centerX, this.sprite.centerY);
    this.lineTopRight.end.set(this.sprite.centerX + 110, this.sprite.centerY - 40);

    this.lineTopLeft.start.set(this.sprite.centerX, this.sprite.centerY);
    this.lineTopLeft.end.set(this.sprite.centerX - 110, this.sprite.centerY - 40);

    this.lineBottomRight.start.set(this.sprite.centerX, this.sprite.centerY);
    this.lineBottomRight.end.set(this.sprite.centerX + 110, this.sprite.centerY + 60);

    this.lineBottomLeft.start.set(this.sprite.centerX, this.sprite.centerY);
    this.lineBottomLeft.end.set(this.sprite.centerX - 110, this.sprite.centerY + 60);
  }

  debug() {
    this.game.debug.geom(this.lineTopLeft);
    this.game.debug.geom(this.lineTopRight);
    this.game.debug.geom(this.lineBottomLeft);
    this.game.debug.geom(this.lineBottomRight);
  }

  raycast(layer) {
    const tileHitsTopRight = layer.getRayCastTiles(this.lineTopRight, 4, false, false).filter(({ index }) => index > -1);
    const tileHitsTopLeft = layer.getRayCastTiles(this.lineTopLeft, 4, false, false).filter(({ index }) => index > -1);
    const tileHitsBottomRight = layer.getRayCastTiles(this.lineBottomRight, 4, false, false).filter(({ index }) => index > -1);
    const tileHitsBottomLeft = layer.getRayCastTiles(this.lineBottomLeft, 4, false, false).filter(({ index }) => index > -1);
    layer.getTiles(0, 0, this.game.width, this.game.height).forEach((tile) => tile.debug = false);
    if (tileHitsTopRight.length > 0) {
      for (let i = 0; i < tileHitsTopRight.length; i++) {
        tileHitsTopRight[i].debug = true;
      }
    }
    if (tileHitsTopLeft.length > 0) {
      for (let i = 0; i < tileHitsTopLeft.length; i++) {
        tileHitsTopLeft[i].debug = true;
      }
    }
    if (tileHitsBottomRight.length > 0) {
      for (let i = 0; i < tileHitsBottomRight.length; i++) {
        tileHitsBottomRight[i].debug = true;
      }
    }
    if (tileHitsBottomLeft.length > 0) {
      for (let i = 0; i < tileHitsBottomLeft.length; i++) {
        tileHitsBottomLeft[i].debug = true;
      }
    }
    layer.dirty = true
    return [
      tileHitsTopLeft.length > 0,
      tileHitsTopRight.length > 0,
      tileHitsBottomLeft.length > 0,
      tileHitsBottomRight.length > 0,
    ];
  }
}