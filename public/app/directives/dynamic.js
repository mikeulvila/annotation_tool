app.directive('dynamic', function ($compile) {
  return {
    restrict: 'A',

    link: function (scope, element, attr) {
      scope.$watch(attr.ngBindHtml, function(html) {
        element.html(html);
        $compile(element.contents())(scope);
      });
    }
  };
});
