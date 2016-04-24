/**
 * Unit-tests : ShopListController
 */
describe('ShopListController', function () {

    var shopServiceMock, deferredFind, controller, $scope, $rootScope;

    // Load the module for our app
    beforeEach(module('appbase.shop'));

    // Instantiate the controller and mocks for every test
    beforeEach(inject(function($controller, _$rootScope_, $q) {

      deferredFind = $q.defer();

      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();

      // Mock ShopService
      shopServiceMock = {
          find: jasmine.createSpy('find spy')
                .and.returnValue(deferredFind.promise)
      };

      // Instantiate ShopListController
      controller = $controller('ShopListCtrl', {
        '$scope' : $scope,
        'ShopService': shopServiceMock
      });
    }));

    describe('#load_shops', function () {

      // Call loadMore on the controller for every test
      beforeEach(function() {
        $scope.loadMore();
      });

      it('should call find on ShopService', function() {
        expect(shopServiceMock.find).toHaveBeenCalledWith(0);
      });

      describe('when the find is executed,', function() {
        it('if success : should init the shop list', function (){

          deferredFind.resolve([
            {name:'test 1'},
            {name:'test 2'}
          ]);
		      $rootScope.$digest();
          expect($scope.shops.length).toBe(2);
        });

        it('if failure : should display error message');
      });

    });
});
