# App Base

[![Join the chat at https://gitter.im/lab-241/appbase](https://badges.gitter.im/lab-241/appbase.svg)](https://gitter.im/lab-241/appbase?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A production ready mobile app foundation.

[![Build Status](https://travis-ci.org/lab-241/appbase.svg?branch=master)](https://travis-ci.org/lab-241/appbase)

## What's [App Base](http://appbase.ga) ?

A simple, robust fullstack js base for creating real life apps !

__AB__ = [LOOPBACK](http://loopback.io) __+__ [IONIC](http://ionicframework.com/)

![](doc/Loopback_Ionic.png)

## Table of content

1. [Features](#features)
1. [Road map](#raod-map)
1. [Getting started](#getting-started)
1. [Links](#links)

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


### Development quick start

__Prerequites__

* [NodeJs](https://nodejs.org/en/download/package-manager)

__Install dev tools__

App base is built on top of ionic (who use cordova) and strongloop.
Some others automation tools (like gulp) are required.

```
npm install -g cordova ionic strongloop grunt-cli gulp bower karma-cli phantomjs
```

__Start app components__

```
$ git clone git@git.mikangali.com:lab-241/appbase
$ cd appbase

# Start loopback api

$ cd api
$ npm install
$ grunt

# Start ionic mobile app

$ cd ../mobile
$ bower install
$ ionic serve --lab

# Run ionic app on android

$ ionic platform android
$ ionic run android --livereload
```

## Links

* [Project website](http://appbase.ga)
* [Github repo](https://github.com/lab-241/appbase)
* [Build status](https://travis-ci.org/lab-241/appbase)
* [Slides show](https://slides.com/mikamboo/app-base/edit)
