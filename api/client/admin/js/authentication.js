var app = angular.module('appbase-admin');

function hideMenu() {
  $('#header-nav').hide();
  $('#page-wrapper').css('margin-left',0);
}

function showMenu() {
  $('#loginForm').hide();
  $('#page-wrapper').css('margin-left',250);
  $('#header-nav').show();
}

app.run(function($rootScope, $location, $state, LoopBackAuth){
  if(!LoopBackAuth.accessTokenId){
    $location.path('/login').replace();
  }

  $rootScope.$on("$locationChangeStart", function (event, next, current) {
    if (!LoopBackAuth.accessTokenId && !next.match(/login$/)) {
      $location.path('/login').replace();
    }
  });
});

app.controller('AuthCtrl',
  function ($scope, $rootScope, $location, LoopBackAuth, User) {
    $scope.hasLoginFormError=false;
    hideMenu();
    $scope.doLogin = function() {
      User.login({email: $scope.login, password: $scope.password})
      .$promise
        .then(function(){
          showMenu();
          $location.path('/dashboard').replace();
        }, function(err){
          $scope.hasLoginFormError=true;
        })
        .finally(function(){

        });
    };

    $scope.doLogout =  function (){
      User.logout().$promise
      .then(function (result){
          $location.path('/login').replace();
      });
    };

    if(LoopBackAuth.accessTokenId){
        $scope.doLogout();
    }
});

app.config(function($stateProvider) {
  $stateProvider
    .state('login', {
      parent: 'main',
      url: '/login',
      controller: 'AuthCtrl',
      templateUrl: 'tpl/login-form.html'
    });
});

app.config(function($stateProvider) {
  $stateProvider
    .state('logout', {
      parent: 'main',
      url: '/logout',
      controller: 'AuthCtrl'
    });
});
