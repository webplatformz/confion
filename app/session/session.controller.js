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
    var firebase = new Firebase("https://confion.firebaseio.com/sessions/" + sessionId);
    vm.session = $firebaseObject(firebase);

}
