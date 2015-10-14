(function() {
    angular.module('myApp')
        .directive('showErrors', ['$state', function ($state) {
            return {
                restrict: 'A',
                require: '^form',
                link: function (scope, element, attrs, formCtrl) {
                    var inputEl = element[0].querySelector('[name]');
                    var inputNgEl = angular.element(inputEl);

                    var inputName = inputNgEl.attr('name');
                    var helpText = angular.element(element[0].querySelector('.error-text'));

                    scope.$on('show-error-event', function () {
                        formCtrl[inputName].$invalid;
                        formCtrl[inputName].$setDirty(true);
                    });

                    scope.$on('hide-error-event', function () {
                        $state.reload();
                    });
                }
            }
        }]).directive('uniqueValidator', ['recipeService', function (recipeService) {
            return {
                restrict: 'A',
                require: '^form',
                scope: {
                    unique: '='
                },
                link: function (scope, element, attrs, formCtrl) {
                    var inputName = scope.unique[0].name;
                    var field = element[0].querySelector('[name='+inputName+']');
                    var ngField = angular.element(field);
                    scope.$on('form-submit', function(){
                        //if(recipeService.isRepeated(field.value)){
                            formCtrl[inputName].$setValidity('repeated', !recipeService.isRepeated(field.value));
                            formCtrl[inputName].$setDirty(true);
                        //}
                    });
                }
            }
        }]);
})();