module.exports = function(config){
    config.set({

        basePath : './',

        files : [
           /* "node_modules/requirejs/require.js",
            "app/bower_components/angular/angular.js",
            "app/bower_components/angular-mocks/angular-mocks.js",*/
            'app/overview/dummy.test.js'
        ],

        autoWatch : true,

        frameworks: ['jasmine', 'chai'],

        browsers : ['PhantomJS'],

        plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-chai-plugins',
            'karma-junit-reporter'
        ],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};