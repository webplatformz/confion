var OverviewPage = function() {

    var sessionSelector = '.session-box a';

    this.selectSession = function() {
        var elements = element.all(by.repeater('message in vm.sessions'));
        elements.get(0).$('a').click();
    };

    this.waitForOverviewView = function() {
        var waitLoading = by.css(sessionSelector);
        browser.wait(function() {
            return browser.driver.isElementPresent(waitLoading);
        }, 8000);
    }
};

module.exports = OverviewPage;