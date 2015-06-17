angular
    .module('app.core')

    .factory('authService', authService)

    .$inject = ['$q', 'localStorageService', '$rootScope', '$firebaseAuth', '$location'];

function authService($q, localStorageService, $rootScope, $firebaseAuth, $location) {

    var service = {
        login : login
    };

    return service;

    function login(email, password) {

        var ref = new Firebase("https://confion.firebaseio.com");
        var auth = $firebaseAuth(ref);
        auth.$authWithPassword({
            email: email,
            password: password
        }).then(function(authData) {
            $rootScope.user = authData.uid;
            localStorageService.set("user", authData.uid);
            $location.path("/");
        }).catch(function(error) {
            // TODO show error in ui
            console.error("Authentication failed:", error);
        });
    };
}
