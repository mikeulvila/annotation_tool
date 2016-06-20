// public/app/services/UserService.js

app.factory('DataService', ['$http',
        function($http, $state) {

          return {
              // get .txt file
              getChapterText: function(chapterNumber) {
                return $http.get('server/ch' + chapterNumber + '.txt');
              },
              // get .xml file
              getChapterAnnotations: function(chapterNumber) {
                return $http.get('server/ch' + chapterNumber + '.txt.xml');
              }

          };
}]);
