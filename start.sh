#! /bin/sh

cd api
grunt serve &

cd ../mobile
ionic serve --lab
