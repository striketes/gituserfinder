(function() {

// Declare app level module which depends on views, and components
  angular.module('myApp', ['ui.router']).
      config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('home', {
              url: '',
              template: '<div ui-view="user-info"></div>'
            })
            .state('home.user-info', {
                url:'/user-info',
                views: {
                    'user-info':{
                        templateUrl:'/AngularJs/Exercices/note_creator/app/views/user/index.html',
                        controller: 'userController'
                    }
                }
            })
            .state('recipe', {
                url: '/recipe',
                template: '<button class="btn btn-primary" ng-click="getAll()">Recipes</button>',
                controller: 'recipeController'
            });
      }]);
}());
