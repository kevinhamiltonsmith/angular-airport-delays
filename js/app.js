var app = angular.module('airportApp', ['firebase']);

app.controller('AirportController', ['$scope', '$firebase', function($scope, $firebase) {
    $scope.getAirportData = function(airportCode) {
        var url = 'https://publicdata-airports.firebaseio.com/';
        $scope.data = $firebase(new Firebase(url + airportCode));
    };
}]);

app.directive('prevent-default', function() {
    return function(scope, element, attrs) {
        $(element).click(function(event) {
            event.preventDefault();
        });
    };
});
