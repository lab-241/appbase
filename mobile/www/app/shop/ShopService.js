/**
 * ShopService : Api Shop service
 * @Author Michael P.O
 */
angular
.module('appbase.shop')
.factory('ShopService', function(Shop) {
      
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
  
  return service;
});