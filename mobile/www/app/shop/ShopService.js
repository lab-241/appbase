/**
 * ShopService : Api Shop self
 * @Author Michael P.O
 */
angular
.module('appbase.shop')
.factory('ShopService', function($filter, $ionicPopup, Shop, Review, User,
  LocalStorage, MessageService) {

  var self = {};

  var FAVORITES_SHOPS = 'favorites-shops';

  /**
   * Find shop with pagination
   * @param {int} page : page results number
   * @returns : $promise
   */
  self.find = function (page) {
    var limit = 10;
    return Shop.find({
      filter: {
        order: 'date DESC',
        limit: limit,
        skip: page * limit,
        include: ['city']
      }
    }).$promise;
  };

  /**
   * Find one shop by Id
   * @returns : $promise
   */
  self.findById = function (id) {
    return Shop.findOne({
      filter: {
        where: {id : id},
        include: ['city']
      }
    }).$promise;
  };

  /**
   * Add a review on a shop
   * Required : autehntication
   * @returns : $promise
   */
  self.addReview = function(rating, comments, shopId){
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
  self.findReviews = function(id, page, limit){
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
        include: ['reviewer','shop']
      }
    }).$promise;
  };

  /**
   * Show review details in a popup
   * @param  {$scope} scope Scope object containing a review to display
   */
  self.showReviewPopup = function(scope){
    var icon = '<i class="icon ion-chatbubble-working txt-calm"></i> ';
    $ionicPopup.show({
      templateUrl: 'app/shop/views/review-popup.html',
      title: icon + scope.review.reviewer.username,
      subTitle: $filter('date')(scope.review.date, 'dd-MM-yyyy hh:mm:ss'),
      scope: scope,
      buttons: [
        { text: MessageService.get('CLOSE'), type: 'button-calm'},
      ]
    });
  };

  /**
   * Get current user favorites as paginated list
   * @param  {[type]} user Current user
   * @param  {[type]} page Pagination number
   * @return {[type]}      [description]
   */
  self.findFavorites = function(userId, page, limit){
    limit = limit || 10;
    page = page || 0;
    return User.favoriteshops({
        id: userId,
        filter: {
          limit: limit,
          skip: page * limit,
          include: ['city']
        }
      }).$promise;
  };

  /**
   * Add a shop to current user favorites
   * @param  {int} userId [description]
   * @param  {int} shopId  [description]
   * @return {$promise} promise
   */
  self.addFavorite = function(userId, shopId){
    return User.favoriteshops.link({
        id: userId,
        fk: shopId
      }, null).$promise.then(function(response){
        if(!self.isFavorite(shopId)){
          // Add the shop in local storage favorites list
          var shops = self.getLocalFavorites();
          shops.push(shopId);
          LocalStorage.setObject(FAVORITES_SHOPS, shops);
        }
        return response;
      });
  };

  /**
  * Remove a shop from current user favorites
  * @param  {int} userId User id
  * @param  {int} shopId Shop id
  * @return {$promise} promise
   */
  self.removeFavorite = function(userId, shopId){
    return User.favoriteshops.unlink({
       id: userId,
       fk: shopId
      }).$promise.then(function(response){
        if(self.isFavorite(shopId)){
          // Remove the shop from local storage favorites list
          var shops = self.getLocalFavorites();
          delete shops[shops.indexOf(shopId)];
          LocalStorage.setObject(FAVORITES_SHOPS, shops);
        }
        return response;
      });
  };

  /**
   * Check if shop is in user favorites (local storage)
   * @param  {string} shopId shop identifier
   * @return {boolean}  true/false
   */
  self.isFavorite = function(shopId){
    var shops = self.getLocalFavorites();
    return shops.indexOf(shopId) !== -1;
  };

  /**
   * Get current user favorites list (local storage)
   * @return {Array}  list of favorites Ids
   */
  self.getLocalFavorites = function(){
    return LocalStorage.getArray(FAVORITES_SHOPS);
  };

  return self;
});
