angular
    .module('app.core')

    .factory('authService', authService)

    .$inject = ['localStorageService', '$rootScope', '$firebaseAuth', '$location', '$firebaseArray', '$firebaseObject'];

function authService(localStorageService, $rootScope, $firebaseAuth, $location, $firebaseArray, $firebaseObject) {

    var service = {
        login : login,
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
            $rootScope.user = authData.uid;
            localStorageService.set("user", authData.uid);
            $location.path("/");
        }).catch(function(error) {
            // TODO show error in ui
            console.error("Authentication failed:", error);
        });
    };

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
        var authData = ref.getAuth();
        return authData;
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
