// app/controllers/MainCtrl.js
angular.module('DR_Annotation')
  .controller('MainController', ['$scope', '$state', 'DataService',
    function($scope, $state, DataService) {

      $scope.error;
      $scope.annotatedChapterText = "";
      var originalChapterText = "";
      $scope.annotationArray = [];
      $scope.selectChapter;

      $scope.loadChapter = function () {
        loadChapterAndAnnotations($scope.selectChapter);
      }

      function loadChapterAndAnnotations (chapterNumber) {

        DataService.getChapterText(chapterNumber)
          .then(function(chapter) {
            $scope.annotatedChapterText = chapter.data;  //.replace(/\n/g,"<br>");

            DataService.getChapterAnnotations(chapterNumber)
              .then(function (response) {

                $scope.annotationArray = response.data.document.span.reverse();

                angular.forEach($scope.annotationArray, function (value, index) {
                   var start = parseInt(value.extent.charseq._START) ;
                   var end = parseInt(value.extent.charseq._END) + 1;
                   var subText = $scope.annotatedChapterText.substring(start, end);
                   var category = value._category;
                   var preText = $scope.annotatedChapterText.substring(0, start);
                   var hiliteText = '<span class="' + category + '">' + subText + '</span>';
                   var postText = $scope.annotatedChapterText.substring(end);

                   $scope.annotatedChapterText = preText + hiliteText + postText;

                });

                $scope.annotationArray.reverse();

              })
              .catch(function (error) {
                $scope.error = error;
              });
          })
          .catch(function (error) {
             $scope.error = error;
             console.log("ERROR", error);
          });
      } // end loadChapterAndAnnotations function

      $scope.selectText = function (event) {
        var selection = document.getSelection();
        var start = selection.anchorOffset < selection.focusOffset ? selection.anchorOffset : selection.focusOffset;
        var end = selection.anchorOffset < selection.focusOffset ? selection.focusOffset - 1: selection.anchorOffset - 1;
        console.log('Selection', selection, start, end); // also think about getRangeAt(0) or createRange()
      }



}]);
