app.controller('ProfileCtrl', function ($scope, $rootScope, $http) {
  $scope.title = 'Profile';
  $http.get('/rest/users')
    .success(function (users) {
      $scope.users = users;
    });
});