/**
 * Unit-tests : LoginController
 */
describe('LoginController', function () {

    var authServiceMock, deferred, controller,
    $scope, $rootScope, mssgServiceMock, loaderServiceMock;

    // Load the module for our app
    beforeEach(module('appbase.auth'));

    // Instantiate the controller and mocks for every test
    beforeEach(inject(function($controller, _$rootScope_, $q) {

      deferred = $q.defer();

      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();

      // Mock rootScope functions
      $scope._loading = function(){};
      $scope.closeLogin = function(){};
      $scope.closeRegister = function(){};

      // Mock ShopService
      authServiceMock = {
          login: jasmine.createSpy('login-spy').and
                    .returnValue(deferred.promise),
      };

      // Mock LoaderService
      loaderServiceMock = jasmine.createSpyObj('LoaderService', ['toast']);

      // Mock MessageService
      mssgServiceMock = jasmine.createSpyObj('MessageService', ['get']);

      // Mock $ionicPopup
      ionicPopupMock = jasmine.createSpyObj('$ionicPopup', ['alert']);

      // Instantiate ShopListController
      controller = $controller('LoginCtrl', {
        '$scope' : $scope,
        'debug' : true,
        '$ionicPopup': ionicPopupMock,
        'AuthService': authServiceMock,
        'MessageService': mssgServiceMock,
        'LoaderService' : loaderServiceMock
      });

    }));

    describe('#doLogin', function () {

      // Call doLogin on the controller for every test
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

        it('if success, should toast a mssg', function() {
          deferred.resolve();
          $rootScope.$digest();
          expect(mssgServiceMock.get).toHaveBeenCalled();
          expect(loaderServiceMock.toast).toHaveBeenCalled();
        });

  			it('if failure, should show a popup', function() {
          deferred.reject();
  				$rootScope.$digest();
  				expect(ionicPopupMock.alert).toHaveBeenCalled();
  			});
      });
    });
});
