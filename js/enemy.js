const enemyCoughUrl = "/assets/cough.mp3";
const enemyCough = new Audio(enemyCoughUrl);

class Enemy extends Character {
  constructor(game, position, direction, infected, image) {
    super(game, position, direction, infected, image);
    this.dimensions = [40, 60];
    this.direction = null;
    this.infected = false;
    this.image.src = "";
    this.setRandomPosition();
    this.setRandomDirection();
  }
  setRandomPosition() {
    this.position[0] = Math.ceil((Math.random() * (this.game.canvas.width - this.dimensions[0])) / 5) * 5;
    this.position[1] = Math.ceil((Math.random() * (this.game.canvas.height - this.dimensions[1])) / 5) * 5;
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
  moveRandomly() {
    const random = Math.ceil(Math.random() * 10);
    if (random < 2) {
      this.setRandomDirection();
    } else if (random > 4) {
      this.runMoveLogic();
    }
    if (this.isTouchingBoundary()) {
      this.setRandomDirection;
    }
  }
  runMoveLogic() {
    let isTouchingBoundary = this.isTouchingBoundary(this);
    let isTouchingOther = false;
    let thisIndex = this.game.enemies.indexOf(this);
    for (let enemy of this.game.enemies) {
      if (this.game.enemies.indexOf(enemy) === thisIndex) {
        continue;
      }
      if (this.isTouchingOther(enemy)) {
        isTouchingOther = true;
        if (enemy.infected) {
          this.infected = true;
        }
      }
    }
    if (this.isTouchingOther(this.game.player)) {
      isTouchingOther = true;
      //enemyCough.play();
    }
    if (!isTouchingOther && !isTouchingBoundary) {
      this.move();
    }
  }
  runLoopLogic() {
    this.moveRandomly();
    this.infected ? (this.image.src = "/assets/enemy_infected.jpg") : (this.image.src = "/assets/enemy.jpg");
  }
  draw() {
    this.game.context.save();
    this.game.context.drawImage(this.image, this.position[0], this.position[1], this.dimensions[0], this.dimensions[1]);
    this.game.context.restore();
  }
}
