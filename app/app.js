'use strict';

angular
    .module('app', [
        'app.core',
        'app.auth',
        'app.overview',
        'app.sessions'

    ])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/overview'});
    }])

    .run(['$rootScope', '$location', function($rootScope, $location) {
        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            if($rootScope.user == null || $rootScope.user == undefined) {
                if(next.templateUrl !== "auth/login.html") {
                    $location.path("/login");
                }
            }
        })
    }]);
