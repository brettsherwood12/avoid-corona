const $canvas = document.querySelector("canvas");
const context = $canvas.getContext("2d");

const startScreen = () => {
  context.save();
  context.fillStyle = "#70dc70";
  context.font = "bold 64px arial";
  context.fillText("Avoid Corona", 200, 200);
  context.font = "bold 36px arial";
  context.fillText("Press any key to play...", 200, 275);
  context.restore();
};

window.addEventListener("load", () => {
  startScreen($canvas);
  window.addEventListener("keyup", function startLoop() {
    const game = new Game($canvas);
    game.loop();
    this.removeEventListener("keyup", startLoop);
  });
});
