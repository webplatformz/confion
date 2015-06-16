angular
    .module('app.core')

    .factory('sessionService', sessionService)

    .$inject = ['$firebaseArray', '$q'];

function sessionService($firebaseArray, $q) {

    var service = {
       getSessions : getSessions,
        getSessionsByPresentor : getSessionsByPresentor
    };

    return service;

    function getSessions() {
        return $firebaseArray(new Firebase("https://confion.firebaseio.com/sessions"));
    }

    function getSessionsByPresentor(presenter) {
        var def = $q.defer();
        var sessions = [];
        angular.forEach(presenter.sessions, function(value, key) {
            var sessionRef = new Firebase("https://confion.firebaseio.com/sessions/" + key);
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
