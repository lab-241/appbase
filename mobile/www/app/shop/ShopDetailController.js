angular
.module('appbase.shop')
.controller('ShopDetailCtrl',
  function($scope, $stateParams, $ionicPopup, $filter,
    ShopService, AuthService, LoaderService, MessageService){

  //-- Current shop Id (from navigation)
  $scope.shopId = $stateParams.shopId;
  $scope.reviews = [];
  $scope.nbLastReviews = 3;
  $scope.isFavorite = ShopService.isFavorite($scope.shopId);

  /**
   * Get one shop by id param
   */
  ShopService
    .findById($scope.shopId)
    .then(function (item){
      $scope.shop = item;
      getReviews();
    }, function(err){
      //console.debug(err);
      //TODO: Manage Error
      LoaderService.toast(MessageService.get('ERROR_OCCURS_OP'));
    });

  /**
   * Update current shop reviews
   */
  function getReviews(){
    // Get last three reviews of current shop
    var page = 0;
    ShopService
      .findReviews($scope.shopId, page, $scope.nbLastReviews)
      .then(function(reviews){
        $scope.reviews = reviews;
        if($scope.reviews.length !== 0){
          $scope.shop = $scope.reviews[0].shop;
        }
      }, function(err){
        //console.debug(err);
        //TODO: Manage Error
      });
  }

  /**
   * Review details popup
   */
  $scope.showReview = function(review){
    $scope.review = review;
    ShopService.showReviewPopup($scope);
  };

  /**
   * Add new review popup
   */
  $scope.addReview = function(){
    if(!AuthService.hasSession()){
      LoaderService.toast(MessageService.get('AUTH_REQUIRED'));
      return;
    }

    $scope.review = {
      rating : 0,
      comments : ''
    };

    //-- The review popup
    var reviewPopup = $ionicPopup.show({
      templateUrl: 'app/shop/views/review-form.html',
      title: MessageService.get('ENTER_REVIEW'),
      subTitle: MessageService.get('REMAIN_RESPECTFUL'),
      scope: $scope,
      buttons: [
        {
          text: MessageService.get('CANCEL'),
          type: 'button-assertive'
        },
        {
          text: '<b>'+MessageService.get('SAVE')+'</b>',
          type: 'button-balanced',
          onTap: function(e) {
            if (!$scope.review.rating) {
              LoaderService.toast(MessageService.get('RATING_REQUIRED'));
              e.preventDefault();
            } else {
              return $scope.review;
            }
          }
        }
      ]
    });

    reviewPopup.then(function(res) {
      if(res){
        $scope._loading(true);
        ShopService
        .addReview($scope.review.rating, $scope.review.comments, $scope.shopId)
        .then(function() {
          reviewPopup.close();
          LoaderService.toast(MessageService.get('REVIEW_ADDED_SUCCESSFULLY'));
          getReviews();
        }, function(err) {
          //TODO: Manage Error
          //console.debug(err);
          LoaderService.toast(MessageService.get('ERROR_OCCURS_OP'));
        }).finally(function(){
          $scope._loading(false);
        });
      }
    });
  };

  $scope.toggleFavorite = function(){
    if(!$scope.isFavorite)
      $scope.addFavorite();
    else
      $scope.removeFavorite();
  };

  /**
   * Add shop to user favorites
   */
  $scope.addFavorite = function(){
    if(!AuthService.hasSession()){
      LoaderService.toast(MessageService.get('AUTH_REQUIRED'));
      return;
    }
    var userId = AuthService.currentUserId();
    ShopService.addFavorite(userId , $stateParams.shopId).then(function(data){
      LoaderService.toast(MessageService.get('SHOP_FAVORITE_ADDED'));
      $scope.isFavorite = true;
      $scope.shop.nbLikes++;
    }, function(err) {
      LoaderService.toast(MessageService.get('ERROR_OCCURS_OP'));
      //console.debug(err);
    });
  };

  /**
   * Remove shop from user favorites
   */
  $scope.removeFavorite = function(){
    if(!AuthService.hasSession()){
      LoaderService.toast(MessageService.get('AUTH_REQUIRED'));
      return;
    }
    var userId = AuthService.currentUserId();
    ShopService.removeFavorite(userId , $stateParams.shopId).then(function(){
      LoaderService.toast(MessageService.get('SHOP_FAVORITE_REMOVED'));
      $scope.isFavorite = false;
      $scope.shop.nbLikes--;
    }, function(err) {
      LoaderService.toast(MessageService.get('ERROR_OCCURS_OP'));
      //console.debug(err);
    });
  };

  //--- End of ShopDetailCtrl ---
});
