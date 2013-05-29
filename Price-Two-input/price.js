angular.module('casenine-angular-directives', []).directive('price', function () {

    console.log(window.location);

    return {
        restrict: 'E',
        replace: false,
        scope: {
            label: '@priceLabel',
            value: '='
        },
        templateUrl: 'Price-Two-input/price.html',
        link: function (scope) {
            scope.euro = '0';
            scope.cents = '00';
            scope.value = '0';
            scope.init = false;

            scope.changeValue = function () {
                var euro = scope.euro;
                euro = euro.replace(',', '');
                euro += '.' + scope.cents;

                scope.value = euro;
            };

            scope.$watch("value", function () {
                if (!scope.init && scope.value > 0) {
                    scope.init = true;
                    var array = scope.value.split(".");
                    scope.euro = array[0];
                    scope.cents = array[1];
                }
            }, true);
        }
    }
});
