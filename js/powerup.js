class Powerup extends Character {
  constructor(game, position, direction, infected, image) {
    super(game, position, direction, infected, image);
    this.dimensions = [30, 30];
    this.setPositions();
  }
  setPositions() {
    const index = this.game.powerups.indexOf(this);
    if (index === 0) {
      this.position = [70, 70];
    } else {
      this.position = [this.game.canvas.width - 70, this.game.canvas.height - 70];
    }
  }
  runLoopLogic() {
    if (this.isTouchingOther(this.game.player)) {
      console.log("if called");
      const index = this.game.powerups.indexOf(this);
      this.game.powerups.slice(index, 1);
      this.game.player.immune = true;
      setTimeout(() => {
        this.game.player.immune = false;
      }, 15000);
    }
  }
  draw() {
    this.game.context.save();
    this.game.context.fillStyle = "blue";
    this.game.context.fillRect(this.position[0], this.position[1], this.dimensions[0], this.dimensions[1]);
    this.game.context.restore();
  }
}
