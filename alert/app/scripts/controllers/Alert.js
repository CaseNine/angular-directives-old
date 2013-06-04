'use strict';

angular.module('alertApp')
    .controller('AlertCtrl', function ($scope, GlobalAlert) {

        GlobalAlert.add({
            type: 'error',
            text: 'Blah fouttt',
            title: 'Uhhh',
            manualCloseable: true,
            timeoutClose: 20000
        });

    });


