#!/usr/bin/env bash

set -euo pipefail

PORT=4100
PID_FILE=".webportal.pid"
LOG_FILE="webportal.log"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

usage() {
  echo "Usage: $0 {start|stop|status|restart}"
  exit 1
}

port_pids() {
  # Extract PIDs listening on a given port via ss (works on WSL2)
  ss -tlnp 2>/dev/null | awk -v p=":$1" '$4 ~ p {
    match($0, /pid=([0-9]+)/, a); if (a[1]) print a[1]
  }'
}

show_ports() {
  echo "Ports in use (node/next):"
  ss -tlnp 2>/dev/null | awk '
    NR==1 { next }
    /node|npm|next/ { printf "  %s\n", $0 }
  ' || true
}

start() {
  if [[ -f "$DIR/$PID_FILE" ]]; then
    PID=$(cat "$DIR/$PID_FILE")
    if kill -0 "$PID" 2>/dev/null; then
      echo "Already running (PID $PID) on port $PORT"
      show_ports
      exit 0
    fi
    rm -f "$DIR/$PID_FILE"
  fi

  echo "Building..."
  cd "$DIR" && npm run build

  echo "Starting on port $PORT..."
  # setsid: new session so kill -PGID kills node children too
  # -- -p passes port explicitly to next start
  cd "$DIR" && setsid npm run start -- -p "$PORT" >> "$DIR/$LOG_FILE" 2>&1 &
  BGPID=$!
  disown "$BGPID"
  echo "$BGPID" > "$DIR/$PID_FILE"
  echo "Started (PID $BGPID) — logs: $LOG_FILE"
  sleep 3
  show_ports
}

stop() {
  PORT_PIDS=$(port_pids "$PORT")

  if [[ -f "$DIR/$PID_FILE" ]]; then
    SAVED_PID=$(cat "$DIR/$PID_FILE")
    if kill -0 "$SAVED_PID" 2>/dev/null; then
      PGID=$(ps -o pgid= -p "$SAVED_PID" 2>/dev/null | tr -d ' ') || true
      [[ -n "$PGID" ]] && kill -- -"$PGID" 2>/dev/null || kill "$SAVED_PID" 2>/dev/null || true
    fi
    rm -f "$DIR/$PID_FILE"
  fi

  if [[ -n "$PORT_PIDS" ]]; then
    echo "$PORT_PIDS" | xargs -r kill -TERM 2>/dev/null || true
    sleep 1
    echo "$PORT_PIDS" | xargs -r kill -9 2>/dev/null || true
  fi

  echo "Stopped (port $PORT cleared)"
}

status() {
  RUNNING_PIDS=$(port_pids "$PORT")

  if [[ -n "$RUNNING_PIDS" ]]; then
    echo "Running on port $PORT (PIDs: $RUNNING_PIDS)"
  else
    echo "Nothing on port $PORT"
  fi

  # Update stale PID file
  if [[ -f "$DIR/$PID_FILE" ]]; then
    SAVED_PID=$(cat "$DIR/$PID_FILE")
    if ! kill -0 "$SAVED_PID" 2>/dev/null; then
      rm -f "$DIR/$PID_FILE"
    fi
  fi

  show_ports
}

case "${1:-}" in
  start)   start ;;
  stop)    stop ;;
  status)  status ;;
  restart) stop; start ;;
  *)       usage ;;
esac
