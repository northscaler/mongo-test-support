#!/usr/bin/env sh

THIS_DIR="$(cd "$(dirname "$0")"; pwd)"

if { [ -n "$GITHUB_SHA" ] || [ -n "$CI_COMMIT_SHA" ]; }; then # we're in CI pipeline
  echo 'in pipeline - mongo is started'
else
  CONTAINER=${1:-$MONGO_TEST_SUPPORT_MONGO_HOST}
  if [ -z "$CONTAINER" ]; then
    CONTAINER="$(cat $THIS_DIR/default-mongo-test-container)"
  fi
  PORT=${2:-$MONGO_TEST_SUPPORT_MONGO_PORT}
  if [ -z "$PORT" ]; then
    PORT="$(cat $THIS_DIR/default-mongo-test-port)"
  fi
  if [ -z "$(docker ps --quiet --filter name=$CONTAINER)" ]; then
    "$THIS_DIR/start-mongo-container.sh" "$CONTAINER" $PORT
  fi
fi
