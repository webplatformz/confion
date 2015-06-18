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

    .$inject = ['sessionService', 'colorService'];

function OverviewController(sessionService, colorService) {
    var vm = this;

    vm.getColor = colorService.getColor;
    vm.getTextColor = colorService.getTextColor;
    vm.getBorderColor = colorService.getBorderColor;

    sessionService.getSessions().then(function(sessions) {
        vm.sessions = sessions;
    });
}
