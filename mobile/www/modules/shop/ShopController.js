angular.module('appbase.shop')

.controller('ShopListCtrl', function($scope, $timeout) {
  
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 }
  ];
  
  var count = 100; //TO REMOVE
  
  $scope.moreDataCanBeLoaded = function(){
    if($scope.playlists.length < count)
        return true;
    return false; 
  };
  
  $scope.$on('$stateChangeSuccess', function() {
    $scope.loadMore();
  });
  
  $scope.loadMore = function() {
      
    $timeout(function() {
        
        $scope.playlists.push({ title: 'REST', id: 10 });
        $scope.playlists.push({ title: 'API', id: 20 });
        $scope.playlists.push({ title: 'Node', id: 30 });
        $scope.playlists.push({ title: 'Indie', id: 40 });
        $scope.playlists.push({ title: 'Java', id: 50 });
        $scope.playlists.push({ title: 'PHP', id: 60 });
        
        $scope.$broadcast('scroll.infiniteScrollComplete');
    }, 1000);
  };
});
