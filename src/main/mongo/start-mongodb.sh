#!/usr/bin/env bash

THIS_DIR="$(cd "$(dirname "$0")"; pwd)"

CONTAINER="$1"
PORT=$2

if [ -n "$CI_COMMIT_SHA" ]; then
  echo 'in pipeline - mongodb is started'
else
  "$THIS_DIR/start-mongodb-container.sh" "$CONTAINER" $PORT
fi
