'use strict';

describe('my app', function() {

  browser.get('/');

  it('should automatically redirect to /login when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/login");
  });

});
