module.exports = function (grunt) {

	var files = {
		client:['client/js/**/*.js', 'client/**/*.html'],
		serverJs: ['server/**/*.js', 'common/**/*.js'],
		serverJson:['server/**/*.json','common/**/*.json'],
		tests: ['server/test/**/*.js']
	};

	//-- Project config
	grunt.initConfig({

		//-- Generate angular client lib
		loopback_sdk_angular: {
			services: {
				options: {
					input: 'server/server.js',
					output: 'client/lb-services.js',
					ngModuleName: 'lbServices'
				}
			}
		},

		//-- Generate documentation
		docular: {
			docular_webapp_target: 'docular',
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
		},
		docularserver: {
	    targetDir: 'docular'
		},
		watch: {
			client : {
				files: files.client,
				options: {
					livereload: 35730
				}
			},
			serverJs: {
				files: files.serverJs,
				tasks: ['jshint', 'loopback_sdk_angular', 'docular'],
				options: {
					livereload: 35730
				}
			},
			serverJson: {
				files: files.serverJson,
				tasks: ['loopback_sdk_angular', 'docular'],
				options: {
					livereload: 35730
				}
			}
		},
		nodemon: {
		  dev: {
				script: 'server/server.js',
				options: {
					nodeArgs: ['--debug'],
					watch: files.serverJs.concat(files.serverJson)
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
	grunt.registerTask('default', ['serve']);

	grunt.registerTask('build', ['jshint', 'loopback_sdk_angular', 'docular']);

	//-- Test tasks
	//grunt.registerTask('test', ['jshint', 'test:console']);

	//-- Serve task
	grunt.registerTask('serve', 'Start API server', function (target) {
		grunt.task.run(['jshint', 'concurrent:default']);
	});
};
