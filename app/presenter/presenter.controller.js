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

    .controller('PresenterController', PresenterController);

PresenterController.$inject = ['$routeParams', '$firebaseObject'];
function PresenterController($routeParams, $firebaseObject) {
    var vm = this;

    var presenterId = $routeParams.presenterId;
    var firebase = new Firebase("https://confion.firebaseio.com/presenters/" + presenterId);
    vm.presenter = $firebaseObject(firebase);

}
