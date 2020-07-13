class Character {
  constructor(game) {
    this.game = game;
    this.position = [];
    this.dimensions = [20, 40];
    this.direction = "up";
    this.infected = false;
  }
  createObject() {
    return {
      leftEdge: this.position[0],
      rightEdge: this.position[0] + this.dimensions[0],
      topEdge: this.position[1],
      bottomEdge: this.position[1] + this.dimensions[1],
    };
  }
  isTouching(other) {
    const thisObject = this.createObject();
    const otherObject = {
      leftEdge: other.position[0],
      rightEdge: other.position[0] + other.dimensions[0],
      topEdge: other.position[1],
      bottomEdge: other.position[1] + other.dimensions[1],
    };
    if (
      thisObject.leftEdge < otherObject.rightEdge &&
      thisObject.rightEdge > otherObject.leftEdge &&
      thisObject.topEdge < otherObject.bottomEdge &&
      thisObject.bottomEdge > otherObject.topEdge
    ) {
      console.log("collision");
      return true;
    } else {
      return false;
    }
  }
  isBoundary() {
    const thisObject = this.createObject();
    if (
      (thisObject.leftEdge < 5 && this.direction === "left") ||
      (thisObject.rightEdge > this.game.canvas.width - 25 &&
        direction === "right") ||
      (thisObject.topEdge < 5 && direction === "up") ||
      (thisObject.bottomEdge > this.game.canvas.height - 45 &&
        this.direction === "down")
    ) {
      return true;
    } else {
      return false;
    }
  }
  validateMove() {
    if (!this.isTouching() && !this.isBoundary()) {
      move(this.direction);
    }
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
}
