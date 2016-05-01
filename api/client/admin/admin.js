//-- Declare a new module, with the `ng-admin` module as a dependency
var app = angular.module('appbase-admin', ['ng-admin']);

function truncate(value, size) {
  if (!value) {
    return '';
  }
  if (!size) {
    size = 20;
  }
  return value.length > size ? value.substr(0, size) + '...' : value;
}

//-- Declare a function to run when the module bootstraps
app.config(['NgAdminConfigurationProvider', function (nga) {
  //-- create an admin application
  var admin = nga.application('Admin Dashboard')
             .baseApiUrl('http://localhost:3000/api/');

  //-----------------------------------
  // ENTITY   : city
  // endpoint : /cities/:id
  //-----------------------------------
  var city = nga.entity('cities');
  city.listView()
    .description('List of cities')
    .fields([
      nga.field('name').isDetailLink(true),
      nga.field('location.lat'),
      nga.field('location.lng')
    ]);

    city.creationView()
    .fields([
      city.listView().fields()
    ]);

  //-----------------------------------
  // ENTITY   : user
  // endpoint : /users/:id
  //-----------------------------------
  var user = nga.entity('users');
  user.listView()
    .description('List of users')
    .fields([
      nga.field('username'),
      nga.field('email')
    ]);
      
  //-----------------------------------
  // ENTITY   : review
  // endpoint : /reviews/:id
  //-----------------------------------
  var review = nga.entity('reviews');
  review.listView()
    .title('Reviews')
    .sortField('date')
    .sortDir('DESC')
    .fields([
        nga.field('date', 'datetime').isDetailLink(true),
        nga.field('comments').map(truncate),
        nga.field('rating', 'template')
          .template(
            '<star-rating stars="{{entry.values.rating}}"></star-rating>'),
        nga.field('shopId', 'reference')
          .targetField(nga.field('name'))
          .targetEntity(nga.entity('shops'))
          .label('Shop')
    ]);

  review.showView()
    .fields([
      review.listView().fields()
    ]);

  //-----------------------------------
  // ENTITY   : shop
  // endpoint : /shops/:id
  //-----------------------------------
  var shop = nga.entity('shops');
  shop.listView()
    .description('List of shops')
    .fields([
      nga.field('name').isDetailLink(true),
      nga.field('desc')
        .label('Description')
        .map(function(txt){return truncate(txt, 50);}),
      nga.field('cityId', 'reference')
        .targetEntity(nga.entity('cities'))
        .targetField(nga.field('name'))
        .label('City')
    ]);

  shop.showView()
    .fields([
      nga.field('name'),
      nga.field('desc', 'text'),
      nga.field('cityId', 'reference')
          .targetEntity(city)
          .targetField(nga.field('name'))
          .label('City'),
      nga.field('reviews', 'referenced_list')
        .targetEntity(nga.entity('reviews'))
        .targetReferenceField('shopId')
        .targetFields(review.listView().fields())
        .sortField('date')
        .sortDir('DESC')
    ]);

  shop.creationView().fields([
    nga.field('name'),
    nga.field('desc', 'text'),
    nga.field('location.lat').label('Latitude'),
    nga.field('location.lng').label('Longitude'),
    nga.field('cityId')
  ]);

  // Attach entities to app
  admin.addEntity(city);
  admin.addEntity(shop);
  admin.addEntity(user);
  admin.addEntity(review);

// Customize menu entries
  admin.menu(nga.menu()
  .addChild(nga.menu(city).icon('<span class="glyphicon glyphicon-map-marker"></span>'))
  .addChild(nga.menu(shop).icon('<span class="glyphicon glyphicon-shopping-cart"></span>'))
  .addChild(nga.menu(user).icon('<span class="glyphicon glyphicon-user"></span>'))
  .addChild(nga.menu(review).icon('<span class="glyphicon glyphicon-comment"></span>'))
  .addChild(nga.menu()
      .template(
      '<a href="/"><i class="glyphicon glyphicon-home"></i> Exit</a>')
    )
  );

  //-- Attach the admin application to the DOM and execute it
  nga.configure(admin);

}]);
