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

    .$inject = ['$routeParams', 'sessionService', 'presenterService', 'roomService'];

function SessionController($routeParams, sessionService, presenterService, roomService) {
    var vm = this;
    vm.session = {};

    var sessionPromise = sessionService.getSession($routeParams.sessionId);
    sessionPromise.then(function(session) {
        vm.session = session;
        var roomId = vm.session.room;
        var roomPromise = roomService.getRoom(roomId);
        roomPromise.then(function (room) {
            vm.session.room = room;
        });

        var presenterId = vm.session.presenter;
        var promise = presenterService.getPresenter(presenterId);
        promise.then(function (presenter) {
            vm.session.presenter = presenter;
        });

    }, function(reason) {
        console.log('Error: ' + reason);
    });

}
