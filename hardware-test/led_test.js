const { Board, Led } = require("johnny-five");
const board = new Board();

board.on("ready", () => {
  console.log("Placa lista 🤖✨");

  // LED en pin 13 (onboard)
  const led = new Led(13);

  // Parpadeo: on 500ms, off 500ms
  led.blink(500);
});
