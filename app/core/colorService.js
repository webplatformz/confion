angular
    .module('app.core')

    .factory('colorService', colorService)

function colorService() {

    var service = {
        getColor : getColor,
        getBorderColor : getBorderColor,
        getTextColor : getTextColor
    };

    return service;

    function getColor(category) {
        var colors = {
            "Testing" : "#F5F9FC",
            "Management" : "#FFF7F6",
            "Cloud" : "#FFFCF5",
            "Project Management" : "#F5FCF9",
            "Technology" : "#e9def2"
        };
        return colors[category];
    };

    function getBorderColor(category) {
        var colors = {
            "Testing" : "#99C2E4",
            "Management" : "#FFB1A5",
            "Cloud" : "#FFE499",
            "Project Management" : "#99E4C1",
            "Technology" : "#bf87e5"
        };
        return colors[category];
    };

    function getTextColor(category) {
        var colors = {
            "Testing" : "#06B",
            "Management" : "#F42",
            "Cloud" : "#FB0",
            "Project Management" : "#0B6",
            "Technology" : "#9320e5"
        };
        return colors[category];
    };

}
