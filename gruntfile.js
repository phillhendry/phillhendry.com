// Load Grunt
module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Tasks
		sass: { // Begin Sass Plugin
			dist: {
				options: {
					sourcemap: 'none'
				},
				files: [{
					expand: true,
					cwd: 'sass',
					src: ['**/*.scss'],
					dest: 'css',
					ext: '.css'
      }]
			}
		},
		postcss: { // Begin Post CSS Plugin
			options: {
				map: false,
				processors: [
      				require('autoprefixer')({
						browsers: ['last 2 versions']
					})
    ]
			},
			dist: {
				src: 'css/style.css'
			}
		},
		cssmin: { // Begin CSS Minify Plugin
			target: {
				files: [{
					expand: true,
					cwd: 'css',
					src: ['*.css', '!*.min.css'],
					dest: 'css',
					ext: '.min.css'
    }]
			}
		},
		uglify: { // Begin JS Uglify Plugin
			build: {
				src: ['src/*.js'],
				dest: 'js/script.min.js'
			}
		},
		connect: {
			server: {
				options: {
					port: 3030, // custom port
					base: '.', // current directory for 'index.html' is root
					keepalive: true, // keep the server alive indefinitely
					open: {
						target: 'http://localhost:3030',
					},

				}
			}
		},
		watch: { // Compile everything into one task with Watch Plugin
			css: {
				files: '**/*.scss',
				tasks: ['sass', 'postcss', 'cssmin']
			},
			js: {
				files: '**/*.js',
				tasks: ['uglify']
			}

		}

	});



	// Load Grunt plugins
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	// Register Grunt tasks
	grunt.registerTask('default', ['watch']);
};
