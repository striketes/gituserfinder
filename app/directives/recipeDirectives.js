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
                    'unique-validator': "="
                },
                link: function (scope, element, attrs) {
                    console.log(scope.uniqFields);
                    var field = element.querySelector('[name='+scope.uniqFields[0]+']');
                    scope.$on('form-submit', function(){
                        if(recipeService.isRepeated(field.val())){
                            element[inputName].$invalid;
                            element[inputName].$setDirty(true);
                        }
                    });
                    //if(recipeService.isRepeated())
                }
            }
        }]);
})();