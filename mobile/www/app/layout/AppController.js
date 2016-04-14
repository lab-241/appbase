angular
  .module('appbase')
  .controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, AuthService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  //-- Credentials
  $scope.credentials = {};

  //-- Create modals that we will use later
  $ionicModal.fromTemplateUrl('app/auth/views/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.loginModal = modal;
  });
  $ionicModal.fromTemplateUrl('app/auth/views/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.registerModal = modal;
  });

  $scope.closeLogin = function() {
    $scope.loginModal.hide();
  };
  $scope.closeRegister = function() {
    $scope.registerModal.hide();
  };

  //-- Open modals
  $scope.login = function() {
    if($scope.registerModal.isShown()) $scope.closeRegister();
    $scope.loginModal.show();
  };
  $scope.register = function() {
    if($scope.loginModal.isShown()) $scope.closeLogin();
    $scope.registerModal.show();
  };

  //-- Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.credentials);

    AuthService
      .login($scope.credentials.username, $scope.credentials.password)
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
      .register($scope.credentials.username, $scope.credentials.password)
      .then(function(){
        $scope.closeRegister();
      }, function(err){
        var alertPopup = $ionicPopup.alert({
            title: 'Register failed!',
            template: 'Error occurs during registering process'
        });
      });
  };

  //-- On click to about button
  $scope.about = function(){
    $ionicPopup.alert({
        title: '<b>APP BASE</b>',
        template: '<b>Version</b> v1.0.0<br><br>&copy; Lab-241 2016'
    });
  };

});
