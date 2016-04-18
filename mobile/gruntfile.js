module.exports = function (grunt) {

  grunt.initConfig({

    ngconstant: {
      options: {
        deps: false, // constants added to existing 'appbase.conf' module
        name: 'appbase.conf',
        dest: 'www/app/conf/ConfParams.js',
        constants: {
          API_BASE_URL: process.env.API_ENDPOINT || 'http://localhost:3000/api',
        },
        values: { } // ngconstant can also inject angular values
      },
      development: {
        constants: {
          debug : true
        }
      }
    }
  });

  //-- Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.option('force', true);

  grunt.registerTask('default', ['ngconstant:development']);
};
