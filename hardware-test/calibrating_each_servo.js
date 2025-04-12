const five = require("johnny-five");
const keypress = require("keypress");

const board = new five.Board();

board.on("ready", () => {
  const servo1 = new five.Servo({ pin: 9, range: [0, 120] });
  const servo2 = new five.Servo({ pin: 10, range: [0, 120] });
  const servo3 = new five.Servo({ pin: 11, range: [0, 120] });

  let pos1 = 50;
  let pos2 = 50;
  let pos3 = 50;

  servo1.to(pos1);
  servo2.to(pos2);
  servo3.to(pos3);

  console.log("Controles:");
  console.log("  Servo 1: Q (sube), A (baja)");
  console.log("  Servo 2: W (sube), S (baja)");
  console.log("  Servo 3: E (sube), D (baja)");
  console.log("  Ctrl+C para salir\n");

  keypress(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.resume();

  const step = 1;

  function printPositions() {
    console.clear();
    console.log("Posiciones actuales:");
    console.log(`  Servo 1 (pin 9): ${pos1}`);
    console.log(`  Servo 2 (pin 10): ${pos2}`);
    console.log(`  Servo 3 (pin 11): ${pos3}`);
    console.log("\nUsá Q/A, W/S, E/D para ajustar.");
    console.log("Ctrl+C para salir.");
  }

  printPositions();

  process.stdin.on("keypress", (ch, key) => {
    if (!key) return;

    let updated = false;

    switch (key.name) {
      case "q":
        if (pos1 < 120) {
          pos1 += step;
          servo1.to(pos1);
          updated = true;
        }
        break;
      case "a":
        if (pos1 > 0) {
          pos1 -= step;
          servo1.to(pos1);
          updated = true;
        }
        break;
      case "w":
        if (pos2 < 120) {
          pos2 += step;
          servo2.to(pos2);
          updated = true;
        }
        break;
      case "s":
        if (pos2 > 0) {
          pos2 -= step;
          servo2.to(pos2);
          updated = true;
        }
        break;
      case "e":
        if (pos3 < 120) {
          pos3 += step;
          servo3.to(pos3);
          updated = true;
        }
        break;
      case "d":
        if (pos3 > 0) {
          pos3 -= step;
          servo3.to(pos3);
          updated = true;
        }
        break;
      case "c":
        if (key.ctrl) {
          console.log("\nSaliendo...");
          process.exit();
        }
        break;
    }

    if (updated) {
      printPositions();
    }
  });
});
