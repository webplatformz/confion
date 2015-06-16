'use strict';

angular
    .module('app.overview', ['app.core'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/overview', {
            templateUrl: 'overview/overview.html',
            controller: 'OverviewController',
            controllerAs: 'vm'
        });
    }])

    .controller('OverviewController', OverviewController)

    .$inject = ['sessionService'];

function OverviewController(sessionService) {
    var vm = this;

    vm.getRandomColor = getRandomColor;
    vm.sessions = sessionService.getSessions();

    function getRandomColor(index) {
        var colors = ["green", "blue", "red", "purple", "orange"];
        return colors[index % colors.length];
    }
}
