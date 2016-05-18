#! /bin/sh

cd appbase-server
grunt serve &

cd ../appbase-client-ionic
ionic serve --lab
