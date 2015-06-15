'use strict';

angular.module('app.overview', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/overview', {
        templateUrl: 'overview/overview.html',
        controller: 'OverviewController',
        controllerAs: 'vm'
      });
    }])

    .controller('OverviewController', OverviewController);

OverviewController.$inject = ['$firebaseArray'];
function OverviewController($firebaseArray) {
  var vm = this;
    vm.test = 'abc';

  vm.firebase = new Firebase("https://confion.firebaseio.com/session");
  vm.data = $firebaseArray(vm.firebase);
}
