angular
    .module('app.core')

    .factory('presenterService', presenterService)

    .$inject = ['$q'];

function presenterService($q) {

    var service = {
       getPresenter : getPresenter
    };

    return service;

    function getPresenter(presenterId) {
        var def = $q.defer();
        var presenterRef = new Firebase("https://confion.firebaseio.com/presenters/" + presenterId);
        presenterRef.once('value', function(presenterSnapshot) {
            var sessions = [];
            var presenter = presenterSnapshot.val();
            angular.forEach(presenter.sessions, function(value, key) {
                var sessionRef = new Firebase("https://confion.firebaseio.com/sessions/" + key);
                sessionRef.once('value', function(sessionSnapshot) {
                    var session = {};
                    session.key = key;
                    session.title = sessionSnapshot.val().title;
                    sessions.push(session);
                });
            });
            presenter.sessions = sessions;
            def.resolve(presenter);
        });
        return def.promise;
    }
}
