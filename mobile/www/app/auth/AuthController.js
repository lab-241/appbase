angular
  .module('appbase.auth')
  .controller('AuthCtrl', function($scope, $ionicModal, $ionicPopup, AuthService) {

    //-- Credentials
    $scope.credentials = {
      username : 'toto',
      email : 'toto@appbase.ga',
      password : 'appbase'
    };

    //-- Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.credentials);

      AuthService
        .login($scope.credentials.email, $scope.credentials.password)
        .then(function(){
          $scope.closeLogin();
        }, function(err){
          var alertPopup = $ionicPopup.alert({
              title: 'Login failed!',
              template: 'Please check your credentials!'
          });
        });
    };

    //-- Perform the register action when the user submits the login form
    $scope.doRegister = function() {
      console.log('Doing register', $scope.credentials);

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
        });
    };

  });
