angular
  .module('appbase.conf')
  .config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'app/layout/views/shell.html',
    controller: 'AppCtrl'
  })
  
  .state('app.shop-list', {
    url: '/shops',
    views: {
      'menuContent': {
        templateUrl: 'app/shop/views/shop-list.html',
        controller: 'ShopListCtrl'
      }
    }
  })

  .state('app.shop-item', {
    url: '/shops/:shopId',
    views: {
      'menuContent': {
        templateUrl: 'app/shop/views/shop.html',
        controller: 'ShopItemCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/shops');
});