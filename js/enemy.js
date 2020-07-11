class Enemy {
  constructor(game) {
    this.game = game;
    this.position = [];
    this.dimensions = [20, 40];
    this.speed = [10, 10];
    this.direction = "up";
    this.infected = false;
    this.setRandomPosition();
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
      if (this.game.checkIfTouching(this, enemy)) {
        this.setRandomPosition();
      }
    }
    if (this.game.checkIfTouching(this, this.game.player)) {
      this.setRandomPosition();
    }
  }
  move() {
    switch (this.direction) {
      case "left":
        this.position[0] -= 5;
        break;
      case "right":
        this.position[0] += 5;
        break;
      case "up":
        this.position[1] -= 5;
        break;
      case "down":
        this.position[1] += 5;
    }
  }
  checkIfInfected() {
    // need to use array methods to ensure checkifTouching is not ran on the this enemy itself
    // for (let enemy of this.game.enemies) {
    //   const isTouching = this.game.checkIfTouching(this, enemy);
    //   if (isTouching && enemy.infected) {
    //     this.infected = true;
    //   }
    // }
  }
  runLogic() {
    //this.move();
    this.game.checkIfTouching(this, this.game.player);
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
