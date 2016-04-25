angular
  .module('appbase.auth')
  .controller('LoginCtrl', function($scope, $ionicPopup, debug,
    AuthService, MessageService, LoaderService) {

    //-- Credentials
    $scope.credentials = debug ? {
      email : 'toto@appbase.ga',
      password : 'appbase'
    } : {};

    //-- Perform the login action when the user submits the its form
    $scope.doLogin = function() {
      $scope._loading(true);
      AuthService
        .login($scope.credentials.email, $scope.credentials.password)
        .then(function(){
          $scope.closeLogin(MessageService.get('LOGIN_SUCCESS'));
          LoaderService.toast(MessageService.get('REGISTER_SUCCESS'));
        }, function(err){
          var alertPopup = $ionicPopup.alert({
            title: MessageService.get('LOGIN_FAILED'),
            template: MessageService.get('CHECK_CREDENTIALS')
          });
        })
        .finally(function(){
          $scope._loading(false);
        });
    };
  });
