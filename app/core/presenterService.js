angular
    .module('app.core')

    .factory('presenterService', presenterService)

    .$inject = ['$q', 'sessionService', '$firebaseObject'];

function presenterService($q, sessionService, $firebaseObject) {

    var service = {
       getPresenter : getPresenter
    };

    return service;

    function getPresenter(presenterId) {
        var def = $q.defer();
        var presenterRef = new Firebase("https://confion.firebaseio.com/presenters/" + presenterId);
        var presenter = $firebaseObject(presenterRef);
        presenter.$loaded().then(function() {
            var promise = sessionService.getSessionsByPresentor(presenter);
            promise.then(function (sessions) {
                presenter.sessions = sessions;
            });
            def.resolve(presenter);
        });
        return def.promise;
    }
}
