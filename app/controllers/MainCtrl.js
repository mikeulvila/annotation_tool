// app/controllers/MainCtrl.js
angular.module('DR_Annotation')
  .controller('MainController', ['$scope', '$state', 'DataService',
    function($scope, $state, DataService) {

      $scope.chapterTitle = "Chapter 8"
      $scope.chapterText = "";

      DataService.getChapter()
        .then(function(chapter) {
          $scope.chapterText = chapter.data;  //.replace(/\n/g,"<br>");
          $scope.sub = $scope.chapterText.substring(45, 54 + 1);

          DataService.getAnnotations()
            .then(function (data) {
               console.log('annotations', data);
            })
            .catch(function (error) {
               console.log("ERROR", error);
            });
        })
        .catch(function (error) {
           console.log("ERROR", error);
        });

      $scope.selectText = function (event) {
        var selection = document.getSelection();
        var start = selection.anchorOffset < selection.focusOffset ? selection.anchorOffset : selection.focusOffset;
        var end = selection.anchorOffset < selection.focusOffset ? selection.focusOffset - 1: selection.anchorOffset - 1;
        console.log('Selection', selection, start, end); // also think about getRangeAt(0) or createRange()
      }



}]);
