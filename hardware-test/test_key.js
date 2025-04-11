const keypress = require("keypress");

// Habilitar el módulo de keypress
keypress(process.stdin);

// Modo raw y empezar a escuchar
process.stdin.setRawMode(true);
process.stdin.resume();

console.log("Presioná teclas (Ctrl+C para salir)");

process.stdin.on("keypress", function (ch, key) {
  console.log("---");
  console.log("sequence:", key?.sequence);
  console.log("name    :", key?.name);
  console.log("ctrl    :", key?.ctrl);
  console.log("shift   :", key?.shift);
  console.log("meta    :", key?.meta);
  console.log("ch      :", ch);

  // Salir con Ctrl+C
  if (key && key.ctrl && key.name === "c") {
    console.log("Saliendo...");
    process.exit();
  }
});
