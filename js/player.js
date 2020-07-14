class Player extends Character {
  constructor(game, position, dimensions, direction, infected) {
    super(game, position, dimensions, direction, infected);
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
          this.validateMove();
          break;
        case "ArrowRight":
          this.direction = "right";
          this.validateMove();
          break;
        case "ArrowUp":
          this.direction = "up";
          this.validateMove();
          break;
        case "ArrowDown":
          this.direction = "down";
          this.validateMove();
      }
    });
  }
  setInitialPosition() {
    this.position[0] = 310;
    this.position[1] = 180;
  }
  validateMove() {
    let boundary = this.isTouchingBoundary();
    let other = false;
    for (let enemy of this.game.enemies) {
      if (this.isTouchingOther(enemy)) {
        other = true;
        if (enemy.infected) {
          this.game.lose();
        }
      }
    }
    if (!other && !boundary) {
      this.move();
    }
  }
  runLogic() {
    for (let enemy of this.game.enemies) {
      if (this.isTouchingOther(enemy) && enemy.infected) {
        this.game.lose();
      }
    }
  }
  draw() {
    this.game.context.save();
    this.game.context.fillStyle = "blue";
    this.game.context.fillRect(
      this.position[0],
      this.position[1],
      this.dimensions[0],
      this.dimensions[1]
    );
    this.game.context.restore();
  }
}
