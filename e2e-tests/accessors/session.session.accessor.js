var SessionPage = function() {

    this.presenter = element(by.id('presenter'));

    this.openPresenter = function() {
        browser.driver.manage().window().setSize(1280, 720);
        this.presenter.click();
    };

    this.waitForSessionView = function() {
        var waitLoading = by.id('presenter');
        browser.wait(function() {
            return browser.driver.isElementPresent(waitLoading);
        }, 8000);
    }
};

module.exports = SessionPage;