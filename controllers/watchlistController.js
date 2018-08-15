// create the controller and inject Angular's $scope
RatingsApp.controller('WatchlistController', function($scope, $location) {
  $scope.graphData = [];
  if (localStorage.getItem('watchlistData')) {
    var watchlistData = JSON.parse(localStorage.getItem('watchlistData'));
  } else {
    var watchlistData = {};
  }
  var loggedinUser = localStorage.getItem('loggedinUser');

  //creating graphdata of loggedin user
  if (watchlistData[loggedinUser]) {
    $scope.myWatchlistData = watchlistData[loggedinUser];
    createGraphData();
  } else {
    $scope.myWatchlistData = [];
  }

  //Create graphdata as count of all albumids in watchlist object array
  function createGraphData() {
    for (var item in $scope.myWatchlistData) {
      if (findIndexFromId($scope.graphData, 'albumId', $scope.myWatchlistData[item]['albumId']) > -1) {
        $scope.graphData[findIndexFromId($scope.graphData, 'albumId', $scope.myWatchlistData[item]['albumId'])]['count'] += 1;
      } else {
        $scope.graphData.push({ 'albumId': $scope.myWatchlistData[item]['albumId'], 'count': 1 });
      }
    }
  }

  //utility function to find index of element from an array
  function findIndexFromId(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }

  //amcharts data render
  var chart = AmCharts.makeChart("chartdiv", {
    "type": "serial",
    "theme": "light",
    "dataProvider": $scope.graphData,
    "valueAxes": [{
      "gridColor": "#FFFFFF",
      "gridAlpha": 0.2,
      "dashLength": 0
    }],
    "gridAboveGraphs": true,
    "startDuration": 1,
    "graphs": [{
      "balloonText": "[[category]]: <b>[[value]]</b>",
      "fillAlphas": 0.8,
      "lineAlpha": 0.2,
      "type": "column",
      "valueField": "count"
    }],
    "chartCursor": {
      "categoryBalloonEnabled": false,
      "cursorAlpha": 0,
      "zoomable": false
    },
    "categoryField": "albumId",
    "categoryAxis": {
      "gridPosition": "start",
      "gridAlpha": 0,
      "tickPosition": "start",
      "tickLength": 20
    },
    "export": {
      "enabled": true
    }
  });
});