/*
 * Shop module
 * @Author Michael
 */
angular.module('appbase.shop', []).directive('rateBar', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/shop/views/rate-bar-tpl.html',
        scope: {
            rate: '='
        }
    };
});
