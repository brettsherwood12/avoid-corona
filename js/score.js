class Score {
  constructor(game) {
    this.game = game;
    this.date = new Date();
    this.score = 0;
  }
  runLogic() {}
  draw() {
    this.game.context.save();
    this.game.context.fillStyle = "black";
    this.game.context.font = "14px sans-serif";
    this.game.context.fillText(this.date, 20, 440);
    this.game.context.restore();
  }
}
