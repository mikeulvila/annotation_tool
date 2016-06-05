// app/controllers/MainCtrl.js
angular.module('DR_Annotation')
  .controller('MainController', ['$scope', '$state',
    function($scope, $state) {
      $scope.chapter = "Chapter 8"
      $scope.test = "This is a test of $scope";

}]);
