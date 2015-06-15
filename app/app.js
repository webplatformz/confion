'use strict';

angular
    .module('app', [
        'app.core',

        'app.auth',
        'app.overview'
    ])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/overview'});
    }]
);
