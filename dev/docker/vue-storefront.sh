#!/bin/sh
set -e

if [ "$VS_ENV" = 'dev' ]; then
  yarn start:ct --hostname 0.0.0.0 --port 3000
else
  yarn start:ct --hostname 0.0.0.0 --port 3000
fi
