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

    vm.attend = function () {
        /*var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
        var authData = ref.getAuth();
        if (authData) {
            console.log("Authenticated user with uid:", authData.uid);
        }*/
    };

    vm.session = {};

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
