class Game {
  constructor(canvas) {
    this.running = true;
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.player = new Player(this);
    this.enemies = [];
    this.score = new Score(this);
    this.setKeyBindings();
    this.createEnemies();
  }
  setKeyBindings() {
    window.addEventListener("keydown", (event) => {
      event.preventDefault();
      const key = event.key;
      switch (key) {
        case "ArrowLeft":
          this.player.validateMove("left");
          break;
        case "ArrowRight":
          this.player.validateMove("right");
          console.log(this.canvas.width, this.player.position[0]);
          break;
        case "ArrowUp":
          this.player.validateMove("up");
          break;
        case "ArrowDown":
          this.player.validateMove("down");
      }
    });
  }
  createEnemies() {
    for (let i = 0; i < 10; i++) {
      const enemy = new Enemy(this);
      this.enemies.push(enemy);
    }
    this.enemies[0].infected = true;
  }
  checkIfTouching(first, second) {
    const firstObject = {
      leftEdge: first.position[0],
      rightEdge: first.position[0] + first.dimensions[0],
      topEdge: first.position[1],
      bottomEdge: first.position[1] + first.dimensions[1],
    };
    const secondObject = {
      leftEdge: second.position[0],
      rightEdge: second.position[0] + second.dimensions[0],
      topEdge: second.position[1],
      bottomEdge: second.position[1] + second.dimensions[1],
    };
    return (
      firstObject.leftEdge < secondObject.rightEdge &&
      firstObject.rightEdge > secondObject.leftEdge &&
      firstObject.topEdge < secondObject.bottomEdge &&
      firstObject.bottomEdge > secondObject.topEdge
    );
  }
  clearScreen() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  runLogic() {
    this.player.runLogic();
    for (let enemy of this.enemies) {
      enemy.runLogic();
    }
    this.score.runLogic();
  }
  lose() {
    this.running = false;
    alert("You got the virus and died.");
  }
  draw() {
    this.player.draw();
    for (let enemy of this.enemies) {
      enemy.draw();
    }
    this.score.draw();
  }
  loop() {
    this.runLogic();
    this.clearScreen();
    this.draw();
    if (this.running) {
      setTimeout(() => {
        this.loop();
      }, 1000 / 60);
    }
  }
}
