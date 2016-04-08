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
				src: files.sources,
				options: {
					jshintrc: true,
					reporter: require('jshint-stylish')
				}
			},
			out: {
				src: files.sources,
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
	grunt.registerTask('default', ['serve']);

	//-- Lint task(s).
	grunt.registerTask('lint', ['jshint']);

	//-- Test tasks
	grunt.registerTask('test', ['lint', 'test:console']);
	// grunt.registerTask('test:console' , ['env:test', 'mochaTest:test']);
	// grunt.registerTask('test:coverage', ['env:test', 'mochaTest:coverage']);
	// grunt.registerTask('test:results', ['env:test' , 'lint','mochaTest:results']);
	// grunt.registerTask('test:memory', ['env:mem' , 'lint','mochaTest:test']);

	//-- Serve task
	grunt.registerTask('serve', 'Start the app server', function (target) {
		grunt.task.run(['lint', 'concurrent:default']);
	});
};
