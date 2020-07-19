#!/bin/bash

cp -avr /usr/src/cache/node_modules/. /usr/src/serverROS/node_modules/
exec npm start
