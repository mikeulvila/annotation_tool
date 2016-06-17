
app.directive('popUp', function($http) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {

        element.bind('mouseover',function(e) {


          element.tooltip({
            title: "click to delete",
            placement: "top"
          }).tooltip('show');

        });
    }
  }
});
