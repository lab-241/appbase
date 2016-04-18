/**
 * Authentication service
 * AuthService based on ng-sdk generated from Loopback REST API project
 */
angular
  .module('appbase.auth')
  .factory('AuthService', function(User, $q, $rootScope, LocalStorage) {

    /**
     * Set sessin helper
     */
    function _setSession(session){
      LocalStorage.setObject('session', session);
      $rootScope.session = session;
    }
    /**
     * Login user
     * */
    function login(email, password) {
      return User
        .login({email: email, password: password})
        .$promise
        .then(function(response) {
          var session = {
            token : response.id,
            user : response.user
          };
          _setSession(session);
        });
    }

    /**
     * Check if user is logged in.
     */
    function hasSession(){
      if(LocalStorage.getObject('session').token){
        return true;
      }
      return false;
    };

    /**
     * Logout User
     * */
    function logout() {
      return User
       .logout()
       .$promise
       .then()
       .finally(
          function(result){
            _setSession({});
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
      register: register,
      hasSession : hasSession
    };
});
