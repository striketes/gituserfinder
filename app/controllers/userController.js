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

            var loader = document.getElementById("user-loader");
            var userInfo = document.getElementById("user-info");
            loader.className = "";
            userInfo.className = "user-info";

            userService.getUser($scope.username).then(function(data){
                loader.className = "user-loader";
                userInfo.className = "";
                $scope.users = data.items;
                console.log($scope.users);
            }).catch(function(response){
                loader.className = "user-loader";
                console.log(response);
            });
        };

        $scope.getProjects = function(user) {

            var loader = document.getElementById("project-loader");
            var projectInfo = document.getElementById("project-info");
            loader.className = "";
            projectInfo.className = "";

            userService.getProjects(user.login).then(function(data){
                loader.className = "project-loader";
                projectInfo.className = "popup-wrapper";
                $scope.projects = data;
                console.log($scope.projects);
            }).catch(function (reject) {
                alert("Not available");
                loader.className = "project-loader";
                console.log(reject);
                return null;
            });
        };
    }]);
}());
