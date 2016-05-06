var app = angular.module('appbase-admin');

app.run(function($rootScope, $location, $state, LoopBackAuth){
  if(!LoopBackAuth.accessTokenId){
    $location.path('/login');
  }

  $rootScope.$on("$locationChangeStart", function (event, next, current) {
    if (!LoopBackAuth.accessTokenId && !next.match(/login$/)) {
      $location.path('/login');
    }
  });
});

app.controller('AuthCtrl',
  function ($scope, $rootScope, $location, LoopBackAuth, User) {
    
    $scope.hasLoginFormError = false;
    
    $scope.doLogin = function() {
      User.login({email: $scope.login, password: $scope.password})
        .$promise
        .then(function(){
          if($location.nextAfterLogin) {
            $location.path($location.nextAfterLogin);
          } else{
            $location.path('/dashboard');
          }
        }, function(err){
          $scope.hasLoginFormError = true;
        });
    };

    $scope.doLogout =  function (){
      User.logout()
        .$promise
        .finally(function(){
          LoopBackAuth.clearUser();
          LoopBackAuth.clearStorage();
          $location.path('/login');
        });
    };

    if(LoopBackAuth.accessTokenId){
        $scope.doLogout();
    }
});

app.controller('SettingsCtrl',
  function ($scope, LoopBackAuth) {
    $scope.accessToken = LoopBackAuth.accessTokenId;
  });

app.config(function($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      controller: 'AuthCtrl',
      templateUrl: 'tpl/login-form.html'
    })
    .state('logout', {
      url: '/logout',
      controller: 'AuthCtrl'
    })
    .state('settings', {
      parent: 'main',
      url: '/settings',
      controller: 'SettingsCtrl',
      templateUrl: 'tpl/settings.html'
    });
});