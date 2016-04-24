angular
  .module('appbase.auth')
  .controller('AuthCtrl', function($scope, $ionicPopup, debug,
    AuthService, MessageService) {

    //-- Credentials
    $scope.credentials = debug ? {
      username : 'toto',
      email : 'toto@appbase.ga',
      password : 'appbase',
      newsletter : true
    } : {};

    //-- Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      $scope._loading(true);
      AuthService
        .login($scope.credentials.email, $scope.credentials.password)
        .then(function(){
          $scope.closeLogin();
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

    //-- Perform the register action when the user submits the login form
    $scope.doRegister = function() {
      $scope._loading(true);
      AuthService
        .register($scope.credentials.email, $scope.credentials.password,
          $scope.credentials.username)
        .then(function(){
          $scope.closeRegister();
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
