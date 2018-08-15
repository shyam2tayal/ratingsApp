// create the controller and inject Angular's $scope
RatingsApp.controller('HomeController', function($scope, $location, $http) {
  $scope.dataLoading = true;
  $scope.paginationData = {
    "limit": 24,
    "offset": 0,
    "total_count": 0,
    "pages": []
  };
  if (localStorage.getItem('watchlistData')) {
    var watchlistData = JSON.parse(localStorage.getItem('watchlistData'));
  } else {
    var watchlistData = {};
  }
  var loggedinUser = localStorage.getItem('loggedinUser');

  //API call to fetch all the movies data
  $http.get('https://jsonplaceholder.typicode.com/photos/').then(function(response) {
    $scope.dataLoading = false;
    $scope.moviesData = response['data'];
    $scope.getPaginatedData(1);
  })

  //Create pagination object to slive item according to offset
  $scope.getPaginatedData = function(selectedPage) {
    var start = parseInt((selectedPage - 1) * $scope.paginationData.limit);
    var end = parseInt(selectedPage * $scope.paginationData.limit);
    Object.assign($scope.paginationData, getPager($scope.moviesData.length, selectedPage, $scope.paginationData.limit));
    $scope.paginatedMovies = $scope.moviesData.slice(start, end);
  }

  //Function trigger when add to watch button is clicked
  $scope.add_to_watchlist = function(item) {
    if (watchlistData[loggedinUser]) {
      watchlistData[loggedinUser].push(item);
    } else {
      watchlistData[loggedinUser] = [item];
    }
    alert('Succesfully added to watchlist');
    localStorage.setItem('watchlistData', JSON.stringify(watchlistData));
  }

  //Function to create a range array from start and stop point
  function getRangeArray(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    if (!step) {
      step = stop < start ? -1 : 1;
    }
    let length = Math.max(Math.ceil((stop - start) / step), 0);
    let range = Array(length);
    for (let idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }
    return range;
  }

  //create pagination object using total items and current page
  function getPager(totalItems, currentPage, pageSize) {
    currentPage = currentPage || 1;
    pageSize = pageSize || 10;
    let totalPages = Math.ceil(totalItems / pageSize);
    let startPage, endPage;
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    let pages = getRangeArray(startPage, endPage + 1, null);
    return {
      totalPages: totalPages,
      currentPage: currentPage,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
});