class Score {
  constructor(game) {
    this.game = game;
    this.now = Date.now();
    this.start = 1584144000000;
    this.ticker = [];
    this.won = false;
  }
  runTicker() {
    this.start += 4000000;
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
      this.game.win();
    }
  }
  draw() {
    this.game.context.save();
    this.game.context.fillStyle = "white";
    this.game.context.fillRect(392, 24, 194, 34);
    this.game.context.fillStyle = "#e77945";
    this.game.context.font = "bold 32px arial";
    this.game.context.fillText(this.ticker[0], 400, 50);
    this.game.context.fillText(this.ticker[1], 445, 50);
    this.game.context.fillText(this.ticker[2], 510, 50);
    this.game.context.restore();
  }
}
