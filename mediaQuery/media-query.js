'use strict';

angular.module('casenine')
    .directive('mediaQuery', function ($window) {

        return {
            restrict: 'A',
            scope: {
                mediaQuery: '=',
                matches: '='
            },
            link: function postLink(scope, element, attrs) {

                var mq = scope.mediaQuery;

                /**
                 * @type {MediaQueryList}
                 */
                var mediaQueryList = $window.matchMedia(mq);

                scope.matches = mediaQueryList.matches;

                console.log('mql-init:', mediaQueryList.matches);

                mediaQueryList.addListener(function handleChange(mql) {
                    var value = mql.matches;
                    console.log('mql:', value);

                    scope.$apply(function () {
                        scope.matches = value;
                    });
                });
            }
        };
    });
