'use strict';

angular
    .module('app.timeline', ['app.core'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/timeline', {
        templateUrl: 'timeline/timeline.html',
        controller: 'TimelineController',
        controllerAs: 'vm'
      });
    }])

    .controller('TimelineController', TimelineController);

function TimelineController() {
    var vm = this;

}
