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

    .$inject = ['$routeParams', 'presenterService', 'sessionService'];

function PresenterController($routeParams, presenterService, sessionService) {
    var vm = this;

    var presenterPromise = presenterService.getPresenter($routeParams.presenterId);
    presenterPromise.then(function(presenter) {
        vm.presenter = presenter;
        console.log(presenter);
    }, function(reason) {
        console.log('Error: ' + reason);
    });
}
