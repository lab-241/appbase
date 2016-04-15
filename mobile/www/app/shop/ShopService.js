/**
 * ShopService : Api Shop service
 * @Author Michael P.O
 */
angular
.module('appbase.shop')
.factory('ShopService', function(Shop, Review) {

  var service = {};

  /**
   * Find shop with pagination
   * @returns : $promise
   */
  service.find = function (page) {
    var limit = 10;
    return Shop.find({
      filter: {
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
  service.review = function(rating, comments, shopId){
    //-- NB: "PublisherId" and "date" fields are
    // auto setted by api Review model.
    // @see api/common/review.js Review.beforeRemote('create')
    return Review.create({
      rating: rating,
      comments: comments,
      shopId: shopId
    }).$promise;
  };

  return service;
});
