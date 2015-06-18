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

    vm.getColor = getColor;

    sessionService.getSessions().then(function(sessions) {
        vm.sessions = sessions;
    });

    function getColor(category) {
        var colours = {
            "Testing" : "#D8502B",
            "Management" : "#297BED",
            "Cloud" : "#00A300",
            "Project Management" : "#853B80",
            "Technology" : "#0099AC"
        };
        return colours[category];
    }
}
