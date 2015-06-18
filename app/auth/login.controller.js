'use strict';

angular
    .module('app.login', ['app.core'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'auth/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        });
    }])

    .controller('LoginController', LoginController)

    .$inject = ['authService'];

function LoginController(authService) {
    var vm = this;
    vm.login = login;

    function login() {
        var email = vm.email;
        var password = vm.password;
        authService.login(email, password);
    }


}
