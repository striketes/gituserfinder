(function () {

// Declare app level module which depends on views, and components
    angular.module('myApp', ['ui.router', 'LocalStorageModule', 'ngRoute']).
        config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('home', {
                    url: '',
                    template: '<h1>Wellcome</h1><div ui-view="user-info"></div>'
                })
                .state('home.user-info', {
                    url: '/user-info',
                    views: {
                        'user-info': {
                            templateUrl: '/AngularJs/Exercices/note_creator/app/views/user/index.html',
                            controller: 'userController'
                        }
                    }
                })
                .state('recipe', {
                    url: '/recipe',
                    abstract: true,
                    templateUrl: '/AngularJs/Exercices/note_creator/app/views/recipe/recipe-list.html',
                    controller: 'recipeController'
                })
                .state('recipe.add', {
                    url: '/add',
                    templateUrl: '/AngularJs/Exercices/note_creator/app/views/recipe/form.html',
                    controller: 'recipeController'
                });
        }]);
}());
