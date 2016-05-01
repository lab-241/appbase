var app = angular.module('appbase-admin');

app.directive('starRating', function () {
  return {
    restrict: 'E',
    scope: {
    	stars: '@'
    },
    link: function(scope, elm, attrs, ctrl) {
    	scope.starsArray = Array.apply(null, {
        length: parseInt(scope.stars)
      }).map(Number.call, Number);
    },
    template:
      `<i ng-repeat="star in starsArray" class="glyphicon glyphicon-star"></i>`
  };
});

app.directive('dashboardSummary', ['Restangular', function(Restangular){
  return {
    restrict: 'E',
    scope: {},
    controller: function($scope) {
        $scope.stats = {};
        Restangular
          .all('cities')
          .getList({sort: '["date","DESC"]'})
          .then(cities => {
            $scope.stats.cities = cities.data;
          });
        Restangular
          .all('shops')
          .getList({range: '[1,100]', sort: '["first_seen","DESC"]'})
          .then(shops => {
              $scope.stats.shops = shops.data;
          });
        Restangular
          .all('reviews')
          .getList({range: '[1,100]', sort: '["date","DESC"]'})
          .then(reviews => {
              $scope.stats.reviews = reviews.data;
          });
    },
    templateUrl: 'tpl/dashboard-summary.html'
  };
}]);
