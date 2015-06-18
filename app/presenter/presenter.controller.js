'use strict';

angular
    .module('app.presenters', ['app.core'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/presenters/:presenterId', {
        templateUrl: 'presenter/presenter.html',
        controller: 'PresenterController',
        controllerAs: 'vm'
      });
    }])

    .controller('PresenterController', PresenterController)

    .$inject = ['$routeParams', 'presenterService'];

function PresenterController($routeParams, presenterService) {
    var vm = this;

    presenterService.getPresenter($routeParams.presenterId).then(function(presenter) {
        vm.presenter = presenter;
    });
}
