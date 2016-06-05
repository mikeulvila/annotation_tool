angular.module('DR_Annotation', ['ui.router', 'ngSanitize'])

  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'templates/home.html',
            controller: 'MainController'
        })

      // For any unmatched url, redirect to /
      $urlRouterProvider.otherwise('/');

    }
]);
