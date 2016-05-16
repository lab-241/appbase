angular
  .module('appbase.auth')
  .controller('ResetCtrl', function($scope, $ionicPopup,
    AuthService, MessageService, LoaderService) {

      $scope.credentials = {
        resetEmail : 'ian.otando@gmail.com'
      };

    //-- Perform the reset action when the user submits its email form
    $scope.doReset = function() {
      console.log($scope);
      console.log("email set =", $scope.credentials.resetEmail);
      $scope._loading(true);
      AuthService
        .resetPassword($scope.credentials.resetEmail)
        .then(function(){
          $scope.closeResetPassword();
          LoaderService.toast(MessageService.get('RESET_SUCCESS'));
        }, function(err){
          var alertPopup = $ionicPopup.alert({
            title: MessageService.get('RESET_FAILED'),
            template: MessageService.get('RESET_ERROR')
          });
        })
        .finally(function(){
          $scope._loading(false);
        });
    };
  });
