#!/bin/sh

MAPUI=$(cd $(dirname "${BASH_SOURCE[0]}")/../ && pwd -P)
docker run -it -P \
  -v $MAPUI:/usr/src/app \
  -p 5000:5000 \
  map-compare-ui \
  bash -l