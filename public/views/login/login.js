app.controller('LoginCtrl', function ($scope, $http, $rootScope, $location) {
  $scope.title = 'Login';
  $scope.login = function (user) {
    console.log(user);
    $http.post('/login', user)
      .success(function (user) {
        console.log(user);
        $rootScope.currentUser = user;
        $location.url('/profile');
      });
  };
});