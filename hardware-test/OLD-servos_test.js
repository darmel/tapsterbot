const { Board, Servo } = require("johnny-five");
const keypress = require("keypress");

const board = new Board();

board.on("ready", () => {
  console.log("🤖 Placa lista. Controlando 3 servos con el teclado:");
  console.log(`
    Servo X (pin 9):    Q = +10°, A = -10°
    Servo Y (pin 10):   W = +10°, S = -10°
    Servo Z (pin 11):   E = +10°, D = -10°
    Z o Ctrl+C:         Salir
  `);

  const servoX = new Servo(9);
  const servoY = new Servo(10);
  const servoZ = new Servo(11);

  let angleX = 90;
  let angleY = 90;
  let angleZ = 90;

  servoX.to(angleX);
  servoY.to(angleY);
  servoZ.to(angleZ);

  //Funciones DEMO
  function demo1_individualSteps() {
    console.log("🎬 Demo 1: Movimiento individual en tramos de 10°");
    let angle = 90;
    const interval = setInterval(() => {
      if (angle > 180) {
        clearInterval(interval);
        console.log("✅ Demo 1 completo");
        return;
      }
      servoX.to(angle);
      setTimeout(() => servoY.to(angle), 200);
      setTimeout(() => servoZ.to(angle), 400);
      console.log(`📍 Ángulo: ${angle}°`);
      angle += 10;
    }, 800);
  }

  function demo2_syncSteps() {
    console.log("🎬 Demo 2: Movimiento sincronizado en tramos de 10°");
    let angle = 90;
    const interval = setInterval(() => {
      if (angle > 180) {
        clearInterval(interval);
        console.log("✅ Demo 2 completo");
        return;
      }
      servoX.to(angle);
      servoY.to(angle);
      servoZ.to(angle);
      console.log(`📍 Ángulo: ${angle}°`);
      angle += 10;
    }, 500);
  }

  function demo3_syncSmooth() {
    console.log("🎬 Demo 3: Movimiento sincronizado suave");
    let angle = 90;
    const interval = setInterval(() => {
      if (angle > 180) {
        clearInterval(interval);
        console.log("✅ Demo 3 completo");
        return;
      }
      servoX.to(angle);
      servoY.to(angle);
      servoZ.to(angle);
      angle += 1;
    }, 50); // velocidad suave
  }

  function demo4_dance() {
    console.log("🎬 Demo 4: Baile Tapster 💃🕺");
    let steps = [
      [100, 170, 90],
      [180, 90, 180],
      [90, 180, 100],
      [170, 100, 170],
      [90, 90, 90],
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i >= steps.length) {
        clearInterval(interval);
        console.log("✅ Baile completado");
        return;
      }
      const [x, y, z] = steps[i];
      servoX.to(x);
      servoY.to(y);
      servoZ.to(z);
      console.log(`🎵 Paso ${i + 1}`);
      i++;
    }, 700);
  }

  keypress(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.resume();

  process.stdin.on("keypress", (ch, key) => {
    //if (!key) return;

    const input = ch || key?.name;

    switch (input) {
      // Servo X
      case "q":
        angleX = Math.min(angleX + 10, 180);
        servoX.to(angleX);
        console.log(`Servo X ➡️ ${angleX}°`);
        break;
        e;
      case "a":
        angleX = Math.max(angleX - 10, 0);
        servoX.to(angleX);
        console.log(`Servo X ⬅️ ${angleX}°`);
        break;

      // Servo Y
      case "w":
        angleY = Math.min(angleY + 10, 180);
        servoY.to(angleY);
        console.log(`Servo Y ➡️ ${angleY}°`);
        break;
      case "s":
        angleY = Math.max(angleY - 10, 0);
        servoY.to(angleY);
        console.log(`Servo Y ⬅️ ${angleY}°`);
        break;

      // Servo Z
      case "e":
        angleZ = Math.min(angleZ + 10, 180);
        servoZ.to(angleZ);
        console.log(`Servo Z ➡️ ${angleZ}°`);
        break;
      case "d":
        angleZ = Math.max(angleZ - 10, 0);
        servoZ.to(angleZ);
        console.log(`Servo Z ⬅️ ${angleZ}°`);
        break;

      // DEMOS
      case "1":
        demo1_individualSteps();
        break;
      case "2":
        demo2_syncSteps();
        break;
      case "3":
        demo3_syncSmooth();
        break;
      case "4":
        demo4_dance();
        break;

      // Salida
      case "z":
      case "c":
        if (key.ctrl) {
          console.log("🛑 Saliendo...");
          process.exit();
        }
        break;
    }
  });
});
