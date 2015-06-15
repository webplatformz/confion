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

    .controller('LoginController', LoginController);

LoginController.$inject = ['$firebaseAuth', '$rootScope', '$location'];
function LoginController($firebaseAuth, $rootScope, $location) {
    var vm = this;
    vm.login = login;

    var ref = new Firebase("https://confion.firebaseio.com");
    var auth = $firebaseAuth(ref);


    function login() {
        auth.$authWithPassword({
            email: vm.email,
            password: vm.password
        }).then(function(authData) {
            console.log("Logged in as:", authData.uid);
            $rootScope.user = authData.uid;
            $location.path("/");
        }).catch(function(error) {
            console.error("Authentication failed:", error);
        });
    };
}
