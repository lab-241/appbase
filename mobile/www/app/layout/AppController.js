angular
  .module('appbase')
  .controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, AuthService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  //-- Create login modal that we will use later
  var url = '\'app/auth/views/login.html\'';
  var tmpl = '<div ng-controller="AuthCtrl" ng-include="'+url+'"></div>';
  $scope.loginModal = $ionicModal.fromTemplate(tmpl, {
    scope: $scope
  });

  //-- Create register modal that we will use later
  var url = '\'app/auth/views/register.html\'';
  var tmpl = '<div ng-controller="AuthCtrl" ng-include="'+url+'"></div>';
  $scope.registerModal = $ionicModal.fromTemplate(tmpl, {
    scope: $scope
  });

  $scope.closeLogin = function() {
    $scope.loginModal.hide();
  };
  $scope.closeRegister = function() {
    $scope.registerModal.hide();
  };

  $scope.login = function() {
    if($scope.registerModal.isShown()) $scope.closeRegister();
    $scope.loginModal.show();
  };

  $scope.logout = function() {
    AuthService.logout();
  };

  $scope.register = function() {
    if($scope.loginModal.isShown()) $scope.closeLogin();
    $scope.registerModal.show();
  };

  //-- On click to about button
  $scope.about = function(){
    $ionicPopup.alert({
        title: '<b>APP BASE</b>',
        template: '<b>Version</b> v1.0.0<br><br>&copy; Lab-241 2016'
    });
  };

});
