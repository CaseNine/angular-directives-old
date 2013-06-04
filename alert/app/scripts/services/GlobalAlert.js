'use strict';

angular.module('casenine.bootstrap.ui.alert')
    .factory('GlobalAlert', function ($rootScope) {

        return {
            /**
             * @param {object} messageObj
             */
            add: function add(messageObj) {
                $rootScope.messages.push(messageObj);
            },
            /**
             * @param {number|object} index Index or messageObject
             */
            remove: function remove(index) {
                if (!$rootScope.messages[index]) {
                    // index != index but, index == object.
                    index = $rootScope.messages.indexOf(index);
                }

                // Remove index from messages array
                $rootScope.messages.splice(index, 1);
            }
        };
    });
