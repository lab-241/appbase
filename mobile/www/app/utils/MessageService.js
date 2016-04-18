/*
 * MessageService service
 * @Author Michael P.O.
 */
angular.module('appbase.utils')

.factory('MessageService', function($filter) {
  return {
    get : function(key){
      return $filter('translate')(key);
    }
  };
});
