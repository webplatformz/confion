'use strict';

angular
    .module('app.logout', ['app.core'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/logout', {
            controller: 'LogoutController',
            controllerAs: 'vm'
        });
    }])

    .controller('LogoutController', LogoutController)

    .$inject = ['authService', '$location'];

function LogoutController(authService, $location) {
    var vm = this;

    authService.logout();
    $location.path("#/login")

}
