class Score {
  constructor(game) {
    this.game = game;
    this.now = Date.now();
    this.start = 1584144000000;
    this.ticker = "";
  }
  runLogic() {
    this.start += 5000000;
    const date = new Date(this.start);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    this.ticker = `${day} / ${month} / ${year}`;
    if (this.start > this.now) {
      this.game.win();
    }
  }
  draw() {
    this.game.context.save();
    this.game.context.fillStyle = "black";
    this.game.context.font = "14px sans-serif";
    this.game.context.fillText(this.ticker, 300, 380);
    this.game.context.restore();
  }
}
