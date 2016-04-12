# App Base

A production ready mobile app foundation.

![](logo.jpg)

[TOC]

## Features

* Ready to extend Loopback REST api
* Infinite scroll items list
* Authentication simple form + fb button
* Fitering items basic form
* Manage favorites items list
* Admin dashboard items manager
* Rating and comments items
* Sharing items

## Shocase apps

* www.leguide.ga [Loisirs, Services, Events]

## Road map

* Filters : type, tags ...
* Dedicated "ionicview" app
* User account managment
* Item images upload on mobile (ex :for restaurant, or shop)
* Xamarin based mobile client (ios, android, windows) 
* [Pro] Organisation with multiples items and prices (services, articles)
* [Pro] Organisation private admin board (items, publish ...) 

...

## Getting started

Actually, App Base (v1.0) is a fullstack js ecosystem :

### Tech stack

* REST API : [LoopBack Framework](https://strongloop.com/node-js/loopback-framework)
* Mobile App : [Ionic Framework](http://ionicframework.com/)
* Dashboard [NG-admin](https://github.com/marmelab/ng-admin)

### Install dev stack

__Prerequites__

* Node Js

__Install manually__

```
npm install -g strongloop
npm install -g cordova
npm install -g ionic
```

Start app

```
$ git clone git@git.mikangali.com:lab-241/appbase
$ cd appbase

# start loopback api
$ cd api
$ grunt

# start ionic mobile app
$ cd mobile
$ ionic serv --lab
```

## ionic app commands

 * cd into project: $ cd appbase/mobile
 * Setup this project to use Sass: ionic setup sass
 * Develop in the browser with live reload: ionic serve
 * Add a platform (ios or Android): ionic platform add ios [android]
 * Build your app: ionic build <PLATFORM>
 * Simulate your app: ionic emulate <PLATFORM>
 * Run your app on a device: ionic run <PLATFORM>
 * Package an app using Ionic package service: ionic package <MODE> <PLATFORM>


## Links

* https://slides.com/mikamboo/app-base/edit
* http://startbootstrap.com/template-overviews/stylish-portfolio/


TODO : 
================

* build => ionic.io (+ notifications) 
* icône personnalisé => mettre les images dans le dossier res/drawable
* Présentation slides.com


IDEAS
================

* Modules market
* 
