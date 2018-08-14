// create the module and name it RatingsApp
var RatingsApp = angular.module('RatingsApp', ['ngRoute']);

// configure our routes
RatingsApp.config(function($routeProvider) {
    $routeProvider

      // route for the home page
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      })
  })

  .run(function($rootScope, $location) {
    $rootScope.$on("$locationChangeStart", function(event, next, current) {
      //if user is not loggedin route to loginpage  
      if (!localStorage.getItem('loggedinUser')) {
        $rootScope.isLoggedIn = false;
        $location.path('/');
      } else {
        //if user is logged in
        $rootScope.isLoggedIn = true;
        //If user tried opening login page when already loggedin
        if ($location.url() == '/') {
          $location.path('/home');
        }
      }
    });
  });