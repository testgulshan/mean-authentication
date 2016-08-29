angular.module('meanAuth', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl'
      })
      .otherwise({
        templateUrl: 'views/404.html'
      })
  })

  // home page
  .controller('HomeCtrl', function ($scope) {
    $scope.title = 'MEAN Authentication';
  })

  // login page
  .controller('LoginCtrl', function ($scope) {
    $scope.title = 'Login';
  })

  // signup page
  .controller('SignupCtrl', function ($scope) {
    $scope.title = 'Sign Up';
  })

  // profile page
  .controller('ProfileCtrl', function ($scope, $http) {
    $scope.title = 'Profile';

    $scope.createUser = function () {
      var data = {
        fname: $scope.fname,
        lname: $scope.lname,
        email: $scope.email
      }
      $http.post('/api/users', data)
        .success(function (data) {
          $scope.fname = '';
          $scope.lname = '';
          $scope.email = '';
        })
        .error(function (data, status, header, config) {
          $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;
        });
    }
  })

  // users page
  .controller('UsersCtrl', function ($scope, $http) {
    $scope.title = 'Users';

    $http.get('/api/users')
      .then(function (response) {
        $scope.users = response.data;
      }, function (response) {
        $scope.users = 'Something went wrong';
      })

    $scope.deleteUser = function (id) {
      $http.delete('/api/users/' + id)
        .success(function (data) {
          $scope.users = data;
        })
        .error(function (data) {
          console.log('Error: ' + data);
        });
    }

    $scope.editUser = function (id) {
      $scope.editView = true;
      $http.get('/api/users/' + id)
        .success(function (response) {
          $scope.user = response;
        });
    }

    $scope.updateUser = function (id) {
      var updates = {
        fname: $scope.user.fname,
        lname: $scope.user.lname,
        email: $scope.user.email,
        city: $scope.user.city
      }
      $http.put('/api/users/' + id, updates)
        .success(function (data) {
          $scope.editView = false;
          $scope.user = '';
          $http.get('/api/users')
            .then(function (response) {
              $scope.users = response.data;
            })
        })
        .error(function (data) {
          console.log('Error: ' + data);
        });
    }
  })