'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
  'firebase',
  'ngRoute',
  'app.overview'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/overview'});
}]);
