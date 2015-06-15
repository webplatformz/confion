'use strict';

angular
    .module('app', [
        'app.core',
        'app.auth',
        'app.overview',
        'app.sessions'

    ])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/login'});
    }]
);
