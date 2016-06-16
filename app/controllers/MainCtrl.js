// app/controllers/MainCtrl.js
angular.module('DR_Annotation')
  .controller('MainController', ['$scope', '$state', '$log', '$sce', 'DataService',
    function($scope, $state, $log, $sce, DataService) {

      $scope.error;
      $scope.annotateMode = false;
      $scope.chapterText = "";
      $scope.annotatedChapterText = "";
      $scope.annotationArray;
      $scope.selectChapter;

      $scope.loadChapter = function () {
        loadChapterAndAnnotations($scope.selectChapter);
      };

      $scope.save = function () {
        var annotationsJSON = angular.toJson($scope.annotationArray, true);
        if (annotationsJSON) {
          $log.info(annotationsJSON);
        } else {
          $log.warn('There are no annotations for the current selected chapter.')
        }
      };

      function loadChapterAndAnnotations (chapterNumber) {

        DataService.getChapterText(chapterNumber)
          .then(function(chapter) {

            $scope.chapterText = chapter.data;

            DataService.getChapterAnnotations(chapterNumber)
              .then(function (response) {

                $scope.annotatedChapterText = chapter.data;  //.replace(/\n/g,"<br>");
                $scope.annotationArray = response.data.document.span.reverse();

                angular.forEach($scope.annotationArray, function (value, index) {
                   var start = parseInt(value.extent.charseq._START) ;
                   var end = parseInt(value.extent.charseq._END) + 1;
                   var subText = $scope.annotatedChapterText.substring(start, end);
                   var category = value._category;
                   var arrayIndex = index.toString();
                   var preText = $scope.annotatedChapterText.substring(0, start);
                   var hiliteText = '<span id="' + arrayIndex + '" class="' + category + '">' + subText + '</span>';
                   var postText = $scope.annotatedChapterText.substring(end);

                   $scope.annotatedChapterText = preText + hiliteText + postText;
                });

                $scope.annotatedChapterText = $sce.trustAsHtml($scope.annotatedChapterText);
                $scope.annotationArray.reverse();

              })
              .catch(function (error) {
                $scope.error = error;
                $log.error(error.status, error.statusText);
              });

          })
          .catch(function (error) {
             $scope.error = error;
             $log.error(error.status, error.statusText);
          });


      }; // end loadChapterAndAnnotations function

      $scope.selectText = function (event) {
        var selection = document.getSelection();
        var start = selection.anchorOffset < selection.focusOffset ? selection.anchorOffset : selection.focusOffset;
        var end = selection.anchorOffset < selection.focusOffset ? selection.focusOffset - 1: selection.anchorOffset - 1;
        console.log('Selection', selection, start, end); // also think about getRangeAt(0) or createRange()
      };


}]);
