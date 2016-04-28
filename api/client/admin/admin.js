//-- Declare a new module, and make it require the `ng-admin` module as a dependency
var myApp = angular.module('appbase-admin', ['ng-admin']);

function truncate(value) {
  if (!value) {
    return '';
  }
  return value.length > 50 ? value.substr(0, 50) + '...' : value;
}

//-- Declare a function to run when the module bootstraps (during the 'config' phase)
myApp.config(['NgAdminConfigurationProvider', function (nga) {
  //-- create an admin application
  var admin = nga.application('Admin Dashboard')
             .baseApiUrl('http://api.appbase.ga/api/');
  
    
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
  // ENTITY   : shop 
  // endpoint : /shops/:id
  //-----------------------------------
  var shop = nga.entity('shops');
  shop.listView()
    .description('List of shops')
    .fields([
      nga.field('name').isDetailLink(true),
      nga.field('desc').map(truncate),
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
          .label('City')/*,
      nga.field('reviews', 'referenced_list')
        .targetEntity(nga.entity('reviews'))
        .targetReferenceField('shopId')
        .targetFields([
            nga.field('date'),
            nga.field('rating'),
            nga.field('comments')
        ])
        .sortField('date')
        .sortDir('DESC')*/
    ]);
  
  shop.creationView().fields([
    nga.field('name'),
    nga.field('desc', 'text'),
    nga.field('location.lat').label('Latitude'),
    nga.field('location.lng').label('Longitude'),
    nga.field('cityId')
  ]);
  
  admin.dashboard(nga.dashboard()
    .addCollection(nga.collection(shop)
        .name('all_shops')
        .title('Current Shops')
        .perPage(5) // limit the panel to the 5 latest posts
        .fields([
            nga.field('published_at', 'date').label('Published').format('MMM d'),
            nga.field('name').isDetailLink(true).map(truncate),
            nga.field('views', 'number')
        ])
        .sortField('date')
        .sortDir('DESC')
        .order(1)
    )
  );

  // Attach entities to app
  admin.addEntity(city);
  admin.addEntity(shop);
  
  //-- Attach the admin application to the DOM and execute it
  nga.configure(admin);
    
}]);

// myApp.config(['RestangularProvider', function (RestangularProvider) {
//     RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
//         if (operation == "getList") {
//             // custom pagination params
//             if (params._page) {
//                 params._start = (params._page - 1) * params._perPage;
//                 params._end = params._page * params._perPage;
//             }
//             delete params._page;
//             delete params._perPage;
//             // custom sort params
//             if (params._sortField) {
//                 params._sort = params._sortField;
//                 params._order = params._sortDir;
//                 delete params._sortField;
//                 delete params._sortDir;
//             }
//             // custom filters
//             if (params._filters) {
//                 for (var filter in params._filters) {
//                     params[filter] = params._filters[filter];
//                 }
//                 delete params._filters;
//             }
//         }
//         return { params: params };
//     });
// }]);