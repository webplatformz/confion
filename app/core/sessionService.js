angular
    .module('app.core')

    .factory('sessionService', sessionService)

    .$inject = ['$q', '$firebaseObject'];

function sessionService($q, $firebaseObject) {

    var service = {
        getSession : getSession,
        getSessions : getSessions,
        getSessionsByPresentor : getSessionsByPresentor
    };

    return service;

    function getSession(sessionId) {
        var def = $q.defer();
        var sessionRef = new Firebase('https://confion.firebaseio.com/sessions/' + sessionId);
        sessionRef.once('value', function(sessionSnapshot) {
            def.resolve(sessionSnapshot.val());
        });
        return def.promise;
    }

    function getSessions() {
        var def = $q.defer();
        var sessionRef = new Firebase('https://confion.firebaseio.com/sessions');
        sessionRef.once('value', function(sessionsSnapshot) {
            def.resolve(sessionsSnapshot.val());
        });
        return def.promise;
    }

    function getSessionsByPresentor(presenter) {
        var def = $q.defer();
        var sessions = [];
        angular.forEach(presenter.sessions, function(value, key) {
            var promise = getSession(key);
            promise.then(function (session) {
                sessions.push(session);
            });
        });
        def.resolve(sessions);
        return def.promise;
    }
}
