'use strict';

angular.module('myApp.views', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/views', {
    templateUrl: 'user/index.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function() {

}]);