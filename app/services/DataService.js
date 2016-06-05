// public/app/services/UserService.js
angular.module('DR_Annotation')
    .factory('DataService', ['$http',
        function($http, $state) {

          return {
              // get .txt file
              getChapterText: function() {
                return $http.get('server/ch08.txt');
              },
              // get .xml file
              getChapterAnnotations: function() {
                return $http.get('server/ch08.txt.xml');
              }

          };
}]);
