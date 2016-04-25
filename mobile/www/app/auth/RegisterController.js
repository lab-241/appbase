angular
  .module('appbase.auth')
  .controller('RegisterCtrl', function($scope, $ionicPopup, debug,
    AuthService, MessageService, LoaderService) {

    //-- Credentials
    $scope.credentials = debug ? {
      username : 'toto',
      email : 'toto@appbase.ga',
      password : 'appbase',
      newsletter : true
    } : {};

    //-- Perform the register action when the user submits its form
    $scope.doRegister = function() {
      $scope._loading(true);
      AuthService
        .register($scope.credentials.email, $scope.credentials.password,
          $scope.credentials.username)
        .then(function(){
          $scope.closeRegister();
          LoaderService.toast(MessageService.get('REGISTER_SUCCESS'));
        }, function(err){
          var alertPopup = $ionicPopup.alert({
            title: MessageService.get('REGISTER_FAILED'),
            template: MessageService.get('REGISTERING_ERROR')
          });
          //TODO: Specific case error message (eg: existing user)
        })
        .finally(function(){
          $scope._loading(false);
        });
    };

  });
