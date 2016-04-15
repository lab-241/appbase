# App Base

A production ready mobile app foundation.

[![Build Status](https://travis-ci.org/lab-241/appbase.svg?branch=master)](https://travis-ci.org/lab-241/appbase)

What's [App Base](https://github.com/lab-241/appbase) ? `AB = LOOPBACK + IONIC`

![](doc/Loopback_Ionic.png)

## Table of content

1. [Features](#features)
1. [Road map](#raod-map)
1. [Getting started](#getting-started)

## Features

* Ready to extend Loopback REST api
* Infinite scroll items list
* Authentication simple form + fb button
* Fitering items basic form
* Manage favorites items list
* Admin dashboard items manager
* Rating and comments items
* Internationalization

## Road map

* Sharing items
* Deploy documentation (manual + docker)
* Dev with docker
* Basic ittems filters : type, tags ...
* Dedicated "ionicview" app
* User account managment
* Xamarin based mobile client (ios, android, windows) 
...

## Getting started

Actually, App Base (v1.0) is a fullstack js ecosystem :

| Need |Solution|
|---|---|
|REST API|[LoopBack Framework](https://strongloop.com/node-js/loopback-framework)|
|Mobile App|[Ionic Framework](http://ionicframework.com/)|
|Admin Dashboard|[NG-admin](https://github.com/marmelab/ng-admin)|


### Install dev stack

__Prerequites__

* [NodeJs](https://nodejs.org/en/download/package-manager)

__Install dev tools__

App base is built on top of ionic (who use cordova) and strongloop

```
npm install -g cordova ionic strongloop grunt-cli
```

__Start app components__

```
$ git clone git@git.mikangali.com:lab-241/appbase
$ cd appbase

# start loopback api
$ cd api
$ node .

# start ionic mobile app
$ cd ../mobile
$ ionic serv --lab
```

## Links

* [Project website](http://appbase.ga)
* [Github repo](https://github.com/lab-241/appbase)
* [Build status](https://travis-ci.org/lab-241/appbase)
* [Slides show](https://slides.com/mikamboo/app-base/edit)

