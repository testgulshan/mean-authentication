var app = angular.module('meanAuth', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl'
    })
    .when('/login', {
      templateUrl: 'views/login/login.html',
      controller: 'LoginCtrl'
    })
    .when('/register', {
      templateUrl: 'views/register/register.html',
      controller: 'RegisterCtrl'
    })
    .when('/profile', {
      templateUrl: 'views/profile/profile.html',
      controller: 'ProfileCtrl',
      resolve: {
        logincheck: checkLoggedin
      }
    })
    .otherwise({
      templateUrl: 'views/404.html'
    })
});

// home page
app.controller('HomeCtrl', function ($scope) {
  $scope.title = 'MEAN Authentication';
});

// check if user loggedin
var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
  var deferred = $q.defer();

  $http.get('/loggedin')
    .success(function (user) {
      $rootScope.errorMessage = null;
      if(user !== '0') {                    // user is Authenticated
        $rootScope.currentUser = user;
        deferred.resolve();
      } else {                              // user is not Authenticated
        $rootScope.errorMessage = 'You need to log in';
        deferred.reject();
        $location.url('/login');
      }
    });
  return deferred.promise;
}

app.controller('NavCtrl', function ($rootScope, $scope, $http, $location) {
  $scope.logout = function () {
    $http.post('/logout')
      .success(function () {
        $rootScope.currentUser = null;
        $location.url('/');
      })
  }
})