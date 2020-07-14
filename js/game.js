const background = new Image();

class Game {
  constructor(canvas) {
    this.running = true;
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.player = new Player(this);
    this.enemies = [];
    this.score = new Score(this);
    this.createEnemies();
  }
  createEnemies() {
    for (let i = 0; i < 10; i++) {
      const enemy = new Enemy(this);
      this.enemies.push(enemy);
    }
    this.enemies[0].infected = true;
  }
  win() {
    this.running = false;
    alert("Congratulations, you won.");
  }
  lose() {
    this.running = false;
    alert("You got the virus, game over.");
  }
  runLogic() {
    for (let enemy of this.enemies) {
      enemy.runLogic();
    }
    this.player.runLogic();
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
