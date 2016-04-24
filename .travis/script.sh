#! /bin/sh
#
echo "-- Install api dependencies --"
cd api
npm install

echo "Install ionic libs"
cd ../mobile
npm install
bower install

echo "Ionic : execute unit tests"

grunt test
