module.exports = function(config){
    var configuration = {

    basePath : './',

    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/components/**/*.js',
      'app/view*/**/*.js'
    ],

      customLaunchers: {
          Chrome_travis_ci: {
              base: 'Chrome',
              flags: ['--no-sandbox']
          }
      },

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  };

    if (process.env.TRAVIS) {
        configuration.browsers = ['Chrome_travis_ci'];
    }
    config.set(configuration);
};
