/**
 * Unit-tests : ShopDetailController
 */
describe('ShopDetailController', function () {

  var shopServiceMock, deferred, controller, $scope, $rootScope,
      authServiceMock, ionicPopupMock, loaderServiceMock;

  function when_no_auth_taost_msg_test(trigger){
    beforeEach(function() {
      authServiceMock.hasSession.and.returnValue(false);
      trigger();
    });

    it('should toast AUTH_REQUIRED message', function() {
      expect(msgServiceMock.get).toHaveBeenCalledWith('AUTH_REQUIRED');
      expect(loaderServiceMock.toast).toHaveBeenCalled();
    });
  }

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
        .and.returnValue(deferred.promise),
      findReviews: jasmine.createSpy('findReviews-spy')
        .and.returnValue(deferred.promise),
      addFavorite: jasmine.createSpy('addFavorite-spy')
        .and.returnValue(deferred.promise)
    };

    // Mock ShopService
    authServiceMock = {
      hasSession: jasmine.createSpy('hasSession-spy'),
      getSession: jasmine.createSpy('getSession-spy')
            .and.returnValue({user: {id: 123546}})
    };

    // Mock $ionicPopup
    ionicPopupMock = {
      show: jasmine.createSpy('showPopup-spy').and.returnValue(deferred.promise)
    };

    // Mock MessageService
    msgServiceMock = {
      get: jasmine.createSpy('getMessage-spy').and.returnValue(deferred.promise)
    };

    // Mock LoaderService
    loaderServiceMock = jasmine.createSpyObj('LoaderService-spy', ['toast'])

    // Instantiate contoller
    controller = $controller('ShopDetailCtrl', {
      '$scope' : $scope,
      'ShopService': shopServiceMock,
      'AuthService' : authServiceMock,
      '$stateParams' : jasmine.createSpy('$stateParams-spy').and.returnValue({shopId: 1}),
      '$ionicPopup': ionicPopupMock,
      '$filter' : jasmine.createSpy('$filter-spy'),
      'LoaderService' : loaderServiceMock,
      'MessageService' : msgServiceMock
    });
  }));

  /**
   * ********************************
   * TEST : load shop details
   * ********************************
   */
  describe('#load_shop_details', function () {

    // Call loadMore on the controller for every test
    beforeEach(function() {
      shopServiceMock.findById(1);
    });

    it('should call findById on ShopService', function() {
      expect(shopServiceMock.findById).toHaveBeenCalledWith(1);
    });

    describe('when the findBy is executed,', function() {
      it('if success : should init the shop into scope', function (){
        deferred.resolve({name:'test 1'});
	      $rootScope.$digest();
        expect($scope.shop).toEqual(jasmine.any(Object));
        expect($scope.shop.name).toBe('test 1');
      });

      it('should call findReviews on ShopService', function() {
        deferred.resolve();
	      $rootScope.$digest();
        expect(shopServiceMock.findReviews).toHaveBeenCalled();
      });

      describe('when the findReviews is executed,', function() {
        it('if success : should init the reviews into scope', function (){
          deferred.resolve([{name:'review 1'}, {name:'review 1'}]);
		      $rootScope.$digest();
          expect($scope.shop.length).toBe(2);
        });
      });

      it('if failure : should display toast error message + navigate to safe location');
    });

  });

  /**
   * ********************************
   * TEST : Add shop review
   * ********************************
   */
  describe('#add_shop_review', function () {

    it('should check if user is authenticated', function() {
      $scope.addReview();
      expect(authServiceMock.hasSession).toHaveBeenCalled();
    });

    describe('when user is authenticated,', function() {
      beforeEach(function() {
        authServiceMock.hasSession.and.returnValue(true);
        $scope.addReview();
      });

      it('should open review popup', function() {
        expect(ionicPopupMock.show).toHaveBeenCalled();
      });
    });

    describe('when user is NOT authenticated,', function() {
      when_no_auth_taost_msg_test(function(){$scope.addReview()});
    });
  });

  /**
   * ********************************
   * TEST : Add shop to favorites
   * ********************************
   */
  describe('#add_shop_favorite', function () {

    it('should check if user is authenticated', function() {
      $scope.addFavorite();
      expect(authServiceMock.hasSession).toHaveBeenCalled();
    });

    describe('when user is authenticated,', function() {
      beforeEach(function() {
        authServiceMock.hasSession.and.returnValue(true);
        $scope.addFavorite();
      });

      it('if success : should toast SHOP_FAVORITE_ADDED message', function() {
        deferred.resolve();
        $rootScope.$digest();
        expect(msgServiceMock.get).toHaveBeenCalledWith('SHOP_FAVORITE_ADDED');
        expect(loaderServiceMock.toast).toHaveBeenCalled();
      });

      it('if failure : should toast ERROR_OCCURS_OP message', function() {
        deferred.reject();
        $rootScope.$digest();
        expect(msgServiceMock.get).toHaveBeenCalledWith('ERROR_OCCURS_OP');
        expect(loaderServiceMock.toast).toHaveBeenCalled();
      });
    });

    describe('when user is NOT authenticated,', function() {
      when_no_auth_taost_msg_test(function(){$scope.addFavorite()});
    });

  });

  /**
   * ********************************
   * TEST : Remove a favorite shop
   * ********************************
   */
  describe('#remove_shop_favorite', function () {

    it('should check if user is authenticated', function() {
      $scope.addFavorite();
      expect(authServiceMock.hasSession).toHaveBeenCalled();
    });

    describe('when user is authenticated,', function() {
      beforeEach(function() {
        authServiceMock.hasSession.and.returnValue(true);
        $scope.addFavorite();
      });

      it('if success : should toast SHOP_FAVORITE_ADDED message', function() {
        deferred.resolve();
        $rootScope.$digest();
        expect(msgServiceMock.get).toHaveBeenCalledWith('SHOP_FAVORITE_ADDED');
        expect(loaderServiceMock.toast).toHaveBeenCalled();
      });

      it('if failure : should toast ERROR_OCCURS_OP message', function() {
        deferred.reject();
        $rootScope.$digest();
        expect(msgServiceMock.get).toHaveBeenCalledWith('ERROR_OCCURS_OP');
        expect(loaderServiceMock.toast).toHaveBeenCalled();
      });
    });

    describe('when user is NOT authenticated,', function() {
      when_no_auth_taost_msg_test(function(){$scope.removeFavorite()});
    });

  });
});
