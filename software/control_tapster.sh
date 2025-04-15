#!/bin/bash

# Coordenadas iniciales
x=0
y=0
z=-195

# Dirección del robot
ROBOT_URL="http://127.0.0.1:8080/go"

# Función para enviar la posición al robot
send_position() {
  curl -s -X POST "$ROBOT_URL" \
    -H "Content-Type: application/json" \
    -d "{\"x\": $x, \"y\": $y, \"z\": $z}" > /dev/null
  echo "Enviado: x=$x, y=$y, z=$z"
}

# Instrucciones
echo "Control manual del robot:"
echo "W: +Y | S: -Y | D: +X | A: -X | O: +Z | L: -Z | Q: salir"

# Loop de lectura de teclas
while true; do
  read -rsn1 key  # Leer una tecla (sin mostrarla)

  case "$key" in
    d|D)
      ((y+=1))
      send_position
      ;;
    a|A)
      ((y-=1))
      send_position
      ;;
    w|W)
      ((x+=1))
      send_position
      ;;
    s|S)
      ((x-=1))
      send_position
      ;;
    l|L)
      if [ "$z" -lt 200 ]; then
        ((z+=1))
        send_position
      else
	echo "Limite en Z alcanzado"
      fi
      ;;
    o|O)
      if [ "$z" -gt -200 ]; then
      ((z-=1))
      send_position
      else
      echo "limite en z alcanzado"
      fi
      ;;
    q|Q)
      echo "Saliendo..."
      break
      ;;
    *)
      echo "Tecla no válida. Usa W/S/A/D/O/L para mover, Q para salir."
      ;;
  esac
done
