/**
 * Created by sgomez on 07/10/2015.
 */
(function(){
    angular.module('myApp')
       .factory('userService', ['$http', '$cacheFactory', function($http, $cacheFactory) {

            function getUser(username) {

                return $http.get('https://api.github.com/search/users?q=' + username, {cache:true})
                    .then(function (response) {
                        var users = response.data;
                        return users;
                    }).catch(function (response) {
                        alert("User not found");
                        console.log(response);
                        return response.statusText;
                    });
            }

            function getProjects(username) {
                var urlRepos = 'https://api.github.com/users/' + username + '/repos';
                return $http.get(urlRepos, {cache:true})
                    .then(function (response) {
                        var projects = response.data;
                        return projects;
                    }).catch(function (reject) {
                        alert("Not available");
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