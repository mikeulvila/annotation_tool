// app/controllers/MainCtrl.js
angular.module('DR_Annotation')
  .controller('MainController', ['$scope', '$state', 'DataService',
    function($scope, $state, DataService) {

      $scope.chapterTitle = "Chapter 8"
      $scope.annotatedChapterText = "";
      var originalChapterText = "";
      $scope.annotationArray = [];

      DataService.getChapterText()
        .then(function(chapter) {
          originalChapterText = chapter.data;  //.replace(/\n/g,"<br>");

          DataService.getChapterAnnotations()
            .then(function (response) {
              $scope.annotationArray = response.data.document.span;
              angular.forEach($scope.annotationArray, function (value, index) {
                 var start = parseInt(value.extent.charseq._START) ;
                 var end = parseInt(value.extent.charseq._END) + 1;
                 var subText = originalChapterText.substring(start, end);
                 var anntText = value.extent.charseq.__text;
                 var category = value._category;

                 var hiliteText = '<span class="' + category + '">' + subText + '</span>';
                 $scope.annotatedChapterText += hiliteText;
              });

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
