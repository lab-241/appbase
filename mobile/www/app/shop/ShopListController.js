angular
.module('appbase.shop')
.controller('ShopListCtrl', function($scope, ShopService) {

  $scope.page     = 0;
  $scope.shops    = [];
  $scope.hasMore  = true;

  /**
   * Infinite scroll shops loader
   */
  $scope.loadMore = function (){
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
});
