const five = require("johnny-five");
const keypress = require("keypress");
const angles = [90, 90, 90]; // posición actual de cada servo

const board = new five.Board();

board.on("ready", () => {
  const servo1 = new five.Servo({ pin: 9, startAt: 90 });
  const servo2 = new five.Servo({ pin: 10, startAt: 90 });
  const servo3 = new five.Servo({ pin: 11, startAt: 90 });

  const servos = [servo1, servo2, servo3];

  // Mostrar menú de demos
  console.log("TapsterBot Demo Control");
  console.log("Controles manuales:");
  console.log("  Servo 1: A (↻) / S (↺)");
  console.log("  Servo 2: K (↻) / L (↺)");
  console.log("  Servo 3: Z (↻) / X (↺)\n");
  console.log("Demos:");
  console.log("  1 o z → Demo 1: Uno por uno, pasos de 10");
  console.log("  2     → Demo 2: Todos juntos, pasos de 10");
  console.log("  3     → Demo 3: Todos juntos, movimiento fluido");
  console.log("  4     → Demo 4: Baile loco");
  console.log("  Ctrl+C para salir\n");

  // Setup para leer teclas
  keypress(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.resume();

  process.stdin.on("keypress", (ch, key) => {
    const input = ch || key?.name;

    switch (input) {
      case "q":
        moveServo(0, 10); //llamo a moveServo y le paso (index, delta)
        break; // Servo 1 horario
      case "a":
        moveServo(0, -10);
        break; // Servo 1 antihorario

      case "w":
        moveServo(1, 10);
        break; // Servo 2 horario
      case "s":
        moveServo(1, -10);
        break; // Servo 2 antihorario

      case "e":
        moveServo(2, 10);
        break; // Servo 3 horario
      case "d":
        moveServo(2, -10);
        break; // Servo 3 antihorario

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
      case "\u0003": // Ctrl+C
        console.log("Saliendo...");
        process.exit();
    }
  });

  // --- DEMOS ---

  // Demo 1: Uno por uno, pasos de 10
  function demo1_individualSteps() {
    console.log("Demo 1: Uno por uno, pasos de 10");
    servos.forEach((servo, i) => {
      setTimeout(() => {
        sweepSteps(servo, 90, 180, 10, () => {
          sweepSteps(servo, 180, 90, 10);
        });
      }, i * 1000);
    });
  }

  // Demo 2: Todos juntos, pasos de 10
  function demo2_syncSteps() {
    console.log("Demo 2: Todos juntos, pasos de 10");
    sweepAll(90, 180, 10, () => {
      sweepAll(180, 90, 10);
    });
  }

  // Demo 3: Todos juntos, fluido
  function demo3_syncSmooth() {
    console.log("Demo 3: Todos juntos, fluido");
    servos.forEach((servo) => servo.to(180, 1000));
    setTimeout(() => {
      servos.forEach((servo) => servo.to(90, 1000));
    }, 1500);
  }

  // Demo 4: Baile loco
  function demo4_dance() {
    console.log("Demo 4: Baile loco");
    let count = 0;
    const interval = setInterval(() => {
      servos[0].to(randomAngle());
      servos[1].to(randomAngle());
      servos[2].to(randomAngle());
      count++;
      if (count > 10) {
        clearInterval(interval);
        servos.forEach((servo) => servo.to(90));
      }
    }, 300);
  }

  function moveServo(index, delta) {
    angles[index] += delta;
    if (angles[index] < 90) angles[index] = 90;
    if (angles[index] > 180) angles[index] = 180;
    servos[index].to(angles[index]);
    console.log(`Servo ${index + 1} → ${angles[index]}°`);
  }

  // --- FUNCIONES DE AYUDA ---

  function sweepSteps(servo, from, to, step = 10, callback) {
    let pos = from;
    const stepDir = from < to ? step : -step;
    const interval = setInterval(() => {
      servo.to(pos);
      pos += stepDir;
      if ((stepDir > 0 && pos > to) || (stepDir < 0 && pos < to)) {
        clearInterval(interval);
        if (callback) callback();
      }
    }, 150);
  }

  function sweepAll(from, to, step = 10, callback) {
    let pos = from;
    const stepDir = from < to ? step : -step;
    const interval = setInterval(() => {
      servos.forEach((servo) => servo.to(pos));
      pos += stepDir;
      if ((stepDir > 0 && pos > to) || (stepDir < 0 && pos < to)) {
        clearInterval(interval);
        if (callback) callback();
      }
    }, 150);
  }

  function randomAngle() {
    return Math.floor(Math.random() * 90) + 90; // entre 90 y 180
  }
});
