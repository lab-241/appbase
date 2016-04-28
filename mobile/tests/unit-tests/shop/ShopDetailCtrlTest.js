/**
 * Unit-tests : ShopDetailController
 */
describe('ShopDetailController', function () {

    var shopServiceMock, deferred, controller, $scope, $rootScope,
    authServiceMock;

    // Load the module for our app
    beforeEach(module('appbase.shop'));

    // Instantiate the controller and mocks for every test
    beforeEach(inject(function($controller, _$rootScope_, $q) {

      deferred = $q.defer();
  
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
  
      // Mock ShopService
      shopServiceMock = {
        findById: jasmine.createSpy('findById-spy')
              .and.returnValue(deferred.promise)
      };
      
      // Mock ShopService
      authServiceMock = {
        hasSession: jasmine.createSpy('hasSession-spy')
              .and.returnValue(true),
        getSession: jasmine.createSpy('getSession-spy')
              .and.returnValue({user: {id: 123546}})
      };

      // Instantiate contoller
      controller = $controller('ShopDetailController', {
        '$scope' : $scope,
        'ShopService': shopServiceMock,
        'AuthService' : authServiceMock,
        '$stateParams' : jasmine.createSpy('$stateParams-spy').and.returnValue({shopId: 1}),
        '$ionicPopup': jasmine.createSpy('$ionicPopup-spy'),
        '$filter' : jasmine.createSpy('$filter-spy'),
        'LoaderService' : jasmine.createSpy('LoaderService-spy'),
        'MessageService' : jasmine.createSpy('MessageService-spy')
      });
    }));

    describe('#load_shops', function () {

      // Call loadMore on the controller for every test
      beforeEach(function() {
        shopServiceMock.findById(1);
      });

      it('should call find on ShopService', function() {
        expect(shopServiceMock.findById).toHaveBeenCalledWith(1);
      });

      describe('when the findBy is executed,', function() {
        it('if success : should init the shop list', function (){

          deferred.resolve({name:'test 1'});
		      $rootScope.$digest();
          expect($scope.shops.length).toBe(2);
        });

        it('if failure : should display error message');
      });

    });
});