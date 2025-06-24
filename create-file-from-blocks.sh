#!/bin/bash

INPUT_FILE="$1"

if [[ ! -f "$INPUT_FILE" ]]; then
  echo "❌ Archivo '$INPUT_FILE' no encontrado."
  exit 1
fi

current_file=""
temp_content_file=$(mktemp)

cleanup() {
  rm -f "$temp_content_file"
}
trap cleanup EXIT

# Leer el archivo línea por línea con buffer para mirar 3 líneas seguidas
exec 3< "$INPUT_FILE"

while true; do
  read -r line1 <&3 || break
  read -r line2 <&3 || break
  read -r line3 <&3 || break

  # ¿Coincide con patrón bloque delimitador?
  if [[ "$line1" =~ ^//[[:space:]]+={10,}[[:space:]]*$ ]] && \
     [[ "$line3" =~ ^//[[:space:]]+={10,}[[:space:]]*$ ]] && \
     [[ "$line2" =~ ^//[[:space:]]*(.+)[[:space:]]*$ ]]; then

    # Si ya hay archivo abierto, guardar su contenido
    if [[ -n "$current_file" ]]; then
      mkdir -p "$(dirname "$current_file")"
      cp "$temp_content_file" "$current_file"
      echo "✅ Archivo creado: $current_file"
      > "$temp_content_file"
    fi

    # Asignar nuevo archivo
    current_file=$(echo "${BASH_REMATCH[1]}" | xargs)
  else
    # Si la línea 1 no es delimitador, se escribe la línea 1 en contenido
    if [[ -n "$current_file" ]]; then
      echo "$line1" >> "$temp_content_file"
    fi

    # Rewind lectura para que el ciclo no pierda lineas
    # O se hace "unread" de las líneas 2 y 3 para que vuelvan a entrar

    # Lo que podemos hacer es retroceder 2 líneas leyendo línea 2 y 3 en una cola

    # Pero bash no tiene "unread", así que mejor hacer esto:

    # Escribir línea 2 y 3 en un buffer y luego reinsertar antes del próximo read

    # Para simplificar, volvemos a abrir el descriptor 3 desde línea 2:

    # Para eso, movemos el cursor 2 líneas atrás en el archivo

    # Pero bash no tiene esa funcionalidad sencilla.

    # Alternativa: Procesar el archivo con un buffer de línea

    # Por simplicidad, se puede hacer un 'read' línea a línea sin mirar 3 líneas

    # Así que, mejor cambiar a lectura línea a línea y detectar bloque delimitador de 3 líneas consecutivas sin salto.

    # Entonces, abandonar este método y usar otra estrategia.

    # --> Vamos a cambiar a leer línea a línea con buffer de las últimas 3 líneas.

    # Salimos del ciclo actual para usar nuevo método

    break
  fi
done

# Si salimos del ciclo antes de acabar archivo, pasamos a método línea a línea

if [[ ! -s "$temp_content_file" ]]; then
  # No se guardó nada, empezamos línea a línea

  current_file=""
  > "$temp_content_file"

  tail -n +1 "$INPUT_FILE" | {
    # Buffer para detectar 3 líneas bloque delimitador
    buffer=()

    flush_buffer() {
      # Si current_file y buffer tiene contenido que no sea bloque delimitador, guardarlo
      if [[ ${#buffer[@]} -gt 0 ]]; then
        for bline in "${buffer[@]}"; do
          # Si estamos en bloque y archivo asignado, guardamos líneas
          if [[ -n "$current_file" ]]; then
            echo "$bline" >> "$temp_content_file"
          fi
        done
      fi
      buffer=()
    }

    while IFS= read -r line; do
      # Añadir línea al buffer
      buffer+=("$line")

      # Mantener buffer máximo 3 líneas
      if [[ ${#buffer[@]} -gt 3 ]]; then
        # Sacar la primera línea y escribir si es contenido
        first="${buffer[0]}"
        buffer=("${buffer[@]:1}")
        if [[ -n "$current_file" ]]; then
          echo "$first" >> "$temp_content_file"
        fi
      fi

      # Cuando el buffer tiene 3 líneas, chequear si es bloque delimitador
      if [[ ${#buffer[@]} -eq 3 ]]; then
        if [[ "${buffer[0]}" =~ ^//[[:space:]]+={10,}[[:space:]]*$ ]] && \
           [[ "${buffer[2]}" =~ ^//[[:space:]]+={10,}[[:space:]]*$ ]] && \
           [[ "${buffer[1]}" =~ ^//[[:space:]]*(.+)[[:space:]]*$ ]]; then

          # Guardar archivo anterior si existe
          if [[ -n "$current_file" ]]; then
            mkdir -p "$(dirname "$current_file")"
            cp "$temp_content_file" "$current_file"
            echo "✅ Archivo creado: $current_file"
            > "$temp_content_file"
          fi

          # Nueva ruta de archivo
          current_file=$(echo "${BASH_REMATCH[1]}" | xargs)

          # Vaciar buffer (no guardar estas líneas en contenido)
          buffer=()
        fi
      fi

    done

    # Al final, vaciar buffer restante si hay
    flush_buffer

    # Guardar último archivo si queda contenido
    if [[ -n "$current_file" ]]; then
      mkdir -p "$(dirname "$current_file")"
      cp "$temp_content_file" "$current_file"
      echo "✅ Archivo creado: $current_file"
    fi
  }
fi
