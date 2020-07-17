class Player extends Character {
  constructor(game, position, direction, dimensions, infected, image) {
    super(game, position, direction, dimensions, infected, image);
    this.direction = null;
    this.immune = false;
    this.image.src = "/assets/player.jpg";
    this.setEventListeners();
    this.setInitialPosition();
  }
  setEventListeners() {
    window.addEventListener("keydown", (event) => {
      event.preventDefault();
      const key = event.key;
      switch (key) {
        case "ArrowLeft":
          this.direction = "left";
          this.runMoveLogic();
          break;
        case "ArrowRight":
          this.direction = "right";
          this.runMoveLogic();
          break;
        case "ArrowUp":
          this.direction = "up";
          this.runMoveLogic();
          break;
        case "ArrowDown":
          this.direction = "down";
          this.runMoveLogic();
      }
    });
  }
  setInitialPosition() {
    this.position[0] = 455;
    this.position[1] = 300;
  }
  runMoveLogic() {
    let isTouchingBoundary = this.isTouchingBoundary();
    let isTouchingOther = false;
    for (let enemy of this.game.enemies) {
      if (this.isTouchingOther(enemy)) {
        isTouchingOther = true;
      }
    }
    if (!isTouchingOther && !isTouchingBoundary) {
      this.move();
    }
  }
  runLoopLogic() {
    for (let powerup of this.game.powerups) {
      if (this.isTouchingOther(powerup)) {
        const index = this.game.powerups.indexOf(powerup);
        this.game.powerups.splice(index, 1);
        this.game.player.immune = true;
        setTimeout(() => {
          this.game.player.immune = false;
        }, 10000);
      }
    }
  }
  draw() {
    this.game.context.save();
    this.game.context.drawImage(this.image, this.position[0], this.position[1], this.dimensions[0], this.dimensions[1]);
    this.game.context.restore();
  }
}
