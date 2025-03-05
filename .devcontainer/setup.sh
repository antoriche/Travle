#!/usr/bin/env sh

npm i

if [ ! -f app/.env ]; then
  cp app/.env.sample app/.env
fi
