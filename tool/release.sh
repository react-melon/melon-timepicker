#!/bin/bash

rm -rf lib
mkdir -p lib
edp build -f
mv output/asset lib
cp package.json README.md lib
rm -rf output

cd lib

npm publish
