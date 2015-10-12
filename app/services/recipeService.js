(function(){
    angular.module('myApp')
        .factory('recipeService', ['$http', '$q', 'localStorageService', function($http, $q, localStorageService){

            var posts = {
                recipes: []
            };

            function getPosts() {
                return posts;
            }

            function getAll(){

                var defered = $q.defer();

                $http.get('http://jsonplaceholder.typicode.com/posts/', {cache:true})
                    .then(function (response) {
                        posts.recipes = response.data;
                        localStorageService.set('recipes', JSON.stringify(posts.recipes));
                        defered.resolve(posts.recipes);
                    }).catch(function(response){
                        console.log(response);
                        defered.reject(response);
                    });
                return defered.promise;
            }

            function save(recipe){

                posts.recipes = JSON.parse(localStorageService.get('recipes'));

                if(!posts.recipes){
                    posts.recipes = [];
                }
                $http.post('http://jsonplaceholder.typicode.com/posts', recipe)
                    .then(function(response){
                        posts.recipes.push(response.data);
                        localStorageService.set('recipes', JSON.stringify(posts.recipes));
                    }).catch(function(response){
                        console.log(response);
                    });
            }

            function reset() {
                localStorageService.remove('recipes');
            }

            return {
                getAll: getAll,
                reset: reset,
                save: save,
                getPosts: getPosts
            };
        }]);
})();
