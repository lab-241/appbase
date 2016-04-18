angular
.module('appbase.shop')
.controller('ShopReviewListCtrl',
  function($scope, $stateParams, $ionicPopup, ShopService, AuthService,
  LoaderService, MessageService){

  //-- Current shop Id (from navigation)
  $scope.shopId = $stateParams.shopId;

  $scope.page     = 0;
  $scope.hasMore  = true;
  $scope.reviews  = [];

  /**
   * Load current shop reviews
   */
   $scope.loadMore = function (){
    ShopService
      .findReviews($scope.shopId, $scope.limit, $scope.page)
      .then(function(items){
        $scope.reviews = $scope.reviews.concat(items);
        $scope.hasMore = items.length !== 0;
        $scope.page++;
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }, function(err){
        console.debug(err);
        //TODO: Manage Error
      });
  }
});
