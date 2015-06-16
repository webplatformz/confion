'use strict';

angular
    .module('app', [
        'app.core',
        'app.auth',
        'app.overview',
        'app.sessions',
        'app.presenters'

    ])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/overview'});
    }])

    .run(['$rootScope', '$location', 'localStorageService', function($rootScope, $location, localStorageService)  {
        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            var user = $rootScope.user;
            if(user == null || user == undefined) {
                user = localStorageService.get("user");
            }

            if(user == null || user == undefined) {
                if(next.templateUrl !== "auth/login.html") {
                    $location.path("/login");
                }
            }
        })
    }]);
