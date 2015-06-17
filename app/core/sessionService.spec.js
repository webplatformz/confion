describe("sessionService", function() {

    var sessionService;
    var $rootScope;
    var data = 'data';

    beforeEach(function() {
        module('app.core');

        inject(function(_sessionService_, _$q_, _$rootScope_) {
            sessionService = _sessionService_;
            $rootScope = _$rootScope_;
            var deferred = _$q_.defer();

            deferred.resolve(data);
            spyOn(sessionService, 'getSessionsOrderedByDateTime').and.returnValue(deferred.promise);
        })
    });

    it('should be registered', function() {
        expect(sessionService).toBeDefined();
    });

    it('getSessionsOrderedByDateTime should return data with promise', function() {
        var sessions;
        sessionService.getSessionsOrderedByDateTime().then(function (_sessions_) {
            sessions = _sessions_;
        });
        $rootScope.$apply();
        expect(data).toEqual(sessions);
    });

});