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

    .$inject = ['$routeParams', 'sessionService', 'presenterService', 'roomService', 'authService', '$firebaseArray', 'userService'];

function SessionController($routeParams, sessionService, presenterService, roomService, authService, $firebaseArray, userService) {
    var vm = this;

    vm.session = {};

    vm.attend = function () {
        var userId = authService.getCurrentUser().uid;
        userService.getUser(userId).then(function (user) {
            var list = $firebaseArray(new Firebase('https://confion.firebaseio.com/sessions/' + $routeParams.sessionId + '/attendees'));
            list.$add(user);
            console.log(userId);
            vm.session.attendees = list;
        });
    };

    sessionService.getSession($routeParams.sessionId).then(function(session) {
        vm.session = session;
        var roomId = vm.session.room;
        roomService.getRoom(roomId).then(function (room) {
            vm.session.room = room;
        });

        var presenterId = vm.session.presenter;
        presenterService.getPresenter(presenterId).then(function (presenter) {
            vm.session.presenter = presenter;
        });

    }, function(reason) {
        console.log('Error: ' + reason);
    });

}
