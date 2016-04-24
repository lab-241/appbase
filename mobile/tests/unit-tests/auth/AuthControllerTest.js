/**
 * Unit-tests : AuthController
 */
describe('AuthController', function () {

    var authServiceMock, deferredFind, controller,
    $scope, $rootScope;

    // Load the module for our app
    beforeEach(module('appbase.auth'));

    // Instantiate the controller and mocks for every test
    beforeEach(inject(function($controller, _$rootScope_, $q) {

      deferredLogin = $q.defer();

      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();

      // Mock rootScope _loading() function
      $scope._loading = function(){};

      // Mock ShopService
      authServiceMock = {
          login: jasmine.createSpy('login spy')
                .and.returnValue(deferredLogin.promise)
      };

      // Mock MessageService
      mssgServiceMock = {
          get: function(){}
      };

      // Mock $ionicPopup
      ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

      // Instantiate ShopListController
      controller = $controller('AuthCtrl', {
        '$scope' : $scope,
        'debug' : true,
        '$ionicPopup': ionicPopupMock,
        'AuthService': authServiceMock,
        'MessageService': mssgServiceMock
      });

    }));

    describe('#doLogin', function () {

      // Call loadMore on the controller for every test
      beforeEach(function() {
        $scope.credentials = {
          email : 'test@appbase.ga',
          password : 's3cr3t'
        };
        $scope.doLogin();
      });

      it('should call login on AuthService', function() {
        expect(authServiceMock.login)
          .toHaveBeenCalledWith('test@appbase.ga', 's3cr3t');
      });

      describe('when the login is executed,', function() {

  			it('if failure, should show a popup', function() {

  				deferredLogin.reject();
  				$rootScope.$digest();
  				expect(ionicPopupMock.alert).toHaveBeenCalled();
  			});
      });

    });

    // describe('#doRegister', function () {
    //
    //   // Call loadMore on the controller for every test
    //   beforeEach(function() {
    //     $scope.credentials = {
    //       email : 'test@appbase.ga',
    //       password : 's3cr3t',
    //       username : 'testman'
    //     };
    //     $scope.doLogin();
    //   });
    //
    //   it('should call register on AuthService', function() {
    //     expect(authServiceMock.register)
    //       .toHaveBeenCalledWith('test@appbase.ga', 's3cr3t', 'testman');
    //   });
    //
    //   describe('when the register is executed,', function() {
    //     it('if success ...');
    //     it('if failure ...');
    //   });
    // });
});
