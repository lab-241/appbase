angular
.module('appbase.shop')
.controller('ShopReviewListCtrl',
  function($scope, $stateParams, $ionicPopup, $filter, ShopService, AuthService,
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
    };


    /**
     * Review details popup
     * @param review : clicked review item
     */
    $scope.showReview = function(review){
      $scope.review = review;
      var icon = '<i class="icon ion-chatbubble-working chat"></i> ';
      $ionicPopup.show({
        templateUrl: 'app/shop/views/review-popup.html',
        title: icon + review.reviewer.username,
        subTitle: $filter('date')(review.date, 'dd-MM-yyyy hh:mm:ss'),
        scope: $scope,
        buttons: [
          { text: 'Close', type: 'button-calm'},
        ]
      });
    };
});
