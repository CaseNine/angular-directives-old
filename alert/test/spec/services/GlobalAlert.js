'use strict';

describe('Service: GlobalAlert', function () {

  // load the service's module
  beforeEach(module('alertApp'));

  // instantiate service
  var GlobalAlert;
  beforeEach(inject(function (_GlobalAlert_) {
    GlobalAlert = _GlobalAlert_;
  }));

  it('should do something', function () {
    expect(!!GlobalAlert).toBe(true);
  });

});
