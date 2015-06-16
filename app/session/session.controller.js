'use strict';

angular
    .module('app.sessions', ['app.core'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/sessions/:sessionId', {
        templateUrl: 'session/session.html',
        controller: 'SessionController',
        controllerAs: 'vm'
      });
    }])

    .controller('SessionController', SessionController);

SessionController.$inject = ['$routeParams', '$firebaseObject', '$scope'];
function SessionController($routeParams, $firebaseObject, $scope) {
    var vm = this;
    vm.session = {};


    var sessionId = $routeParams.sessionId;
    var sessionRef = new Firebase("https://confion.firebaseio.com/sessions/" + sessionId);
    vm.session = $firebaseObject(sessionRef);

    vm.session.$loaded()
        .then(function() {
            var presenterRef = new Firebase("https://confion.firebaseio.com/presenters");
            sessionRef.child(sessionId).once('value', function(sessionSnap) {
                presenterRef.child(vm.session.presenter).once('value', function(presenterSnap) {
                    $scope.$apply(function() {
                        vm.session.presenter = presenterSnap.val();
                    });

                    console.log(vm.session.presenter.name);
                });
            });
        })
        .catch(function(err) {
            console.error(err);
        });


}
