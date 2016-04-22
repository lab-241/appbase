/**
 * ShopService : Api Shop service
 * @Author Michael P.O
 */
angular
.module('appbase.shop')
.factory('ShopService', function($filter, $ionicPopup, Shop, Review, User) {

  var service = {};

  /**
   * Find shop with pagination
   * @param {int} page : page results number
   * @returns : $promise
   */
  service.find = function (page) {
    var limit = 10;
    return Shop.find({
      filter: {
        order: 'date DESC',
        limit: limit,
        skip: page * limit
      }
    }).$promise;
  };

  /**
   * Find one shop by Id
   * @returns : $promise
   */
  service.findById = function (id) {
    return Shop.findOne({
      filter: {
        where: {id : id}
      }
    }).$promise;
  };

  /**
   * Add a review on a shop
   * Required : autehntication
   * @returns : $promise
   */
  service.addReview = function(rating, comments, shopId){
    //-- NB: "PublisherId" and "date" fields are
    // auto setted by api Review model.
    // @see api/common/review.js Review.beforeRemote('create')
    return Review.create({
      rating: rating,
      comments: comments,
      shopId: shopId
    }).$promise;
  };

  /**
   * [function description]
   * @param  {int} id the shop Id
   * @param  {int} page pagination number
   * @param  {int} limit max results number
   * @return $promise
   */
  service.findReviews = function(id, page, limit){
    limit = limit || 10;
    page = page || 0;
    return Review.find({
      filter: {
        limit: limit,
        order: 'date DESC',
        skip: page * limit,
        where: {
          shopId: id
        },
        include: ['reviewer']
      }
    }).$promise;
  };

  /**
   * Show review details in a popup
   * @param  {$scope} scope Scope object containing a review to display
   */
  service.showReviewPopup = function(scope){
    var icon = '<i class="icon ion-chatbubble-working txt-calm"></i> ';
    $ionicPopup.show({
      templateUrl: 'app/shop/views/review-popup.html',
      title: icon + scope.review.reviewer.username,
      subTitle: $filter('date')(scope.review.date, 'dd-MM-yyyy hh:mm:ss'),
      scope: scope,
      buttons: [
        { text: 'Close', type: 'button-calm'},
      ]
    });
  };

  /**
   * Get current user favorites as paginated list
   * @param  {[type]} user Current user
   * @param  {[type]} page Pagination number
   * @return {[type]}      [description]
   */
  service.findFavorites = function(userId, page, limit){
    limit = limit || 10;
    page = page || 0;
    return User.favoritesShops({
        id: userId,
        filter: {
          limit: limit,
          skip: page * limit
        }
      }).$promise;
  };

  /**
   * Add a shop to current user favorites
   * @param  {int} userId [description]
   * @param  {int} shopId  [description]
   * @return {$promise} promise
   */
  service.addFavotites = function(userId, shopId){
    return User.favoritesShops.link({
        id: userId,
        fk: shopId
      }, null).$promise;
  };

    /**
    * Remove a shop from current user favorites
    * @param  {int} userId User id
    * @param  {int} shopId Shop id
    * @return {$promise} promise
     */
  service.removeFavorite = function(userId, shopId){
    return User.favoritesShops.unlink({
       id: userId,
       fk: shopId
      }).$promise;
  };

  return service;
});
