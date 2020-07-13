class Enemy extends Character {
  constructor(game, position, dimensions, direction, infected) {
    super(game, position, dimensions, direction, infected);
    this.speed = [10, 10];
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
      if (this.isTouching(enemy)) {
        this.setRandomPosition();
      }
    }
    if (this.isTouching(this.game.player)) {
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
    // this.isTouching(this, this.game.player);
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
