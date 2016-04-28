angular
.module('appbase.shop')
.directive('buttonFavorite', function() {
  return {
    scope: true,
    restrict: 'E',
    template: '<button class="btn btn-icon"><span class="glyphicon glyphicon-heart" ng-class="{active: item.favorite}"></span></button>',
    link: function(scope, elem) {
      elem.bind('click', function() {
        scope.$apply(function(){
          scope.item.favorite = !scope.item.favorite;
        });
      });
    }
  };
});