'use strict';

angular
    .module('app.logout', ['app.core'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/logout', {
            controller: 'LogoutController',
            controllerAs: 'vm',
            // angular requires a template, even if we dont use it
            templateUrl: 'auth/login.html'
        });
    }])

    .controller('LogoutController', LogoutController)

    .$inject = ['authService'];

function LogoutController(authService) {
    var vm = this;

    authService.logout();

}
