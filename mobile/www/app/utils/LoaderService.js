/*
 * LoaderService service
 * @Author Michael P.O.
 */
angular.module('appbase.utils')

.factory('LoaderService', function($ionicLoading) {

  /**
   * Trigger the loading indicator
   */
  return {
    show : function(message, params) {
      //-- Show the loading overlay and text
      $ionicLoading.show(params || {
        content: message,
        animation: 'fade-in',
        //-- Will a dark overlay or backdrop cover the entire view
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 500
      });
    },

    /**
     * Display self-hiding message
     * @param  {string} message  message to show
     * @param  {long} duration delay before hide message
     */
    toast : function(message, duration){
      $ionicLoading.show({
        template: message,
        showDelay: 0,
        duration: duration || 900,
        showBackdrop: false
      });
    },

    /**
     * Hide Loader indicator
     */
    hide : function(){
      $ionicLoading.hide();
    }
  };
});
