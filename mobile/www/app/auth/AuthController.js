angular
  .module('appbase.auth')
  .controller('AuthCtrl', function($scope, $ionicPopup, debug,
    AuthService) {

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
              title: 'Login failed!',
              template: 'Please check your credentials!'
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
              title: 'Register failed!',
              template: 'Error occurs during registering process'
          });
          //TODO: Specific case error message (eg: existing user)
        })
        .finally(function(){
          $scope._loading(false);
        });
    };

  });
