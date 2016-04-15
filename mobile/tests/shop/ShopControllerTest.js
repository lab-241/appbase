/**
 * ShopListController Test
 *
 */
describe('ShopListController', function () {

    var $rootScope, $scope, $position, dishService, findByPositionThen;

    beforeEach(function () {
        module('appbase');

        shopService = {
          findByPosition: function () {
              return {'then': findByPositionThen};
          }
        };
        spyOn(shopService, 'findByPosition').and.callThrough();

        inject(function (_$rootScope_, $controller, _$position_) {

          $rootScope = _$rootScope_;
          $scope = $rootScope.$new();

          $position = _$position_;
          spyOn($position, 'getPosition').and.callThrough();

          $controller('ShopListController', {
            '$scope': $scope,
            'ShopService': shopService
          });
        });
    });

    describe('init', function () {

      it('should have a shop list with some elements', function () {

        var shop = {'name': 'Beauty Shop'};

        findByPositionThen = function (success) {
          success([shop]);
        };

        $rootScope.$apply();

        expect($scope.dishList).toBeDefined();
        expect($scope.dishList.length).toBeGreaterThan(0);
        expect(shopService.findByPosition).toHaveBeenCalled();
        expect($position.getPosition).toHaveBeenCalled();
      });
    });
});
