'use strict';

angular
    .module('app', [
        'app.core',
        'app.login',
        'app.logout',
        'app.overview',
        'app.sessions',
        'app.presenters',
        'app.timeline'

    ])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/overview'});
    }])

    .run(['$rootScope', '$location', 'localStorageService', function($rootScope, $location, localStorageService)  {
        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            var user = $rootScope.user;
            if(user == null || user == undefined) {
                user = localStorageService.get("user");
                // Update user
                $rootScope.user = user;
            }

            if(user == null || user == undefined) {
                if(next.templateUrl !== "auth/login.html") {
                    $location.path("/login");
                }
            }
        })
    }]);
