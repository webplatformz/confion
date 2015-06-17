angular
    .module('app.core')

    .factory('roomService', roomService)

    .$inject = ['$q'];

function roomService($q) {

    var service = {
       getRoom : getRoom,
       getRooms : getRooms
    };

    return service;

    function getRoom(roomId) {
        var def = $q.defer();
        var roomRef = new Firebase("https://confion.firebaseio.com/rooms/" + roomId);
        roomRef.once('value', function (roomSnapshot) {
            def.resolve(roomSnapshot.val());
        });
        return def.promise;
    }

    function getRooms() {
        var def = $q.defer();
        var roomRef = new Firebase("https://confion.firebaseio.com/rooms/");
        roomRef.once('value', function (roomsSnapshot) {
            def.resolve(roomsSnapshot.val());
        });
        return def.promise;
    }
}
