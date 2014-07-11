var app = angular.module('airportApp', ['firebase']);

app.controller('AirportController', ['$scope', 'AirportDelayService', function($scope, airportDelayService) {
    var getAirportData = function(airportCode) {
        $scope.airport = airportDelayService;
        console.log('airport', $scope.airport)
    };

    getAirportData('SLC');

    $scope.getAirport = function(airportCode) {
        // Clear out all old data
        $scope.airport = null;
        getAirportData(airportCode);
    };
}]);

app.factory('AirportDelayService', ['$firebase', function($firebase) {
    var airportsRef = new Firebase("https://publicdata-airports.firebaseio.com/");
    airportsRef.child("SFO").on("value", delayInfo);

    function delayInfo(snapshot) {
        var airport = snapshot.val();
        console.log("Delay: " + airport.delay + " reason: " + airport.status.reason);
    }

    return $firebase(airportsRef);
}]);
