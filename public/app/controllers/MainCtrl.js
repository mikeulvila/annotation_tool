// app/controllers/MainCtrl.js

app.controller('MainController', ['$scope', '$state', '$log', '$sce', 'DataService',
    function($scope, $state, $log, $sce, DataService) {
// *******************************************************
//                $SCOPE VARIABLES
// *******************************************************
      $scope.error;
      $scope.chapterText = "";
      $scope.annotatedChapterText = "";
      $scope.annotationArray;
      $scope.selectChapter;
      $scope.category;
      $scope.newAnnotation;
// *******************************************************
//           DECLARE CONTROLLER FUNCTIONS
// *******************************************************
      function loadChapterAndAnnotations (chapterNumber) {
        DataService.getChapterText(chapterNumber)
          .then(function(chapter) {

            $scope.chapterText = chapter.data;

            DataService.getChapterAnnotations(chapterNumber)
              .then(function (response) {
                $scope.annotatedChapterText = chapter.data;  //.replace(/\n/g,"<br>");
                $scope.annotationArray = response.data.document.span.reverse();
                $scope.annotatedChapterText =
                createAnnotatedChapterText($scope.annotatedChapterText, $scope.annotationArray);
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

      function createAnnotatedChapterText (text, annotations) {
        angular.forEach(annotations, function (value, index) {
          var start = parseInt(value.extent.charseq._START) ;
          var end = parseInt(value.extent.charseq._END) + 1;
          var subText = text.substring(start, end);
          var category = value._category;
          var arrayIndex = index.toString();
          var preText = text.substring(0, start);
          var hiliteText =
          '<span data-index="' + arrayIndex + '" class="' + category + '" pop-up>' + subText + '</span>';
          var postText = text.substring(end);
          text = preText + hiliteText + postText;
        });
        return text;
      }; // end createAnnotatedChapterText

      function getTextSelection (event) {
        var selection = document.getSelection();
        var previousSiblingIndex;
        if (selection.anchorNode.parentElement.previousSibling) {
          previousSiblingIndex = selection.anchorNode.parentElement.previousSibling.attributes[0].value;
        } else {
          previousSiblingIndex = null;
        }
        var rangeContents = selection.getRangeAt(0).cloneContents();
        var start = selection.anchorOffset < selection.focusOffset ? selection.anchorOffset : selection.focusOffset;
        var end = selection.anchorOffset < selection.focusOffset ? selection.focusOffset - 1: selection.anchorOffset - 1;
        var span = document.createElement('span');
        span.appendChild(rangeContents);
        var rangeText = span.innerHTML;
        if (end < start) {
          return;
        };
        return {
          text: rangeText,
          end: end,
          start: start,
          prevIndex: previousSiblingIndex
        };
      }; // end getTextSelection
// *******************************************************
//                $SCOPE FUNCTIONS
// *******************************************************
      $scope.loadChapter = function () {
        $scope.error = false;
        $scope.annotatedChapterText = "";
        loadChapterAndAnnotations($scope.selectChapter);
      };

      $scope.addAnnotation = function () {
        $scope.newAnnotation = getTextSelection();
      };

      // save new annotation to correct index position in annotationArray
      $scope.saveAnnotation = function () {
        var index = parseInt($scope.newAnnotation.prevIndex);
        var prevCharseqEnd;
        var start;
        var end;
        if (index) {
          prevCharseqEnd = parseInt($scope.annotationArray[index].extent.charseq._END);
          start = $scope.newAnnotation.start + prevCharseqEnd + 1;
          end = $scope.newAnnotation.end + prevCharseqEnd + 1;
        } else {
          index = $scope.annotationArray.length;
          start = $scope.newAnnotation.start;
          end = $scope.newAnnotation.end;
        }
        var text = $scope.newAnnotation.text;
        var category = $scope.category;
        var annotationObj = {
                              _category: category,
                              extent: {
                                charseq: {
                                  _END: end.toString(),
                                  _START: start.toString(),
                                  __text: text
                                }
                              }
                            };

        if (category) {
          $scope.annotationArray.splice(index, 0, annotationObj);
        } else {
          $scope.error = { statusText: "Please choose a category" };
        }
        $scope.annotatedChapterText = $scope.chapterText;
        $scope.annotatedChapterText = createAnnotatedChapterText($scope.annotatedChapterText, $scope.annotationArray);
        $scope.newAnnotation = "";
        $scope.category = "";
      }; // end saveAnnotation

      // remove annotation from annotationArray and rerender chapter text
      $scope.delete = function (event) {
        var index = parseInt(event.target.attributes[0].value);
        if (event.target.attributes[0].name === "data-index") {
          $scope.annotatedChapterText = $scope.chapterText;
          $scope.annotationArray.splice(index, 1);
          $scope.annotatedChapterText =
          createAnnotatedChapterText($scope.annotatedChapterText, $scope.annotationArray);
        }
      }; // end delete

      // save JSON formatted version of annotationArray
      $scope.saveJSON = function () {
        var annotationsJSON = angular.toJson($scope.annotationArray.reverse(), true);
        if (annotationsJSON) {
          $log.info(annotationsJSON);
        } else {
          $log.warn('There are no annotations for the current selected chapter.')
        }
      }; // end saveJSON

}]); // end MainCtrl
