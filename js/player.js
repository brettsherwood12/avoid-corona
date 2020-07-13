class Player extends Character {
  constructor(game, position, dimensions, direction, infected) {
    super(game, position, dimensions, direction, infected);
    this.setInitialPosition();
  }
  setInitialPosition() {
    this.position[0] = 310;
    this.position[1] = 180;
  }
  validateMove(direction) {
    if (
      (this.position[0] < 5 && direction === "left") ||
      (this.position[0] > this.game.canvas.width - 25 &&
        direction === "right") ||
      (this.position[1] < 5 && direction === "up") ||
      (this.position[1] > this.game.canvas.height - 45 && direction === "down")
    ) {
      console.log("its false");
      return;
    }
    this.move(direction);
  }
  move(direction) {
    switch (direction) {
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
  // isInfected() {
  //   for (let enemy of this.game.enemies) {
  //     const isTouching = this.game.checkIfTouching(this, enemy);
  //     if (isTouching && enemy.infected) {
  //       return true;
  //     }
  //   }
  // }
  runLogic() {
    for (let enemy of this.game.enemies) {
      this.isTouching(enemy);
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
