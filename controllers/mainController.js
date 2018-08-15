// create the controller and inject Angular's $scope
RatingsApp.controller('MainController', function($scope, $location) {
 	$scope.logout = function() {
 	  localStorage.removeItem('loggedinUser');
 	  location.reload();
 	}
});