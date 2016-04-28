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
  .state('app.shops', {
    url: '/shops',
    views: {
      'menuContent': {
        templateUrl: 'app/shop/views/shop-list.html',
        controller: 'ShopListCtrl'
      }
    }
  })
  .state('app.shop', {
    url: '/shops/:shopId',
    views: {
      'menuContent': {
        templateUrl: 'app/shop/views/shop-detail.html',
        controller: 'ShopDetailCtrl'
      }
    }
  })
  .state('app.favorites', {
    url: '/shops/favorites',
    views: {
      'menuContent': {
        templateUrl: 'app/shop/views/shop-favorite-list.html',
        controller: 'ShopFavoriteListCtrl'
      }
    }
  })
  .state('app.reviews', {
    url: '/shops/:shopId/reviews',
    views: {
      'menuContent': {
        templateUrl: 'app/shop/views/review-list.html',
        controller: 'ShopReviewListCtrl'
      }
    }
  })
  .state('app.splash', {
    url: '/splash',
    views: {
      'menuContent': {
        templateUrl: 'app/layout/views/splash.html'
      }
    }
  })

  //--------------------
  // Authentication
  //--------------------
  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'app/auth/views/login.html'
      }
    }
  })
  .state('app.register', {
    url: '/register',
    templateUrl: 'app/auth/views/register.html'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/shops');
});
