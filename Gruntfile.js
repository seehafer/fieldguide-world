'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js'
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      js: {
        files: [
          'app.js',
          'app/**/*.js',
          'config/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      views: {
        files: [
          'app/views/*.jade',
          'app/views/**/*.jade'
        ],
        options: { livereload: reloadPort }
      },
      public_js: {
        files: ['public/js/**'],
        tasks: ['develop', 'delayed-livereload']
      },
      bower: {
        files: ['bower.json'],
        tasks: ['bower-install', 'bower_concat', 'delayed-livereload']
      }
    },
    "bower-install-simple": {
        options: {
            color: true,
            directory: "public/components"
        },
    },
    // bower: {
    //   target: {
    //     rjsConfig: 'public/js/require.config.js',
    //     options: {
    //       transitive: true
    //     }
    //   }
    // },
    bower_concat: {
      all: {
        dest: 'public/js/_bower.js',
        // exclude: [
        //     'jquery',
        //     'modernizr'
        // ],
        dependencies: {
          'underscore': 'jquery',
          'backbone': 'underscore',
          'isotope': 'jquery'
        },
        // bowerOptions: {
        //   relative: false
        // }
      }
    }
  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);

  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.registerTask("bower-install", [ "bower-install-simple" ]);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function(err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded)
            grunt.log.ok('Delayed live reload successful.');
          else
            grunt.log.error('Unable to make a delayed live reload.');
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('default', ['develop', 'watch']);

  var MongoClient = require('mongodb').MongoClient,
    fs = require('fs');

  grunt.registerTask('fixture', 'Load data from fixture file', function (name, reset) {
    var done = this.async();
    reset = reset === "reset";
    console.log('Connecting...');
    MongoClient.connect('mongodb://127.0.0.1:27017/pocketdoug-development', function (err, db) {
      var collection = db.collection(name);
      var data_str = fs.readFileSync('fixtures/' + name + '.json', {
        encoding: 'utf-8'
      });
      var data = JSON.parse(data_str);
      var insert = function () {
        console.log('Inserting ' + data.length + ' objects...');
        collection.insert(data, {w: 1}, function (err, objects) {
          if (err) {
            console.log(err);
          } else {
            console.log("Inserted " + objects.length + " objects.");
          }
          done();
        });
      }

      if (reset) {
        console.log()
        collection.drop(insert);
      } else {
        insert();
      }

    })
  });
};
