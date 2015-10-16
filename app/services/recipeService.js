(function () {
    angular.module('myApp')
        .factory('recipeService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {

            var posts = {
                recipes: []
            };

            var createEditMode = {
                value: false
            };

            function showHideForm() {
                createEditMode.value = !createEditMode.value;
                return createEditMode;
            }

            function isEdit() {
                return createEditMode;
            }

            function getPosts() {
                return posts;
            }

            function getAll() {

                var deferred = $q.defer();

                $http.get('http://jsonplaceholder.typicode.com/posts/', {cache: true})
                    .then(function (response) {
                        posts.recipes = response.data;
                        localStorageService.set('recipes', JSON.stringify(posts.recipes));
                        deferred.resolve(posts.recipes);
                    }).catch(function (response) {
                        console.log(response);
                        deferred.reject(response);
                    });
                return deferred.promise;
            }

            function save(recipe) {

                posts.recipes = getStoredRecipes();

                if (!posts.recipes) {
                    posts.recipes = [];
                }
                return $http.post('http://jsonplaceholder.typicode.com/posts', recipe)
                    .then(function (response) {
                        posts.recipes.push(response.data);
                        localStorageService.set('recipes', JSON.stringify(posts.recipes));
                        return response.data;
                    }).catch(function (response) {
                        console.log(response);
                    });
            }

            function clearAll() {
                localStorageService.remove('recipes');
            }

            function deleteRecipe(recipe) {
                posts.recipes = getStoredRecipes();
                posts.recipes = posts.recipes.filter(function(obj){
                    return obj.title !== recipe.title;
                });
                localStorageService.set('recipes', JSON.stringify(posts.recipes));
            }

            function isRepeated(value, field) {

                var recipes = getStoredRecipes();

                if(!recipes){
                    return false;
                }
                var recipe = recipes.filter(function(obj){
                   return obj[field] == value;
                });

                return recipe.length > 0;
            }

            function getStoredRecipes() {
                return JSON.parse(localStorageService.get('recipes'));
            }

            return {
                getAll: getAll,
                clearAll: clearAll,
                save: save,
                getPosts: getPosts,
                deleteRecipe: deleteRecipe,
                isRepeated: isRepeated,
                showHideForm: showHideForm,
                isEdit: isEdit
            };
        }]);
})();
