'use strict';

angular
    .module('app.sessions', ['app.core'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/sessions/:sessionId', {
        templateUrl: 'session/session.html',
        controller: 'SessionController',
        controllerAs: 'vm'
      });
    }])

    .controller('SessionController', SessionController)

    .$inject = ['$routeParams', '$firebaseObject', 'sessionService'];

function SessionController($routeParams, $firebaseObject, sessionService) {
    var vm = this;
    vm.session = {};

    console.log($routeParams.sessionId);
    var sessionPromise = sessionService.getSession($routeParams.sessionId);
    sessionPromise.then(function(session) {
        vm.session = session;
        console.log(session);
        var roomId = vm.session.room;

        var roomRef = new Firebase("https://confion.firebaseio.com/rooms/" + roomId);
        var room = $firebaseObject(roomRef);
        room.$loaded().then(function () {
            vm.session.room = room;
            vm.session.room.id = roomId;
        });

        var presenterId = vm.session.presenter;
        var presenterRef = new Firebase("https://confion.firebaseio.com/presenters/" + presenterId);
        var presenter = $firebaseObject(presenterRef);
        presenter.$loaded().then(function() {
            vm.session.presenter = presenter;
            vm.session.presenter.id = presenterId;
        });

    }, function(reason) {
        console.log('Error: ' + reason);
    });

}
