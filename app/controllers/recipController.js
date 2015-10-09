(function(){
    angular.module('myApp')
        .controller('recipeController', ['recipeService', '$scope', function(recipeService, $scope){

            $scope.recipes = [];

            $scope.getAll = function(){
                recipeService.getAll();
            }

        }]);
})();
