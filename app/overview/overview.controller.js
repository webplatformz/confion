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

    .controller('OverviewController', OverviewController);

OverviewController.$inject = ['$firebaseArray'];
function OverviewController($firebaseArray) {
    var vm = this;
    vm.getRandomColor = getRandomColor;

    vm.firebase = new Firebase("https://confion.firebaseio.com/sessions");
    vm.sessions = $firebaseArray(vm.firebase);

    function getRandomColor(index) {
        var colors = ["green", "blue", "red", "purple", "orange"];
        return colors[index % colors.length];
    }
}
