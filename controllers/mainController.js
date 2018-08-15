// create the controller and inject Angular's $scope
RatingsApp.controller('MainController', function($scope, $location) {
  //logout user and reload to route to respective login page
  $scope.logout = function() {
    localStorage.removeItem('loggedinUser');
    location.reload();
  }
});