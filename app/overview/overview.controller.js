'use strict';

angular.module('myApp.overview', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/overview', {
    templateUrl: 'overview/overview.html',
    controller: 'OverviewCtrl'
  });
}])

.controller('OverviewCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
  $scope.test = "blub";

  var ref = new Firebase("https://confion.firebaseio.com/session");

  $scope.data = $firebaseArray(ref);
}]);