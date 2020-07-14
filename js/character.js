class Character {
  constructor(game) {
    this.game = game;
    this.position = [];
    this.dimensions = [20, 40];
    this.direction = null;
    this.infected = false;
  }
  createSpatialObject() {
    return {
      leftEdge: this.position[0],
      rightEdge: this.position[0] + this.dimensions[0],
      topEdge: this.position[1],
      bottomEdge: this.position[1] + this.dimensions[1],
    };
  }
  isTouchingBoundary() {
    const thisObject = this.createSpatialObject();
    if (
      (thisObject.leftEdge === 0 && this.direction === "left") ||
      (thisObject.rightEdge === this.game.canvas.width &&
        this.direction === "right") ||
      (thisObject.topEdge === 0 && this.direction === "up") ||
      (thisObject.bottomEdge === this.game.canvas.height &&
        this.direction === "down")
    ) {
      return true;
    } else {
      return false;
    }
  }
  isTouchingOther(other) {
    const selfObject = this.createSpatialObject();
    const otherObject = {
      leftEdge: other.position[0],
      rightEdge: other.position[0] + other.dimensions[0],
      topEdge: other.position[1],
      bottomEdge: other.position[1] + other.dimensions[1],
    };
    if (
      (this.direction === "left" &&
        selfObject.leftEdge === otherObject.rightEdge &&
        selfObject.topEdge < otherObject.bottomEdge &&
        selfObject.bottomEdge > otherObject.topEdge) ||
      (this.direction === "right" &&
        selfObject.rightEdge === otherObject.leftEdge &&
        selfObject.topEdge < otherObject.bottomEdge &&
        selfObject.bottomEdge > otherObject.topEdge) ||
      (this.direction === "up" &&
        selfObject.topEdge === otherObject.bottomEdge &&
        selfObject.leftEdge < otherObject.rightEdge &&
        selfObject.rightEdge > otherObject.leftEdge) ||
      (this.direction === "down" &&
        selfObject.bottomEdge === otherObject.topEdge &&
        selfObject.leftEdge < otherObject.rightEdge &&
        selfObject.rightEdge > otherObject.leftEdge)
    ) {
      console.log("touching edge of other");
      return true;
    } else {
      return false;
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
}
