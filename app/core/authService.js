angular
    .module('app.core')

    .factory('authService', authService)

    .$inject = ['localStorageService', '$rootScope', '$firebaseAuth', '$location', '$firebaseObject', 'userService'];

function authService(localStorageService, $rootScope, $firebaseAuth, $location, $firebaseObject, userService) {

    var service = {
        login : login,
        logout : logout,
        getCurrentUser : getCurrentUser,
        register : register
    };

    return service;

    function login(email, password) {
        var ref = new Firebase("https://confion.firebaseio.com");
        var auth = $firebaseAuth(ref);
        auth.$authWithPassword({
            email: email,
            password: password
        }).then(function(authData) {
            var user = userService.getUser(authData.uid).then(function(user) {
                $rootScope.user = user;
                localStorageService.set("user", user);
                $location.path("/");
            });

        }).catch(function(error) {
            // TODO show error in ui
            console.error("Authentication failed:", error);
        });
    }

    function logout() {
        $rootScope.user = null;
        localStorageService.set("user", null);
        $location.path('/auth/login');
    }

    function register(firstname, lastname, mail) {
        var ref = new Firebase('https://confion.firebaseio.com').child('users');
        var password = generateRandomPassword(16);
        $firebaseAuth(ref)
            .$createUser({ email: mail, password: password })
            .then(function(regUser){
                var firebaseUser = $firebaseObject(ref.child(regUser.uid));
                firebaseUser.firstname = firstname;
                firebaseUser.lastname = lastname;
                firebaseUser.email = mail;
                firebaseUser.password = password;
                firebaseUser.$save();
            }).catch(function(error) {
                console.error("Error: ", error);
            });
    }

    function getCurrentUser() {
        var ref = new Firebase("https://confion.firebaseio.com");
        var authData = $firebaseAuth(ref);
        return authData.$getAuth();
    }

    function generateRandomPassword(length) {
        var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
        var pass = "";
        for (var x = 0; x < length; x++) {
            var i = Math.floor(Math.random() * chars.length);
            pass += chars.charAt(i);
        }
        return pass;
    }
}
