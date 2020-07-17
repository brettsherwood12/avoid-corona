class Powerup {
  constructor(game) {
    this.game = game;
    this.position = [];
    this.dimensions = [50, 75];
    this.image = new Image();
    this.image.src = "/assets/powerup.png";
    this.setPosition();
  }
  setPosition() {
    this.position = [this.game.canvas.width - 100, this.game.canvas.height - 125];
  }
  draw() {
    this.game.context.save();
    this.game.context.drawImage(this.image, this.position[0], this.position[1], this.dimensions[0], this.dimensions[1]);
    this.game.context.restore();
  }
}
