'use strict';

describe('Directive: GlobalAlert', function () {
  beforeEach(module('alertApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<-global-alert></-global-alert>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the GlobalAlert directive');
  }));
});
