# App base ionic project

[Ionic](http://ionicframework.com) based mobile part of **App Base** ecosystem.

![](ionic-angular.png)

### TIP : Common Ionic commands

 * cd into project: $ cd appbase/mobile
 * Setup this project to use Sass: ionic setup sass
 * Develop in the browser with live reload: ionic serve
 * Add a platform (ios or Android): ionic platform add ios [android]
 * Build your app: ionic build <PLATFORM>
 * Simulate your app: ionic emulate <PLATFORM>
 * Run your app on a device: ionic run <PLATFORM>
 * Package an app using Ionic package service: ionic package <MODE> <PLATFORM>

### TIP : style with `.scss` files

This project support sass vi gulp task live compilation task.

__Attention:__ Don't forget to imprt custom scss files in `scss/ionic.app.scss` like this : 

```
// Include all of Ionic
@import "www/lib/ionic/scss/ionic";
@import "auth";
@import "shop";
```

### Links

* https://github.com/johnpapa/angular-styleguide
