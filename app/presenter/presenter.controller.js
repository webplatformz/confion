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
        var sessionPromise = sessionService.getSessionsByPresentor(presenter);
        sessionPromise.then(function(sessions) {
            vm.presenter.sessions = sessions;
        }, function(reason) {
            console.log('Error: ' + reason);
        })
    }, function(reason) {
        console.log('Error: ' + reason);
    });
}
