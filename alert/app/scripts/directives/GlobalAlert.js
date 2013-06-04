'use strict';

/**
 * @type {angular.Module}
 */
var alertModule = angular.module('casenine.bootstrap.ui.alert', ['ui.bootstrap']);

alertModule.run(function ($rootScope, $templateCache) {
    $rootScope.messages = [];

    $templateCache.put('casenine.bootstrap.ui.alert/alert.html',
        '<div class="alert" ng-class="type && \'alert-\' + type">' +
            '<button ng-show="manualCloseable" type="button" class="close" ng-click="onMessageClose(message, $index, $event)">&times;</button>' +
            '<strong> {{ message.title}} </strong> {{ message.text }} ' +
        '</div>'
    );
});

alertModule.directive('globalAlertStack', function globalAlertStackDirective() {
    return {
        template:
            '<div>' +
                '<ul>' +
                    '<li ng-repeat="message in messages">' +
                        '<alert-item message="message"></alert-item>' +
                    '</li>' +
                '</ul>' +
            '</div>',
        restrict: 'E',
        replace: true
    };
});


alertModule.directive('alertItem', function alertItemDirective() {

    return {
        templateUrl: 'casenine.bootstrap.ui.alert/alert.html',
        restrict: 'E',
        replace: true,
        scope: {
            message: '=',
            type: '=',
            onClose: '&',
            close: '@'
        },
        controller: function globalAlertStackCtrl($scope, GlobalAlert, $timeout) {

            $scope.onMessageClose = function onMessageClose(message, $index, $event) {
                console.info('onMessageClose()', message, $index, $event);
                GlobalAlert.remove($index);
            };

            $scope.manualCloseable = false;

            if ($scope.message.manualCloseable) {
                // Make close button visible
                $scope.manualCloseable = true;
            }

            if ($scope.message.timeoutClose) {
                console.info('$scope.message.timeoutClose', $scope.message.timeoutClose, typeof $scope.message.timeoutClose);
                $timeout(function timeoutClose() {
                    GlobalAlert.remove($scope.message);
                }, $scope.message.timeoutClose);
            }
        }
    };
});