class Character {
  constructor(game) {
    this.game = game;
    this.position = [];
    this.infected = false;
    this.image = new Image();
  }
  createSpatialObject(character) {
    return {
      leftEdge: character.position[0],
      rightEdge: character.position[0] + character.dimensions[0],
      topEdge: character.position[1],
      bottomEdge: character.position[1] + character.dimensions[1],
    };
  }
  isTouchingBoundary() {
    const thisObject = this.createSpatialObject(this);
    if (
      (thisObject.leftEdge === 0 && this.direction === "left") ||
      (thisObject.rightEdge === this.game.canvas.width && this.direction === "right") ||
      (thisObject.topEdge === 0 && this.direction === "up") ||
      (thisObject.bottomEdge === this.game.canvas.height && this.direction === "down")
    ) {
      return true;
    } else {
      return false;
    }
  }
  isTouchingOther(other) {
    const thisObject = this.createSpatialObject(this);
    const otherObject = this.createSpatialObject(other);
    if (
      (this.direction === "left" &&
        thisObject.leftEdge === otherObject.rightEdge &&
        thisObject.topEdge < otherObject.bottomEdge &&
        thisObject.bottomEdge > otherObject.topEdge) ||
      (this.direction === "right" &&
        thisObject.rightEdge === otherObject.leftEdge &&
        thisObject.topEdge < otherObject.bottomEdge &&
        thisObject.bottomEdge > otherObject.topEdge) ||
      (this.direction === "up" &&
        thisObject.topEdge === otherObject.bottomEdge &&
        thisObject.leftEdge < otherObject.rightEdge &&
        thisObject.rightEdge > otherObject.leftEdge) ||
      (this.direction === "down" &&
        thisObject.bottomEdge === otherObject.topEdge &&
        thisObject.leftEdge < otherObject.rightEdge &&
        thisObject.rightEdge > otherObject.leftEdge)
    ) {
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
