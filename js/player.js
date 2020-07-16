const coughUrl = "/assets/cough.mp3";
const cough = new Audio(coughUrl);

class Player extends Character {
  constructor(game, position, direction, infected, image) {
    super(game, position, direction, infected, image);
    this.dimensions = [40, 60];
    this.direction = null;
    this.infected = false;
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
    this.position[0] = 310;
    this.position[1] = 180;
  }
  powerUp() {
    setTimeout();
  }
  runMoveLogic() {
    let isTouchingBoundary = this.isTouchingBoundary();
    let isTouchingOther = false;
    for (let enemy of this.game.enemies) {
      if (this.isTouchingOther(enemy)) {
        isTouchingOther = true;
        cough.play();
      }
    }
    if (!isTouchingOther && !isTouchingBoundary) {
      this.move();
    }
  }
  runLoopLogic() {
    // for (let powerup of this.game.powerups) {
    //   if (this.isTouchingOther(powerup)) {
    //     const index = this.game.powerups.indexOf(powerup);
    //     this.game.powerups.slice(index, 1);
    //   }
    // }
    for (let enemy of this.game.enemies) {
      if (this.isTouchingOther(enemy) && enemy.infected) {
        this.game.lose();
      }
    }
  }
  draw() {
    this.game.context.save();
    this.game.context.fillStyle = "blue";
    this.game.context.drawImage(this.image, this.position[0], this.position[1], this.dimensions[0], this.dimensions[1]);
    //this.game.context.fillRect(this.position[0], this.position[1], this.dimensions[0], this.dimensions[1]);
    this.game.context.restore();
  }
}
