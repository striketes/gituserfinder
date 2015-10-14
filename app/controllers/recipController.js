(function () {
    angular.module('myApp')
        .controller('recipeController', ['recipeService', '$scope', 'localStorageService', function (recipeService, $scope, localStorageService) {
            $scope.posts = recipeService.getPosts();
            $scope.recipe = {};
            $scope.unique = [
                {
                    name: 'title'
                }
            ];

            $scope.getAll = function () {

                $scope.posts.recipes = JSON.parse(localStorageService.get('recipes'));

                if (!$scope.posts.recipes) {

                    recipeService.getAll().then(function (response) {
                        $scope.posts.recipes = response;
                    }).catch(function (response) {
                        alert('Not found');
                        console.log(response.error);
                    });
                }
            };

            $scope.addNew = function (recipeForm) {

                $scope.$broadcast('form-submit');
                $scope.$broadcast('show-error-event');

                if(!recipeForm.$valid) {
                    return;
                }

                $scope.posts.recipes = JSON.parse(localStorageService.get('recipes'));

                if (!$scope.posts.recipes) {
                    $scope.posts.recipes = [];
                }

                recipeService.save($scope.recipe)
                    .then(function (response) {
                        $scope.posts.recipes = JSON.parse(localStorageService.get('recipes'));
                        $scope.recipe = {};
                        $scope.$broadcast('hide-error-event');
                    }).catch(function (response) {
                        alert('The recipe could not be saved');
                    });
            }

            $scope.reset = function() {
                $scope.$broadcast('hide-error-event');
            };

            $scope.delete = function(recipe) {
                recipeService.deleteRecipe(recipe);
                $scope.posts.recipes = JSON.parse(localStorageService.get('recipes'));
            }

            $scope.clearAll = function () {
                $scope.posts.recipes = [];
                recipeService.clearAll();
            };

        }]);
})();
