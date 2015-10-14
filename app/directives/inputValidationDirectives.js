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

                    scope.$on('show-error-event', function () {
                        formCtrl[inputName].$invalid;
                        formCtrl[inputName].$setDirty(true);
                    });

                    scope.$on('hide-error-event', function () {
                        alert(1);
                        $state.reload();
                    });
                }
            }
        }]).directive('uniqueValidator', ['recipeService', function (recipeService) {
            return {
                restrict: 'A',
                require: '^form',
                scope: {},
                link: function (scope, element, attrs, formCtrl) {
                    var ngField = angular.element(element);
                    var inputName = ngField.attr('name');

                    scope.$on('show-error-event', function(){
                        formCtrl[inputName].$setValidity('repeated', !recipeService.isRepeated(formCtrl[inputName].$modelValue));
                        formCtrl[inputName].$setDirty(true);
                    });
                }
            }
        }]);
})();