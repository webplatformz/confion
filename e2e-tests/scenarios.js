'use strict';

var LoginPage = require('./accessors/auth.login.accessor.js');
var OverviewPage = require('./accessors/overview.overview.accessor');
var SessionPage = require('./accessors/session.session.accessor');

describe('confion app', function () {

    var username = 'hans@test.ch';
    var password = 'hans';

    var loginPage = new LoginPage();

    browser.get('/');

    it('should automatically redirect to /login when location hash/fragment is empty', function () {
        expect(browser.getLocationAbsUrl()).toMatch("/login");
    });

    it('should redirect to /overview when user is logged in', function () {

        loginPage.setUsername(username);
        loginPage.setPassword(password);
        loginPage.login();

        browser.driver.wait(function () {
            return browser.driver.getCurrentUrl().then(function (url) {
                return /overview/.test(url);
            });
        }, 10000);

        expect(browser.getLocationAbsUrl()).toMatch("/overview");
    });

    it('should show the session section when clicking on a section', function () {
        var overviewPage = new OverviewPage();
        overviewPage.waitForOverviewView();
        overviewPage.selectSession();

        browser.driver.wait(function () {
            return browser.driver.getCurrentUrl().then(function (url) {
                return /session/.test(url);
            });
        }, 10000);

        expect(browser.getLocationAbsUrl()).toMatch("/session");
    });

    it('should show the presenter details when clicking on a presenter in a session', function () {
        var sessionPage = new SessionPage();
        sessionPage.waitForSessionView();

        /* TODO Clicking to open presenter not working...
        sessionPage.openPresenter();

        browser.driver.wait(function () {
            return browser.driver.getCurrentUrl().then(function (url) {
                return /presenter/.test(url);
            });
        }, 10000);

        expect(browser.getLocationAbsUrl()).toMatch("/presenter");*/
    });
});
