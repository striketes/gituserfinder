/**
 * Created by sgomez on 07/10/2015.
 */
(function(){
    angular.module('myApp')
    .controller('userController', ['$scope', 'userService', function($scope, userService){
        $scope.users = [];
        $scope.username = "";
        $scope.projects = [];

        $scope.getUser = function(){
            userService.getUser($scope.username).then(function(data){
                $scope.users = data;
            });
        };

        $scope.getProjects = function(user) {
            userService.getProjects(user.login).then(function(data){
                $scope.projects = data;
            });
        };
    }]);
}());
