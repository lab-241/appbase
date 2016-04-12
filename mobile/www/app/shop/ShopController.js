angular.module('appbase.shop')

.controller('ShopListCtrl', function($scope, ShopService) {
  
  $scope.shops    = [];
  $scope.page     = 0;
  $scope.hasMore  = true;
  
  /**
   * Infinite scroll shops loader
   */
  $scope.loadMore = function () {
    ShopService
    .find($scope.page)
    .then(function(items){
      $scope.shops = $scope.shops.concat(items);
      $scope.hasMore = items.length !== 0;
      $scope.page++;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }, function(err){
      console.log(err);
    });
  };
})

.controller('ShopItemCtrl', function($scope, $stateParams, ShopService) {
  
  /**
   * Get one shop by id param
   */
  ShopService
    .findById($stateParams.shopId)
    .then(function (item){
      $scope.shop = item;
    }, function(err){
      console.log(err);
    });
    
});
