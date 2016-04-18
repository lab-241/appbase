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
   * @param  {int} limit max results number
   * @return $promise
   */
  service.findReviews = function(id, limit, page){
    var L = limit || 10,
        P = page || 0;
    return Review.find({
      filter: {
        limit: L,
        order: 'date DESC',
        skip: P * L,
        where: {
          shopId: id
        },
        include: ['reviewer']
      }
    }).$promise;
  };

  return service;
});
