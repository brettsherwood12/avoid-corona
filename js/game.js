class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.player = new Player(this);
    this.enemies = [];
    this.powerups = [];
    this.score = new Score(this);
    this.running = true;
    this.createEnemies();
  }
  createEnemies() {
    for (let i = 0; i < 10; i++) {
      const enemy = new Enemy(this);
      this.enemies.push(enemy);
    }
    this.enemies[0].infected = true;
  }
  createPowerUps() {
    for (let i = 0; i < 4; i++) {}
  }
  win() {
    this.drawWin();
    this.running = false;
  }
  lose() {
    this.drawLose();
    this.running = false;
  }
  runLogic() {
    this.player.runLoopLogic();
    for (let enemy of this.enemies) {
      enemy.runLoopLogic();
    }
    this.score.runLoopLogic();
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
  drawWin() {
    this.context.save();
    this.context.fillStyle = "white";
    this.context.font = "bold 48px arial";
    this.context.fillText("You avoided corona!", 100, 100);
    setTimeout(() => {
      this.context.fillStyle = "white";
      this.context.font = "bold 48px arial";
      this.context.fillText("...for now", 100, 150);
    }, 2000);
    this.context.restore();
  }
  drawLose() {
    this.context.save();
    this.context.fillStyle = "white";
    this.context.font = "bold 48px arial";
    this.context.fillText("You got corona!", 150, 100);
    setTimeout(() => {
      this.context.fillStyle = "white";
      this.context.font = "bold 48px arial";
      this.context.fillText("Don't pass it on", 150, 150);
    }, 2000);
    this.context.restore();
  }
  loop() {
    this.runLogic();
    if (this.running) {
      this.clearScreen();
      this.draw();
      setTimeout(() => {
        this.loop();
      }, 1000 / 60);
    }
  }
}
