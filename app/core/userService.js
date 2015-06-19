angular
    .module('app.core')

    .factory('userService', userService)

    .$inject = ['$q', '$firebaseObject'];

function userService($q, $firebaseObject) {

    var service = {
        getUser : getUser,
        userAlreadyAttending : userAlreadyAttending,
        attend : attend,
        cancelAttend : cancelAttend
    };

    return service;

    function getUser(userId) {
        var ref = new Firebase('https://confion.firebaseio.com/users/' + userId);
        var def = $q.defer();
        ref.once('value', function(sessionSnapshot) {
            def.resolve(sessionSnapshot.val());
        });
        return def.promise;
    }

    function userAlreadyAttending(userId, sessionId) {
        var ref = new Firebase('https://confion.firebaseio.com/users/' + userId);
        var user = $firebaseObject(ref);
        var def = $q.defer();
        user.$loaded().then(function (data) {
            def.resolve(data[sessionId]);
        });
        return def.promise;
    };

    function attend(userId, sessionId) {
        var ref = new Firebase('https://confion.firebaseio.com/users/' + userId);
        var def = $q.defer();
        var user = $firebaseObject(ref);
        user.$loaded().then(function () {
            if(user[sessionId]) {
                return false;
            }
            user[sessionId] = true;
            user.$save().then(function () {
                def.resolve(user);
            });
        });
        return def.promise;
    }

    function cancelAttend(userId, sessionId) {
        var ref = new Firebase('https://confion.firebaseio.com/users/' + userId);
        var def = $q.defer();
        var user = $firebaseObject(ref);
        user.$loaded().then(function () {
            if(user[sessionId]) {
                user[sessionId] = false;
            }
            user.$save().then(function () {
                def.resolve(user);
            });
        });
        return def.promise;
    }

}
