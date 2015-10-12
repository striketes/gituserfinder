(function(){
    angular.module('myApp')
        .controller('recipeController', ['recipeService', '$scope', 'localStorageService', function(recipeService, $scope, localStorageService){
            $scope.posts = recipeService.getPosts();
            $scope.recipe = {};

            $scope.getAll = function(){

                $scope.posts.recipes = JSON.parse(localStorageService.get('recipes'));

                if(!$scope.posts.recipes) {

                    recipeService.getAll().then(function (response) {
                        $scope.posts.recipes = response;
                    }).catch(function (response) {
                        alert('Not found');
                        console.log(response.error);
                    });
                }
            };

            $scope.addNew = function() {

                $scope.posts.recipes = JSON.parse(localStorageService.get('recipes'));

                if(!$scope.posts.recipes){
                    $scope.posts.recipes = [];
                }

                recipeService.save($scope.recipe)
                    .then(function(response){
                        $scope.posts.recipes = JSON.parse(localStorageService.get('recipes'));
                        $scope.recipe = {};
                    }).catch(function(response){
                        alert('The recipe could not be saved');
                    });

            }

            $scope.reset = function() {
                $scope.posts.recipes = [];
                recipeService.reset();
            };

        }]);
})();
