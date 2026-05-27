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

start() {
  if [[ -f "$DIR/$PID_FILE" ]]; then
    PID=$(cat "$DIR/$PID_FILE")
    if kill -0 "$PID" 2>/dev/null; then
      echo "Already running (PID $PID) on port $PORT"
      exit 0
    fi
    rm -f "$DIR/$PID_FILE"
  fi

  echo "Building..."
  cd "$DIR" && npm run build

  echo "Starting on port $PORT..."
  PORT=$PORT nohup npm run start >> "$DIR/$LOG_FILE" 2>&1 &
  echo $! > "$DIR/$PID_FILE"
  echo "Started (PID $!) — logs: $LOG_FILE"
}

stop() {
  if [[ ! -f "$DIR/$PID_FILE" ]]; then
    echo "Not running (no PID file)"
    exit 0
  fi

  PID=$(cat "$DIR/$PID_FILE")
  if kill -0 "$PID" 2>/dev/null; then
    kill "$PID"
    rm -f "$DIR/$PID_FILE"
    echo "Stopped (PID $PID)"
  else
    echo "Process $PID not found — cleaning PID file"
    rm -f "$DIR/$PID_FILE"
  fi
}

status() {
  if [[ -f "$DIR/$PID_FILE" ]]; then
    PID=$(cat "$DIR/$PID_FILE")
    if kill -0 "$PID" 2>/dev/null; then
      echo "Running (PID $PID) on port $PORT"
      exit 0
    else
      echo "PID file exists but process $PID is dead"
      exit 1
    fi
  fi

  # Fallback: check port
  if lsof -ti tcp:"$PORT" &>/dev/null; then
    echo "Something listening on port $PORT (not managed by this script)"
    exit 0
  fi

  echo "Not running"
  exit 1
}

case "${1:-}" in
  start)   start ;;
  stop)    stop ;;
  status)  status ;;
  restart) stop; start ;;
  *)       usage ;;
esac
