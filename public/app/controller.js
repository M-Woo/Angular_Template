angular.module('TempCtrls', ['TempServices'])
.controller('NavCtrl', ['$scope', 'Auth','Alerts','$location', function($scope, Auth, Alerts, $location) {
  $scope.isLoggedIn = Auth.isLoggedIn();
  $scope.logout = function() {
    // to implement
    console.log('before Logout', Auth.getToken());
    Auth.removeToken();
    Alerts.add('success', 'You are now logged out!');
    $location.path('/')
    console.log('after Logout', Auth.getToken());
  };
}])
.controller('SignupCtrl', ['$scope', '$http','$location', function($scope, $http, $location) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userSignup = function() {
    $http.post('/api/users', $scope.user).then(function success(res){
      console.log('successful signup');
      console.log(res);
      $location.path('/');
    }, function error(res){
      console.log('error', res);
    });
  };
}])
.controller('LoginCtrl', ['$scope','$http', '$location', 'Auth','Alerts', function($scope, $http, $location, Auth, Alerts) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userLogin = function() {
    $http.post('/api/auth', $scope.user).then(function success(res){
      console.log('success', res);
      Auth.saveToken(res.data.token);
      Alerts.add('success', 'You are now logged in as ' + res.data.user.email);
      $location.path('/')
    }, function error(res){
      console.log('error', res);
      Alerts.add('error', 'Bad Login Info')
    })
  };
}])
.controller('AlertsCtrl', ['$scope', 'Alerts', function($scope, Alerts){
  $scope.alerts = Alerts.get();
}]);






