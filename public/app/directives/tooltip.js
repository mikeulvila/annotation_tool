
app.directive('popUp', function($http) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {

        element.bind('mouseover',function(e) {

          var title = attr.class;

          element.tooltip({
            html: true,
            title: "Category: " + title + "<br>Click to delete",
            placement: "top"
          }).tooltip('show');

        });
    }
  }
});
