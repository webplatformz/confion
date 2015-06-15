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

SessionController.$inject = ['$routeParams', '$firebaseArray', '$firebaseObject'];

function SessionController($routeParams, $firebaseArray, $firebaseObject) {
    var vm = this;
    vm.session = {};

    
    var sessionId = $routeParams.sessionId;
    var firebase = new Firebase("https://confion.firebaseio.com/session/" + vm.sessionId);
    vm.session = $firebaseObject(firebase);

}
