#!/bin/sh
set -e

if [ "$VS_ENV" = 'dev' ]; then
  HOST=0.0.0.0 yarn start:ct
else
  HOST=0.0.0.0 yarn start:ct
fi
