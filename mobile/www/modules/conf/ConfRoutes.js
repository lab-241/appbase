angular
  .module('appbase.conf')
  .config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'modules/menu/views/menu.html',
    controller: 'AppCtrl'
  })
  
  .state('app.shop-list', {
    url: '/shops',
    views: {
      'menuContent': {
        templateUrl: 'modules/shop/views/shop-list.html',
        controller: 'ShopListCtrl'
      }
    }
  })

  .state('app.shop-item', {
    url: '/shops/:shopId',
    views: {
      'menuContent': {
        templateUrl: 'modules/shop/views/shop.html',
        controller: 'ShopItemCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/shops');
});