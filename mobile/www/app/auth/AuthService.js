/**
 * Authentication service
 * AuthService based on ng-sdk generated from Loopback REST API project
 */
angular
  .module('appbase.auth')
  .factory('AuthService', ['User', '$q', '$rootScope', function(User, $q,
      $rootScope) {

    /**
     * Login user
     * */
    function login(email, password) {
      return User
        .login({email: email, password: password})
        .$promise
        .then(function(response) {
          console.log(response);
          $rootScope.currentUser = {
            id: response.user.id,
            token: response.id,
            email: email
          };
        });
    }

    /**
     * Logout User
     * */
    function logout() {
      return User
       .logout()
       .$promise
       .then(function() {
         $rootScope.currentUser = null;
       });
    }

    /**
     * register User
     * */
    function register(email, password, username) {
      return User
        .create({
          realm: 'user',
          email: email,
          password: password,
          username: username
       })
       .$promise;
    }

    return {
      login: login,
      logout: logout,
      register: register
    };
}]);
