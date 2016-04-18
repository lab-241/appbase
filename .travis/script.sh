#! /bin/sh
#
echo "-- Install api dependencies --"
cd $CI_HOME/api
npm install

echo "Install ionic libs"
cd $CI_HOME/mobile
bower install
