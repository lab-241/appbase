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

    deferredFindShop = $q.defer();
    deferredReviews  = $q.defer();
    deferredAddFav   = $q.defer();
    deferredRemFav   = $q.defer();
    deferredShowpop  = $q.defer();

    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();

    // Mock ShopService
    shopServiceMock = {
      findById: jasmine.createSpy('findById-spy')
        .and.returnValue(deferredFindShop.promise),
      findReviews: jasmine.createSpy('findReviews-spy')
        .and.returnValue(deferredReviews.promise),
      addFavorite: jasmine.createSpy('addFavorite-spy')
        .and.returnValue(deferredAddFav.promise),
      removeFavorite: jasmine.createSpy('rmFavorite-spy')
        .and.returnValue(deferredRemFav.promise),
      isFavorite: jasmine.createSpy('isFavorite-spy')
    };

    // Mock ShopService
    authServiceMock = {
      hasSession: jasmine.createSpy('hasSession-spy'),
      currentUserId: jasmine.createSpy('currentUserId-spy')
            .and.returnValue('123546')
    };

    // Mock $ionicPopup
    ionicPopupMock = {
      show: jasmine.createSpy('showPopup-spy').and.returnValue(deferredShowpop.promise)
    };

    // Mock MessageService
    msgServiceMock = {
      get: jasmine.createSpy('getMessage-spy')
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
    var shopId = 132;

    // Call loadMore on the controller for every test
    beforeEach(function() {
      shopServiceMock.findById(shopId);
      shopServiceMock.isFavorite(shopId);
    });

    it('should call findById on ShopService', function() {
      expect(shopServiceMock.findById).toHaveBeenCalledWith(shopId);
    });

    it('should call isFavorite on ShopService to get shop status ', function(){
      expect(shopServiceMock.isFavorite).toHaveBeenCalledWith(shopId);
    });

    describe('when the findBy is executed,', function() {
      it('if success : should init the shop into scope', function (){
        deferredFindShop.resolve({name:'test 1'});
	      $rootScope.$digest();
        expect($scope.shop.name).toBe('test 1');
      });

      it('should call findReviews on ShopService', function() {
        deferredFindShop.resolve([]);
	      $rootScope.$digest();
        expect(shopServiceMock.findReviews).toHaveBeenCalled();
      });

      describe('when the findReviews is executed,', function() {
        it('if success : should set reviews on scope', function (){
          deferredFindShop.resolve();
          deferredReviews.resolve([{name:'review 1'}, {name:'review 1'}]);
		      $rootScope.$digest();
          expect($scope.reviews.length).toBe(2);
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

    // Call findById on the controller for every test
    beforeEach(function() {
      deferredFindShop.resolve({name:'test 1'});
      $rootScope.$digest();
    });

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
        deferredAddFav.resolve();
        $rootScope.$digest();
        expect(msgServiceMock.get).toHaveBeenCalledWith('SHOP_FAVORITE_ADDED');
        expect(loaderServiceMock.toast).toHaveBeenCalled();
      });

      it('if failure : should toast ERROR_OCCURS_OP message', function() {
        deferredAddFav.reject();
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

    // Call findById on the controller for every test
    beforeEach(function() {
      deferredFindShop.resolve({name:'test 1'});
      $rootScope.$digest();
    });

    it('should check if user is authenticated', function() {
      $scope.removeFavorite();
      expect(authServiceMock.hasSession).toHaveBeenCalled();
    });

    describe('when user is authenticated,', function() {
      beforeEach(function() {
        authServiceMock.hasSession.and.returnValue(true);
        $scope.removeFavorite();
      });

      it('if success : should toast SHOP_FAVORITE_REMOVED message', function() {
        deferredRemFav.resolve();
        $rootScope.$digest();
        expect(msgServiceMock.get).toHaveBeenCalledWith('SHOP_FAVORITE_REMOVED');
        expect(loaderServiceMock.toast).toHaveBeenCalled();
      });

      it('if failure : should toast ERROR_OCCURS_OP message', function() {
        deferredRemFav.reject();
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
