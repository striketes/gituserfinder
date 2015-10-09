(function(){
    angular.module('myApp')
        .factory('recipeService', ['$http', function($http){
            function getAll(){

                var config = {headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Hola-header': 'hola hederererer'
                    }
                };
                $http.get('http://sgomez-recipeadmin.herokuapp.com/api/recipe/', config)
                  .then(function(response){
                      console.log(response.data);
                  });
            }

            return {
                getAll: getAll
            };
        }]);
})();
