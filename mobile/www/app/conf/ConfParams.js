angular
  .module('appbase.conf')

  /**
   * Params : Loopback API configuration
   */
  .constant('API_BASE_URL', 'http://192.168.0.43:3000' + '/api')
  .constant('API_AUTH_HEADER', 'X-Access-Token');
