//-- Declare a new module, with the `ng-admin` module as a dependency
var app = angular.module('appbase-admin', ['ng-admin']);

function truncate(value) {
  if (!value) {
    return '';
  }
  return value.length > 50 ? value.substr(0, 50) + '...' : value;
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
      nga.field('name').isDetailLink(true)
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
          nga.field('date', 'datetime'),
          nga.field('comments'),
          nga.field('rating')
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
        .map(truncate),
      nga.field('cityId', 'reference')
        .targetEntity(city)
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
        .targetFields([
            nga.field('date'),
            nga.field('rating'),
            nga.field('comments')
        ])
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
  admin.addEntity(review);
  admin.addEntity(shop);

  //-- Attach the admin application to the DOM and execute it
  nga.configure(admin);

}]);
