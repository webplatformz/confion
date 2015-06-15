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

SessionController.$inject = ['$routeParams'];
function SessionController($routeParams) {
    var vm = this;
    vm.sessionId = $routeParams.sessionId;;
}
