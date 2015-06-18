'use strict';

angular
    .module('app.logout', ['app.core'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/logout', {
            templateUrl: 'auth/logout.html',
            controller: 'LogoutController',
            controllerAs: 'vm'
        });
    }])

    .controller('LogoutController', LogoutController)

    .$inject = ['authService'];

function LogoutController(authService) {
    var vm = this;
    vm.logout = logout;

    function logout() {
        authService.logout();
    }


}
