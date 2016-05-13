/**
 * Unit-tests : ShopService
 *
 *
 */
describe('ShopService', function () {

  var shopService, $rootScope, mockShop, mockUser, deferred;
  // Load the module for our app
  beforeEach(module('appbase.shop'));

  beforeEach(function() {

    //-- Create dependencies mocks
    module(function($provide) {
    	//-- Mock Shop lb-service
    	mockShop = {
  			find: jasmine.createSpy('Shop.find-spy'),
        findOne: jasmine.createSpy('Shop.findOne-spy')
  		};
  		$provide.value('Shop', mockShop);

  		//-- Mock User service implementation
      mockUser = {
        //favoriteshops: jasmine.createSpyObj('User.favoriteshops-spy', ['link'])//,
        favoriteshops : jasmine.createSpy('User.favoriteshops-spy')
      };
  		$provide.value('User', mockUser);

      $provide.value('$ionicPopup', {
        favoriteshops: jasmine.createSpy('$ionicPopup-spy')
      });

      $provide.value('$filter', {
        translate: jasmine.createSpy('$filter-spy')
      });

      $provide.value('Review', {
        find: jasmine.createSpy('Review-spy')
      });

      $provide.value('LocalStorage', {
        find: jasmine.createSpy('LocalStorage-spy')
      });

      $provide.value('MessageService', {
        find: jasmine.createSpy('MessageService-spy')
      });
    });

    inject(function($injector, $q) {
      deferred = $q.defer();
      shopService = $injector.get('ShopService');
    })

  });

  //
  // $filter, $ionicPopup, Shop, Review, User, LocalStorage, MessageService
  //
  //
	/**
   * ********************************
   * TEST : shop service instance
   * ********************************
   */
  describe('#service_instance', function () {
    it('should have ShopService service be defined', function () {
      expect(shopService).toBeDefined();
    });
  });

  /**
   * ********************************
   * TEST : find shops
   * ********************************
   */
  describe('#find_shops', function () {

    it('should call find on Loopback "Shop" service', function () {
      mockShop.find.and.returnValue(deferred.promise);
      shopService.find(1);
      expect(mockShop.find).toHaveBeenCalledWith(jasmine.any(Object));
    });
  });

  describe('#find_shop_by_id', function () {

    it('should call findOne on Loopback "Shop" service', function () {
      mockShop.findOne.and.returnValue(deferred.promise);
      var shopId = "01abc-id";
      shopService.findById(shopId);
      expect(mockShop.findOne).toHaveBeenCalled();
      expect(mockShop.findOne.calls.mostRecent().args[0].filter.where.id).toEqual(shopId);
    });
  });

  describe('#find_shop_by_id', function () {
    it('should call findOne on Loopback "Shop" service', function () {
      mockShop.findOne.and.returnValue(deferred.promise);
      var shopId = "shop-001";
      shopService.findById(shopId);
      expect(mockShop.findOne).toHaveBeenCalled();
      expect(mockShop.findOne.calls.mostRecent().args[0].filter.where.id).toEqual(shopId);
    });
  });

  describe('#find_favorites', function () {
    it('should call favoriteshops on Loopback "User" service', function () {
      mockUser.favoriteshops.and.returnValue(deferred.promise);
      var userId = "user-001";
      shopService.findFavorites(userId);
      expect(mockUser.favoriteshops).toHaveBeenCalled();
      expect(mockUser.favoriteshops.calls.mostRecent().args[0].id).toEqual(userId);
    });
  });

  describe('#is_favorite', function () {
    xit('should call favoriteshops.link on Loopback "User" service', function () {
      var shopId = "shop-001";
    });
  });

});
