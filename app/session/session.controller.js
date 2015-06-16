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

SessionController.$inject = ['$routeParams', '$firebaseObject', '$scope'];
function SessionController($routeParams, $firebaseObject, $scope) {
    var vm = this;
    vm.session = {};


    var sessionId = $routeParams.sessionId;
    var sessionRef = new Firebase("https://confion.firebaseio.com/sessions/" + sessionId);
    vm.session = $firebaseObject(sessionRef);

    vm.session.$loaded()
        .then(function() {
            var roomRef = new Firebase("https://confion.firebaseio.com/rooms/" + vm.session.room);
            var room = $firebaseObject(roomRef);
            room.$loaded().then(function() {
               vm.session.room = room;
            });

            var presenterRef = new Firebase("https://confion.firebaseio.com/presenters/" + vm.session.presenter);
            var presenter = $firebaseObject(presenterRef);
            presenter.$loaded().then(function() {
                vm.session.presenter = presenter;
            });
        })
        .catch(function(err) {
            console.error(err);
        });


}
