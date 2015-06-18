angular
    .module('app.core')

    .factory('userService', userService)

    .$inject = ['$q'];

function userService($q) {

    var service = {
        getUser : getUser
    };

    return service;

    function getUser(userId) {
        var ref = new Firebase('https://confion.firebaseio.com/users/' + userId);
        var def = $q.defer();
        ref.once('value', function(sessionSnapshot) {
            def.resolve(sessionSnapshot.val());
        });
        return def.promise;

    };

}
