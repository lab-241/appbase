/**
 * Unit-tests : ShopReviewListController
 */
describe('ShopReviewListController', function () {

    var shopServiceMock, deferredFindReviews, controller, $scope, $rootScope;
    var shopIdValue =1;
    var testReview = {comments:'Pleasant', shop : {name : 'Shop 1'}};

    // Load the module for our app
    beforeEach(module('appbase.shop'));

    // Instantiate the controller and mocks for every test
    beforeEach(inject(function($controller, _$rootScope_, $q) {

      deferredFindReviews = $q.defer();

      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();

      // Mock ShopService
      shopServiceMock = {
          findReviews: jasmine.createSpy('findReviews-spy')
          .and.returnValue(deferredFindReviews.promise),
          showReviewPopup: jasmine.createSpy('showReviewPopup-spy')
      };

      // Instantiate ShopListController
      controller = $controller('ShopReviewListCtrl', {
        '$scope' : $scope,
        '$stateParams' : jasmine.createSpy('$stateParams-spy').and.returnValue({shopId: shopIdValue}),
        'ShopService': shopServiceMock
      });
    }));

    /**
     * ********************************
     * TEST : load shop reviews
     * ********************************
     */
    describe('#load_shop_reviews', function () {

      // Call loadMore on the controller for every test
      beforeEach(function() {
          $scope.loadMore();
      });

      it('should call findReviews on ShopService', function() {
        expect(shopServiceMock.findReviews).toHaveBeenCalled();
      });

      describe('when the findReviews is executed,', function() {
        it('if success : should init shop and review list', function (){
          deferredFindReviews.resolve([testReview]);
		      $rootScope.$digest();
          expect($scope.reviews.length).toBe(1);
          expect($scope.reviews[0].comments).toBe('Pleasant');
          expect($scope.shop.name).toBe('Shop 1');
          expect($scope.hasMore).toBe(true);
          expect($scope.page).toBe(1);
        });

      });

    });

    /**
     * ********************************
     * TEST : show review popup
     * ********************************
     */
    describe('#show_review_popup', function () {

      beforeEach(function() {
          $scope.showReview(testReview);
      });

      it('should set the selected review and call showReviewPopup on ShopService', function() {
        expect($scope.review.comments).toBe('Pleasant');
        expect(shopServiceMock.showReviewPopup).toHaveBeenCalled();
      });

    });
});
