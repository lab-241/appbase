angular
.module('appbase.shop')
.controller('ShopDetailCtrl',
  function($scope, $stateParams, $ionicPopup, ShopService) {

  //-- Current shop Id (from navigation)
  $scope.shopId = $stateParams.shopId;

  /**
   * Get one shop by id param
   */
  ShopService
    .findById($scope.shopId)
    .then(function (item){
      $scope.shop = item;
    }, function(err){
      console.log(err);
    });

  $scope.reviewShop = function(){
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
              //don't allow the user to close unless he enters review
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
        .review($scope.review.rating, $scope.review.comments, $scope.shopId)
        .then(function() {
          reviewPopup.close();
          //TODO: Display toast message
        }, function(err) {
          console.log(err);
        });
      }
    });
  };

  //--- End of ShopDetailCtrl ---
});
