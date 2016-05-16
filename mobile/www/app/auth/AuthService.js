/**
 * Authentication service
 * AuthService based on ng-sdk generated from Loopback REST API project
 */
angular
  .module('appbase.auth')
  .factory('AuthService', function(User, $q, $rootScope, LoopBackAuth){

  var self = {};

  /**
   * Login user
   */
  self.login = function(email, password) {
    return User
      .login({email: email, password: password})
      .$promise;
  };

  self.currentUserId = function(){
    return LoopBackAuth.currentUserId || 'not_id_found';
  };

  /**
   * Check if user is logged in.
   */
   self.hasSession = function(){
      return User.isAuthenticated();
    };

  /**
   * Logout User
   * */
   self.logout = function() {
    return User
     .logout()
     .$promise
     .finally(function(){
       LoopBackAuth.clearUser();
       LoopBackAuth.clearStorage();
     });
    };

  /**
   * Register User
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

    /**
     * Reset User password
     */
     self.resetPassword = function(userEmail) {
        return User
        .resetPassword({
          email: userEmail
        })
         .$promise;
      };
    return self;
});
