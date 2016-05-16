angular
  .module('appbase')
  .controller('AppCtrl',
  function($scope, $rootScope, $ionicModal, $ionicPopup, LoaderService,
    AuthService, LocalStorage) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  //-- Helper to check user session
  $rootScope.hasSession = function(){
    return AuthService.hasSession();
  };

  //-- Create login modal that we will use later
  var logUrl = '\'app/auth/views/login.html\'';
  var logTpl = '<div ng-controller="LoginCtrl" ng-include="'+logUrl+'"></div>';
  $scope.loginModal = $ionicModal.fromTemplate(logTpl, {
    scope: $scope
  });

  //-- Create register modal that we will use later
  var regUrl = '\'app/auth/views/register.html\'';
  var regTpl = '<div ng-controller="RegisterCtrl" ng-include="'+regUrl+'"></div>';
  $scope.registerModal = $ionicModal.fromTemplate(regTpl, {
    scope: $scope
  });

  //-- Create reset password modal form
  var resUrl = '\'app/auth/views/reset.html\'';
  var resTpl = '<div ng-controller="ResetCtrl" ng-include="'+resUrl+'"></div>';
  $scope.resetModal = $ionicModal.fromTemplate(resTpl, {
    scope: $scope
  });

  $scope.closeLogin = function(msg) {
    $scope.loginModal.hide();
  };
  $scope.closeRegister = function() {
    $scope.registerModal.hide();
  };
  $scope.closeResetPassword = function() {
    $scope.resetModal.hide();
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

  $scope.resetPassword = function ()  {
    console.log("resetPassword");
  //  if($scope.resetModal.isShown()) $scope.closeResetPassword();
    $scope.resetModal.show();
  }

  //-- On click to about button
  $scope.about = function(){
    $ionicPopup.alert({
      title: '<b>APP BASE</b>',
      template: '<b>Version</b> v1.0.0<br><br>&copy; Lab-241 2016'
    });
  };

  /**
   * Display or hide loader
   * @param  {boolean} visible show/hide loader
   */
   $scope._loading = function(visible) {
    if(visible)
      LoaderService.show(null, {template:'<i class="ion-load-a">'});
    else
      LoaderService.hide();
  };

});
