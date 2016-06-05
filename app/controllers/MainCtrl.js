// app/controllers/MainCtrl.js
angular.module('DR_Annotation')
  .controller('MainController', ['$scope', '$state', 'DataService',
    function($scope, $state, DataService) {

      $scope.chapter = "Chapter 8"

      DataService.getChapter()
        .then(function(response) {
          console.log("RESPONSE", response);
        })
        .catch(function (error) {
           console.log("ERROR", error);
        })
      $scope.test = "This is a test of $scope";

}]);
