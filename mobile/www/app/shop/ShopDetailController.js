angular
.module('appbase.shop')
.controller('ShopDetailCtrl',
  function($scope, $stateParams, $ionicPopup, ShopService, AuthService,
  LoaderService, MessageService){

  //-- Current shop Id (from navigation)
  $scope.shopId = $stateParams.shopId;

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
    ShopService
      .findReviews($scope.shopId, 3)
      .then(function(reviews){
        $scope.reviews = reviews;
        console.log(reviews);
      }, function(err){
        console.debug(err);
        //TODO: Manage Error
      });
  }

  $scope.reviewShop = function(){

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
