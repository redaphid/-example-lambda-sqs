#!/bin/sh
CONTROLLER_PATH="node_modules/meshblu-core-protocol-adapter-http/src/controllers/"
for i in $(ls $CONTROLLER_PATH); do coffee -c -b -o src/controllers/ $i; done