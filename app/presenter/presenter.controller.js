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
    var presenterRef = new Firebase("https://confion.firebaseio.com/presenters/" + presenterId);

    presenterRef.once('value', function(presenterSnapshot) {
        var sessions = [];
        vm.presenter = presenterSnapshot.val();
        angular.forEach(vm.presenter.sessions, function(value, key) {
            var sessionRef = new Firebase("https://confion.firebaseio.com/sessions/" + key);
            sessionRef.once('value', function(sessionSnapshot) {
                var session = {};
                session.key = key;
                session.title = sessionSnapshot.val().title;
                sessions.push(session);
            });
        });
        vm.presenter.sessions = sessions;
    });

    /*vm.presenter = $firebaseObject(presenterRef);

    vm.presenter.$loaded().then(function () {
       angular.forEach(vm.presenter.sessions, function(value, key) {
           var sessionRef = new Firebase("https://confion.firebaseio.com/sessions/" + key);
           vm.presenter.sessions.
           title = $firebaseObject(sessionRef);
        })
    });*/
}
