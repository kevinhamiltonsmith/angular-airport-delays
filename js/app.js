var app = angular.module('airportApp', ['firebase']);

app.controller('AirportController', ['$scope', '$firebase', function($scope, $firebase) {
    // Get data for a single airport
    $scope.getAirportData = function(airportCode) {
        var url = 'https://publicdata-airports.firebaseio.com/';
        $scope.data = $firebase(new Firebase(url + airportCode));
    };

    // Get all airport data
    $scope.getAllAirports = function() {
        var airportsObj = $firebase(new Firebase('https://publicdata-airports.firebaseio.com/'));
        $scope.airports = [];

        // Convert Firebase object into an array of objects, so angular filter will work
        airportsObj.$on('loaded', function() {
            var keys = airportsObj.$getIndex();
            angular.forEach(keys, function(key) {
                if (key !== '_credits' && key !== '_updated') {
                    $scope.airports.push(airportsObj[key]);
                }
            });
        });
    };

    // More info click handler
    $scope.selected = null;
    $scope.moreInfo = function(airportCode, e) {
        e.preventDefault();
        var $expandedWrap = $(e.target).closest('.single-airport-wrap').find('.expanded-wrap');
        if ($expandedWrap.hasClass('expanded')) {
            $scope.selected = null;
        } else {
            $scope.selected = airportCode;
        }
    };
}]);
