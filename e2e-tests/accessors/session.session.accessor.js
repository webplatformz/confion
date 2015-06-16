var SessionPage = function() {

    this.presenter = element(by.binding('vm.session.presenter.id'));

    this.openPresenter = function() {
        presenter.click();
    };

    this.waitForSessionView = function() {
        var waitLoading = by.binding('vm.session.presenter.name');
        browser.wait(function() {
            return browser.driver.isElementPresent(waitLoading);
        }, 8000);
    }
};

module.exports = SessionPage;