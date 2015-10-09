/**
 * Created by sgomez on 09/10/2015.
 */
(function(){
    angular.module('myApp')
        .directive('userInfo', function(){
            return {
                restrict: 'E',
                templateUrl: '/AngularJs/Exercices/note_creator/app/views/user/directives/userInfo.html',
            };
        })
        .directive('projectList', function(){
            return {
                restrict: 'E',
                templateUrl: '/AngularJs/Exercices/note_creator/app/views/user/directives/projectList.html'
            };
        }).directive('logScope', function(){
            return {
                restrict: 'A',
                link: function(scope, element, attrs){
                    console.log(scope);
                    console.log(element);
                    console.log(attrs);
                }
            }
        });
})();