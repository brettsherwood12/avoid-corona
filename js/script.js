window.addEventListener("load", () => {
  const $canvas = document.querySelector("canvas");
  const game = new Game($canvas);
  game.runLogic();
  game.draw();
  game.loop();
});
