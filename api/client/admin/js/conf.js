angular.module('appbase-admin.conf', ['lbServices'])

.constant('API_BASE_URL', 'http://localhost:3000/api/')
.constant('debug', true)

/**
 * Loppback Api configuration
 * Use `LoopBackResourceProvider` to change the global configuration
 * settings used by all models.
 *
 * @param  {Object} LoopBackResourceProvider
 *         Provider for access the global api configuration
 * @param  {Strinng} API_BASE_URL
 *         URL where to access the LoopBack REST API server
 * @param  {Strinng} API_AUTH_HEADER
 *         Use a custom auth header instead of the default 'Authorization'
 * @return {Object}
 *         appbase module
 */
 .config(function(LoopBackResourceProvider, $httpProvider, API_BASE_URL) {
    LoopBackResourceProvider.setAuthHeader('X-Access-Token');
    LoopBackResourceProvider.setUrlBase(API_BASE_URL);

    $httpProvider.interceptors.push(function($q, $location, LoopBackAuth) {
      return {
        responseError: function(rejection) {
          if(rejection.status === 401) {
            // Clearing the loopback values from client browser for safe logout
            LoopBackAuth.clearUser();
            LoopBackAuth.clearStorage();
            $location.nextAfterLogin = $location.path();
            $location.path('/login');
          }
          return $q.reject(rejection);
        }
      };
    });
  });
