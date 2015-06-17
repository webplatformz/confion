module.exports = function(config){
    config.set({

        basePath : './',

        files : [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angularfire/dist/angularfire.min.js',
            'app/bower_components/firebase/firebase.js',
            'app/bower_components/angular-local-storage/dist/angular-local-storage.min.js',

            'app/app.js',
            'app/core/app.core.js',
            'app/core/sessionService.js',
            'app/core/sessionService.spec.js'
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