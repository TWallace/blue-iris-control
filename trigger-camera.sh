#!/bin/bash

echo "trigger-camera.sh called with param" $1 > ./log.txt
curl -X POST --data camera=$1 http://192.168.1.18:3000/trigger
