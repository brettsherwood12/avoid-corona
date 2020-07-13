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
  lose() {
    this.running = false;
    alert("You got the virus and died.");
  }
  runLogic() {
    this.player.runLogic();
    for (let enemy of this.enemies) {
      enemy.runLogic();
    }
    this.score.runLogic();
  }
  clearScreen() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
