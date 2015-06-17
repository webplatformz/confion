angular
    .module('app.core')

    .factory('roomService', roomService)

    .$inject = ['$q'];

function roomService($q) {

    var service = {
       getRoom : getRoom
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
}
