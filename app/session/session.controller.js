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

    .controller('SessionController', SessionController);

SessionController.$inject = ['$routeParams', '$firebaseObject'];
function SessionController($routeParams, $firebaseObject) {
    var vm = this;
    vm.session = {};


    var sessionId = $routeParams.sessionId;
    var sessionRef = new Firebase("https://confion.firebaseio.com/sessions/" + sessionId);
    vm.session = $firebaseObject(sessionRef);

    vm.session.$loaded()
        .then(function() {
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
        })
        .catch(function(err) {
            console.error(err);
        });


}
