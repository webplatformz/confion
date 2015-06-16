'use strict';

angular
    .module('app.timeline', ['app.core'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/timeline', {
        templateUrl: 'timeline/timeline.html',
        controller: 'TimelineController',
        controllerAs: 'vm'
      });
    }])

    .controller('TimelineController', TimelineController);

function TimelineController($firebaseArray) {
    var vm = this;
    vm.times = [];
    vm.rooms = [0, 1, 2, 3, 4]


    var sessions = [
        {
            title: "session 1",
            lengthInMinutes: 60,
            startTime: "2015-09-24T09:30:00.000Z",
            room: 0
        },
        {
            title: "session 2",
            lengthInMinutes: 60,
            startTime: "2015-09-24T10:45:00.000Z",
            room: 0
        },
        {
            title: "session 3",
            lengthInMinutes: 120,
            startTime: "2015-09-24T14:30:00.000Z",
            room: 0
        }
    ];

    var getHeightInPx = function(startTime, sessionDate) {
        var differenceMilis = sessionDate - startTime;
        var differenceMinutes = differenceMilis / 1000 / 60;
        var heightPx = differenceMinutes;
        return heightPx;
    };

    var init = function() {
        for(var time = 8; time < 19; time++) {
            vm.times.push(time + ":00")
            vm.times.push(time + ":30")
        }

        var room1 = [];
        var startTime = new Date(Date.UTC(2015, 8, 24, 8, 0, 0));
        var title = "";
        angular.forEach(sessions, function(session) {
            var sessionDate = new Date(session.startTime);

            if(startTime.getTime() != sessionDate.getTime()) {
                room1.push({
                    "title": title,
                    "heightPx" : getHeightInPx(startTime, sessionDate)
                });
            }

            // Add session
            var sessionEnd = new Date(sessionDate.getTime() + session.lengthInMinutes * 60000);
            room1.push({
               "title" : session.title,
                "heightPx": getHeightInPx(sessionDate, sessionEnd)
            });

            startTime = sessionEnd;
        });

        vm.sessionsByRoom = function(room) {
            return room1;
        };
    };


    init();
}
