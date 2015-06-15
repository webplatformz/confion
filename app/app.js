'use strict';

angular
    .module('app', [
        'app.core',
        'app.overview',
        'app.sessions'

    ])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/overview'});
    }]
);
