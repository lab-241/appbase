/**
 * Authentication service
 * AuthService based on ng-sdk generated from Loopback REST API project
 */
angular
  .module('appbase.auth')
  .factory('AuthService', function(User, $q, $rootScope, LocalStorage) {

  var self = {};

  /**
   * Set session helper
   */
  function _setSession(session){
    LocalStorage.setObject('session', session);
  }

  /**
   * Get session obj
   * session = {
   * 	token : string
   * 	user : object
   * }
   */
  self.getSession = function(){
    return LocalStorage.getObject('session');
  };

  /**
   * Login user
   */
  self.login = function(email, password) {
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
  };

  /**
   * Check if user is logged in.
   */
   self.hasSession = function(){
      if(LocalStorage.getObject('session').token){
        return true;
      }
      return false;
    };

  /**
   * Logout User
   * */
   self.logout = function() {
    return User
     .logout()
     .$promise
     .then()
     .finally(
        function(result){
          _setSession({});
        });
    };

  /**
   * register User
   */
   self.register = function(email, password, username) {
      return User
        .create({
          realm: 'user',
          email: email,
          password: password,
          username: username
       })
       .$promise;
    };

    return self;
});
