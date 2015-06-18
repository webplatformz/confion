angular
    .module('app.core')

    .factory('colorService', colorService)

function colorService() {

    var service = {
        getColor : getColor
    };

    return service;

    function getColor(category) {
        var colors = {
            "Testing" : "#D8502B",
            "Management" : "#297BED",
            "Cloud" : "#00A300",
            "Project Management" : "#853B80",
            "Technology" : "#0099AC"
        };
        return colors[category];
    };

}
