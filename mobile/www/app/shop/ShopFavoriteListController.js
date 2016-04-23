angular
.module('appbase.shop')
.controller('ShopFavoriteListCtrl',
  function($scope, $stateParams, LoaderService, MessageService,
    ShopService, AuthService){

  $scope.page     = 0;
  $scope.hasMore  = true;
  $scope.shops    = [];

  $scope.$on('$ionicView.enter', function(e) {
    //-- Reload data
    if($scope.shops.length > 0){
      $scope.page    = 0;
      $scope.shops   = [];
      $scope.loadMore();
    }
  });

  /**
   * Load current shop reviews
   */
   $scope.loadMore = function (){
     var userId = AuthService.getSession().user.id;
     ShopService
      .findFavorites(userId, $scope.page)
      .then(function(items){
        $scope.shops = $scope.shops.concat(items);
        $scope.hasMore = items.length !== 0;
        $scope.page++;
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }, function(err){
        console.debug(err);
        //TODO: Manage Error
      });
    };

    $scope.removeFavorite = function(shop){
      var userId = AuthService.getSession().user.id;
      ShopService.removeFavorite(userId, shop.id)
      .then(function(res){
        LoaderService.toast(MessageService.get('SHOP_FAVORITE_REMOVED'));

        //-- update list
        var index = $scope.shops.indexOf(shop);
        $scope.shops.splice(index, 1);
      },function(res){
        console.debug(res);
        //TODO: Manage Error
      });
    };
});
