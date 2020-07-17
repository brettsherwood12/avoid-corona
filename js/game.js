const glassUrl = "/assets/bottle_breaking.mp3";
const glass = new Audio(glassUrl);
const songUrl = "/assets/win_song.mp3";
const song = new Audio(songUrl);

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
    this.createPowerUps();
    console.log(this.powerups);
  }
  createEnemies() {
    for (let i = 0; i < 12; i++) {
      const enemy = new Enemy(this);
      this.enemies.push(enemy);
    }
    this.enemies[0].infected = true;
  }
  createPowerUps() {
    for (let i = 0; i < 2; i++) {
      const powerup = new Powerup(this);
      this.powerups.push(powerup);
    }
    this.powerups[0].position = [50, 50];
  }
  win() {
    this.drawWin();
    song.play();
    this.running = false;
  }
  lose() {
    this.drawLose();
    glass.play();
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
    for (let powerup of this.powerups) {
      powerup.draw();
    }
    for (let enemy of this.enemies) {
      enemy.draw();
    }
    this.score.draw();
  }
  drawWin() {
    this.context.save();
    this.context.fillStyle = "white";
    this.context.fillRect(190, 140, 530, 150);
    this.context.fillStyle = "#e77945";
    this.context.font = "bold 64px arial";
    this.context.fillText("Corona avoided!", 200, 200);
    setTimeout(() => {
      this.context.fillStyle = "#e77945";
      this.context.font = "bold 36px arial";
      this.context.fillText("...for now", 200, 275);
    }, 2000);
    this.context.restore();
  }
  drawLose() {
    this.context.save();
    this.context.fillStyle = "white";
    this.context.fillRect(190, 140, 570, 150);
    this.context.fillStyle = "#e77945";
    this.context.font = "bold 64px arial";
    this.context.fillText("Corona contacted", 200, 200);
    setTimeout(() => {
      this.context.fillStyle = "#e77945";
      this.context.font = "bold 36px arial";
      this.context.fillText("...don't pass it on", 200, 275);
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
