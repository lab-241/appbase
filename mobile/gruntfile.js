module.exports = function (grunt) {

  var sourcesJs = ['gruntfile.js', 'www/app/**/*.js', '!www/app//libs/LbServices.js'];

  grunt.initConfig({
    jshint: {
      all: {
        src: sourcesJs,
        options: {
          jshintrc: true,
          reporter: require('jshint-stylish')
        }
      },
      out: {
        src: sourcesJs,
        options: {
          jshintrc: true,
          reporter: 'jslint',
          reporterOutput: 'jshint-results.xml'
        }
      }
    },
    karma: {
      options: {
        //-- point all tasks to karma config file
        configFile: 'tests/unit-tests.conf.js'
      },
      unit: {
        singleRun: true
      }
    },
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

  grunt.registerTask('default', ['jshint','ngconstant:development']);

  grunt.registerTask('test', ['jshint', 'karma:unit']);
};
