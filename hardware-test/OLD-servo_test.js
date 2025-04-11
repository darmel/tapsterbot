const { Board, Servo } = require("johnny-five");
const keypress = require("keypress");

const board = new Board();

board.on("ready", () => {
  console.log("🤖 Placa lista. Usa 'A' para horario, 'S' para antihorario, y 'Q' para salir.");

  const servo = new Servo(9); // Usa el pin 9
  let angle = 90;
  servo.to(angle); // Posición inicial al centro

  // Habilitamos la lectura del teclado
  keypress(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.resume();

  process.stdin.on("keypress", (ch, key) => {
    if (!key) return;

    if (key.name === "a") {
      angle = Math.min(angle + 10, 180); // aumenta en sentido horario
      servo.to(angle);
      console.log(`➡️  Sentido horario: ${angle}°`);
    }

    if (key.name === "s") {
      angle = Math.max(angle - 10, 0); // disminuye en sentido antihorario
      servo.to(angle);
      console.log(`⬅️  Sentido antihorario: ${angle}°`);
    }

    if (key.name === "q" || key.ctrl && key.name === "c") {
      console.log("🚪 Saliendo...");
      process.exit();
    }
  });
});
