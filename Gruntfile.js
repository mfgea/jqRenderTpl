var distBanner = [
    '/*!',
    ' *  <%= pkg.name %> - <%= pkg.description%>',
    ' *  Version: <%= pkg.version %> (<%= grunt.template.today("dd-mm-yyyy") %>)',
    ' *  Author: <%= pkg.author %>',
    ' *  URL: <%= pkg.url %>',
    ' *  License : <%= pkg.license %>',
    ' */',
    ''
].join('\n');

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: distBanner
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['src/<%= pkg.name %>.js']
                }
            }
        },

        jshint: {
            files: ['Gruntfile.js', 'src/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },

        'http-server': {
            'dev': {
                root: '.',

                // the server port
                port: 8282,

                // the host ip address
                host: "127.0.0.1",

                showDir : true,
                autoIndex: true,

                // server default file extension
                ext: "html",
            }
        }

    });

    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('server', [ 'http-server' ]);

    grunt.registerTask('default', [ 'jshint', 'uglify' ]);

};
