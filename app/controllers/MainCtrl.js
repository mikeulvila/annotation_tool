// app/controllers/MainCtrl.js
angular.module('DR_Annotation')
  .controller('MainController', ['$scope', '$state', 'DataService',
    function($scope, $state, DataService) {

      $scope.chapterTitle = "Chapter 8"
      $scope.chapterText = "";

      DataService.getChapter()
        .then(function(chapter) {
          console.log("Chapter", chapter);
          $scope.chapterText = chapter.data.replace(/\n/g,"<br>");
        })
        .catch(function (error) {
           console.log("ERROR", error);
        })


}]);
