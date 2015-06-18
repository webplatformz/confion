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

    .controller('TimelineController', TimelineController)
    .$inject = ['roomService', 'sessionService'];

function TimelineController(roomService, sessionService) {
    var vm = this;
    vm.times = [];
    vm.rooms = [];
    vm.sessionsByRoomViewModel = {};


    var init = function() {
        createSchedule();
    };

    var createSchedule = function() {
        for(var time = 8; time < 19; time++) {
            vm.times.push(time + ":00")
            vm.times.push(time + ":30")
        }
    };

    roomService.getRooms().then(function(rooms) {
       vm.rooms = rooms;
    });

    var sessionsByRoomId = {};
    sessionService.getSessionsOrderedByDateTime().then(function (sessions) {
        angular.forEach(sessions, function (session) {
            if (sessionsByRoomId[session.room] == undefined) {
                sessionsByRoomId[session.room] = [];
            }

            if(session.startTime != "") {
                sessionsByRoomId[session.room].push(session);
            }
        });
    }).then(function() {
        angular.forEach(vm.rooms, function(room) {
            vm.sessionsByRoomViewModel[room.id] = createViewModel(sessionsByRoomId[room.id]);
        });
    });

    var createViewModel = function(sessions) {
        var roomViewModel = [];
        var startTime = new Date(Date.UTC(2015, 8, 24, 8, 0, 0));
        var title = "";
        angular.forEach(sessions, function(session) {
            var sessionDate = new Date(session.startTime);

            if(startTime.getTime() != sessionDate.getTime()) {
                roomViewModel.push({
                    "title": title,
                    "heightPx" : getHeightInPx(startTime, sessionDate)
                });
            }

            // Add session
            var sessionEnd = new Date(sessionDate.getTime() + session.lengthInMinutes * 60000);
            roomViewModel.push({
                "title" : session.title,
                "heightPx": getHeightInPx(sessionDate, sessionEnd)
            });

            startTime = sessionEnd;
        });
        return roomViewModel;
    };

    var getHeightInPx = function(startTime, sessionDate) {
        var differenceMilis = sessionDate - startTime;
        var differenceMinutes = differenceMilis / 1000 / 60;
        var heightPx = differenceMinutes;
        return heightPx;
    };

    init();
}
