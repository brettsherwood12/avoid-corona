const $canvas = document.querySelector("canvas");
const context = $canvas.getContext("2d");

const startScreen = () => {
  context.save();
  context.fillStyle = "#670007";
  context.font = "bold 48px arial";
  context.fillText("Avoid Corona", 150, 130);
  context.font = "bold 24px arial";
  context.fillText("Press any key to play...", 150, 180);
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
