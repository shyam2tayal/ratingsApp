RatingsApp.controller('LoginController', function($scope, $location, $rootScope) {

  //Have to make isLoggedin true based on succesful username password match
  $scope.model = {};
  var loginCredentials = [{
    'username': 'shyam',
    'password': 'shyam@123'
  }, {
    'username': 'garvit',
    'password': 'garvit@123'
  }]

  $scope.login = function() {
    var searchIn = false;
    //Check for both fields to be required
    if ($scope.model['username'] && $scope.model['password']) {
      //Check whether submitted username or password match with credentials
      for (var item in loginCredentials) {
        if (loginCredentials[item]['username'] == $scope.model['username']) {
          searchIn = true;
          if (loginCredentials[item]['password'] == $scope.model['password']) {
            $rootScope.isLoggedIn = true;
            localStorage.setItem('loggedinUser', loginCredentials[item]['username']);
            $location.path('/home');
            $scope.error = null;
          } else {
            $scope.error = 'username or password is incorrect';
          }
        }
      }
      if (searchIn == false) {
        $scope.error = 'username or password is incorrect';
      }
    } else {
      $scope.error = 'Both fields are required';
    }
  }

});