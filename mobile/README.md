# App base ionic project

[Ionic](http://ionicframework.com) based mobile part of **App Base** ecosystem.

![](ionic-angular.png)

### Getting started

__NB :__ Before run this app you have to ensure you have started AppBase REST api server.

Open bash console into appbase mobile project directory, then :

```
$ npm install
$ bower install
$ ionic serve --lab
```

### Change api endpoint config value

By default in development this mobile client fetch api at `htpp://localhost:3000`.
You can change it manually or by running `ngconstant` grunt task (default task).

__NB :__ It necessary to test on device.

```
# replace [http://your-server.org/api] with your AppBase api endpoint
$ API_ENDPOINT=[http://your-server.org/api] grunt && ionic serve --lab
```

This will override API_BASE_URL in `appbase.conf` module located at `www/app/conf/ConfParams.js`.


### TIP : Common Ionic commands

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
