angular.module('DR_Annotation', ['ui.router', 'ngSanitize', 'xml'])

  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider) {

      $httpProvider.interceptors.push('xmlHttpInterceptor');

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
