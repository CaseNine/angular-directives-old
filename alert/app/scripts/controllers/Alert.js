'use strict';

angular.module('alertApp')
    .controller('AlertCtrl', function ($scope, GlobalAlert) {

        var levels = ['error', 'success', 'info', 'warning'];

        function getRandom(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        GlobalAlert.add({
            type: getRandom(levels),
            text: 'Blah fouttt',
            title: 'Uhhh',
            manualCloseable: true,
            timeoutClose: 20000
        });


        $scope.addAlert = function addAlert() {
            GlobalAlert.add({
                type: getRandom(levels),
                text: 'hoiafdasfsadfa fouttt',
                title: 'adfasf dfa fa asf d',
                manualCloseable: true
            });
        }

    });


