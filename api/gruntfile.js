module.exports = function (grunt) {

	var files = {
		watch: ['gruntfile.js', 'server/**/*.js', 'common/**/*.js'],
		serverJs: ['server/**/*.js', 'common/**/*.js'],
		serverJson:['server/**/*.json','common/**/*.json'],
		tests: ['server/test/**/*.js']
	};

	//-- Get environment vars definition
	//var environment = require('./env');

	//-- Project config
	grunt.initConfig({

		//-- Generate angular client + docs
		loopback_sdk_angular: {
			options: {
				input: 'server/server.js',
				output: 'client/lb-services.js',
				ngModuleName: 'lbServices',
			},
			docular: {
		    groups: [{
	        groupTitle: 'LoopBack',
	        groupId: 'loopback',
	        sections: [
	          {
	            id: 'lbServices',
	            title: 'LoopBack Services',
	            scripts: [ 'client/lb-services.js' ]
	          }
	        ]
	      }]
		  }
		},

    //-- Server Tests
    mochaTest: {
      test: {
          options: {
              reporter: 'spec',
              clearRequireCache: false,
          },
          src: files.tests
      },
      //-- unit-test report
      results: {
          options: {
          quiet: true,
          reporter: 'xunit',
                  captureFile: 'unit-test-results.xml'
          },
          src: files.tests
      },
      //-- code coverage
      coverage: {
          options: {
              quiet: true,
              reporter: 'html-cov',
              captureFile: 'unit-test-coverage.html'
          },
          src: files.tests,
      }
    },
		watch: {
			serverJs: {
				files: files.serverJs,
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			serverJson: {
				files: files.serverJson,
				tasks: ['loopback_sdk_angular'],
				options: {
					livereload: true
				}
			}
		},
		nodemon: {
		  dev: {
				script: 'server/server.js',
				options: {
					nodeArgs: ['--debug'],
					watch: files.watch.concat(files.serverJson)
				}
		  }
		},
		jshint: {
			all: {
				src: files.serverJs,
				globals: {
					options: {
						jshintrc: true,
						reporter: require('jshint-stylish')
					}
				}
			},
			out: {
				src: files.serverJs,
				options: {
					jshintrc: true,
					reporter: 'checkstyle',
					reporterOutput: 'jshint-results.xml'
				}
			}
		},
		concurrent: {
			default: ['nodemon', 'watch'],
			//debug: ['nodemon', 'watch', 'node-inspector'],
			options: {
				logConcurrentOutput: true,
				limit: 10
			}
		}
	});

	//-- Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

    // Making grunt default to force in order not to break the project.
	grunt.option('force', true);

    //-- Default task
	grunt.registerTask('default', ['jshint', 'loopback_sdk_angular', 'docular']);

	//-- Test tasks
	grunt.registerTask('test', ['lint', 'test:console']);
	// grunt.registerTask('test:console' , ['env:test', 'mochaTest:test']);
	// grunt.registerTask('test:coverage', ['env:test', 'mochaTest:coverage']);
	// grunt.registerTask('test:results', ['env:test' , 'lint','mochaTest:results']);
	// grunt.registerTask('test:memory', ['env:mem' , 'lint','mochaTest:test']);

	//-- Serve task
	grunt.registerTask('serve', 'Start the app server', function (target) {
		grunt.task.run(['jshint', 'concurrent:default']);
	});
};
