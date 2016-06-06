// app/controllers/MainCtrl.js
angular.module('DR_Annotation')
  .controller('MainController', ['$scope', '$state', 'DataService',
    function($scope, $state, DataService) {

      $scope.chapterTitle = "Chapter 8"
      $scope.chapterText = "";
      $scope.annotationArray = [];
      var matchCount = 0;

      DataService.getChapterText()
        .then(function(chapter) {
          $scope.chapterText = chapter.data;  //.replace(/\n/g,"<br>");
          $scope.sub = $scope.chapterText.substring(1576, 1585 + 1);

          DataService.getChapterAnnotations()
            .then(function (response) {
              $scope.annotationArray = response.data.document.span;
              angular.forEach($scope.annotationArray, function (value, index) {
                 var start = parseInt(value.extent.charseq._START) ;
                 var end = parseInt(value.extent.charseq._END) + 1;
                 var subText = $scope.chapterText.substring(start, end);
                 var anntText = value.extent.charseq.__text;
                 if (anntText === subText) {
                  matchCount++;
                 } else {
                  console.log('NOT MATCH!!!');
                 }

              });
              console.log("matchCount", matchCount);
              console.log("annotationArray length: ", $scope.annotationArray.length);
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
