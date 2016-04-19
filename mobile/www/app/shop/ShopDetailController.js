angular
.module('appbase.shop')
.controller('ShopDetailCtrl',
  function($scope, $stateParams, $ionicPopup, $filter,
    ShopService, AuthService, LoaderService, MessageService){

  //-- Current shop Id (from navigation)
  $scope.shopId = $stateParams.shopId;
  $scope.reviews = [];
  $scope.nbLastReviews = 3;

  /**
   * Get one shop by id param
   */
  ShopService
    .findById($scope.shopId)
    .then(function (item){
      $scope.shop = item;
      getReviews();
    }, function(err){
      console.debug(err);
      //TODO: Manage Error
    });

  /**
   * Update current shop reviews
   */
  function getReviews(){
    // Get last three reviews of current shop
    ShopService
      .findReviews($scope.shopId, $scope.nbLastReviews)
      .then(function(reviews){
        $scope.reviews = reviews;
      }, function(err){
        console.debug(err);
        //TODO: Manage Error
      });
  }

  /**
   * Review details popup
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

  /**
   * Add new review popup
   */
  $scope.addReview = function(){
    if(!AuthService.hasSession()){
      LoaderService.toast(MessageService.get('AUTH_REUQUIRED'));
      return;
    }

    $scope.review = {
      rating : 0,
      comments : ''
    };

    //-- The review popup
    var reviewPopup = $ionicPopup.show({
      templateUrl: 'app/shop/views/review-form.html',
      title: 'Enter youy review',
      subTitle: 'Please remain respectful',
      scope: $scope,
      buttons: [
        {
          text: 'Cancel',
          type: 'button-assertive'
        },
        {
          text: '<b>Save</b>',
          type: 'button-balanced',
          onTap: function(e) {
            if (!$scope.review.rating) {
              LoaderService.toast(MessageService.get('REVIEW_REUQUIRED'));
              e.preventDefault();
            } else {
              return $scope.review;
            }
          }
        }
      ]
    });

    reviewPopup.then(function(res) {
      console.log('Tapped!', res);
      if(res){
        ShopService
        .addReview($scope.review.rating, $scope.review.comments, $scope.shopId)
        .then(function() {
          getReviews()
          reviewPopup.close();
          LoaderService.toast(MessageService.get('REVIEW_ADDED_SUCCESSFULLY'));
        }, function(err) {
          console.debug(err);
        });
      }
    });
  };

  //--- End of ShopDetailCtrl ---
});
