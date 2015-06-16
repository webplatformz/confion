angular
    .module('app.core')

    .factory('sessionService', sessionService)

    .$inject = ['$q', '$firebaseArray'];

function sessionService($q, $firebaseArray) {

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
            var sessionRef = new Firebase('https://confion.firebaseio.com/sessions');
            sessionRef.once('value', function(sessionSnapshot) {
                var session = {};
                session.key = key;
                session.title = sessionSnapshot.val().title;
                sessions.push(session);
            });
        });
        def.resolve(sessions);
        return def.promise;
    }
}
