class Score {
  constructor(game) {
    this.game = game;
    this.now = Date.now();
    this.start = 1584144000000;
    this.ticker = [];
    this.won = false;
  }
  runTicker() {
    this.start += 5000000;
    const date = new Date(this.start);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    this.ticker[0] = `${day}`;
    this.ticker[1] = `${month}`;
    this.ticker[2] = `${year}`;
  }
  runLoopLogic() {
    if (this.game.running) {
      this.runTicker();
    }
    if (this.start > this.now) {
      this.game.running = false;
      this.drawWin();
    }
  }
  drawWin() {
    this.game.context.save();
    this.game.context.fillStyle = "black";
    this.game.context.font = "32px sans-serif";
    this.game.context.fillText("You won!", 300, 300);
    this.game.context.restore();
  }
  drawLose() {
    this.game.context.save();
    this.game.context.fillStyle = "black";
    this.game.context.font = "32px sans-serif";
    this.game.context.fillText("You lost!", 150, 150);
    this.game.context.restore();
  }
  draw() {
    this.game.context.save();
    this.game.context.fillStyle = "#670007";
    this.game.context.font = "bold 16px arial";
    this.game.context.fillText(this.ticker[0], 285, 385);
    this.game.context.fillText(this.ticker[1], 310, 385);
    this.game.context.fillText(this.ticker[2], 345, 385);
    this.game.context.restore();
  }
}
