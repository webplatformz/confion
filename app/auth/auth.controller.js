'use strict';

angular
    .module('app.auth', ['app.core'])

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
        // email: vm.email,
        // password: vm.password
        // TODO DEV MODE
        var email = 'hans@test.ch';
        var password =  'hans';
        authService.login(email, password);
    };
}
