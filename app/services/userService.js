/**
 * Created by sgomez on 07/10/2015.
 */
(function(){
    angular.module('myApp')
       .factory('userService', ['$http', '$cacheFactory', function($http, $cacheFactory) {

            function getUser(username) {
                var loader = document.getElementById("user-loader");
                var userInfo = document.getElementById("user-info");
                loader.className = "";
                userInfo.className = "user-info";

                return $http.get('https://api.github.com/search/users?q=' + username, {cache:true})
                    .then(function (response) {
                        loader.className = "user-loader";
                        userInfo.className = "";
                        return users;
                    }).catch(function (response) {
                        alert("User not found");
                        loader.className = "user-loader";
                        console.log(response);
                        return response.statusText;
                    });
            }

            function getProjects(username) {
                var loader = document.getElementById("project-loader");
                var projectInfo = document.getElementById("project-info");
                loader.className = "";
                projectInfo.className = "project-info";
                var urlRepos = 'https://api.github.com/users/' + username + '/repos';
                return $http.get(urlRepos, {cache:true})
                    .then(function (response) {
                        loader.className = "project-loader";
                        projectInfo.className = "";
                        user.projects = response.data;
                        return user.projects;
                    }).catch(function (reject) {
                        alert("Not available");
                        loader.className = "project-loader";
                        console.log(reject);
                        return null;
                    }
                );
            }

            return {
                getUser: getUser,
                getProjects: getProjects
            };


       }]);
}());