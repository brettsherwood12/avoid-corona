class Enemy extends Character {
  constructor(game, position, dimensions, direction, infected) {
    super(game, position, dimensions, direction, infected);
    this.setRandomPosition();
    this.setRandomDirection();
  }
  setRandomPosition() {
    this.position[0] =
      Math.ceil(
        (Math.random() * (this.game.canvas.width - this.dimensions[0])) / 5
      ) * 5;
    this.position[1] =
      Math.ceil(
        (Math.random() * (this.game.canvas.height - this.dimensions[1])) / 5
      ) * 5;
    for (let enemy of this.game.enemies) {
      if (this.isTouchingOther(enemy)) {
        this.setRandomPosition();
      }
    }
    if (this.isTouchingOther(this.game.player)) {
      this.setRandomPosition();
    }
  }
  setRandomDirection() {
    const random = Math.ceil(Math.random() * 4);
    switch (random) {
      case 1:
        this.direction = "left";
        break;
      case 2:
        this.direction = "right";
        break;
      case 3:
        this.direction = "up";
        break;
      case 4:
        this.direction = "down";
    }
  }
  validateMove() {
    let boundary = this.isTouchingBoundary();
    let other = false;
    let indexToSkip = this.game.enemies.indexOf(this);
    for (let enemy of this.game.enemies) {
      if (this.game.enemies.indexOf(enemy) === indexToSkip) {
        continue;
      }
      if (this.isTouchingOther(enemy)) {
        other = true;
        if (enemy.infected) {
          this.infected = true;
        }
      }
    }
    if (!other && !boundary) {
      this.move();
    }
  }
  moveRandomly() {
    const random = Math.ceil(Math.random() * 10);
    if (random < 2) {
      this.setRandomDirection();
    } else if (random > 4) {
      this.validateMove();
    }
    if (this.isTouchingBoundary()) {
      this.setRandomDirection;
    }
  }
  runLogic() {
    this.moveRandomly();
  }
  draw() {
    this.game.context.save();
    this.infected
      ? (this.game.context.fillStyle = "green")
      : (this.game.context.fillStyle = "brown");
    this.game.context.fillRect(
      this.position[0],
      this.position[1],
      this.dimensions[0],
      this.dimensions[1]
    );
    this.game.context.restore();
  }
}
