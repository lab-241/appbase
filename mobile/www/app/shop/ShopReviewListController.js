angular
.module('appbase.shop')
.controller('ShopReviewListCtrl',
  function($scope, $stateParams, ShopService, AuthService,
  LoaderService, MessageService){

  //-- Current shop Id and name (from navigation)
  $scope.shopId = $stateParams.shopId;

  $scope.page     = 0;
  $scope.hasMore  = true;
  $scope.reviews  = [];

  /**
   * Load current shop reviews
   */
   $scope.loadMore = function (){
    ShopService
      .findReviews($scope.shopId, $scope.page)
      .then(function(items){
        $scope.reviews = $scope.reviews.concat(items);
        $scope.hasMore = items.length !== 0;
        if($scope.hasMore){
          $scope.shop = $scope.reviews[0].shop;
        }
        $scope.page++;
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }, function(err){
        console.debug(err);
        //TODO: Manage Error
      });
    };

    /**
     * Review details popup
     * @param review : clicked review item
     */
    $scope.showReview = function(review){
      $scope.review = review;
      ShopService.showReviewPopup($scope);
    };
});
