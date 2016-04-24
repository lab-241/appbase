#! /bin/sh
#
echo "-- Install api dependencies --"
cd $CI_HOME/api
npm install

echo "Install ionic libs"
cd $CI_HOME/mobile
npm install
bower install

echo "Ionic : execute unit tests"

grunt test
