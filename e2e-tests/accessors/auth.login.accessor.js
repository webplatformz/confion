var LoginPage = function() {
    this.username =   element(by.css('input[type=email]'));
    this.password = element(by.css('input[type=password]'));
    this.loginButton =  element(by.css('button[type=submit]'));

    this.setUsername = function(username) {
        this.username.clear();
        this.username.sendKeys(username);
    };

    this.setPassword = function(password) {
        this.password.clear();
        this.password.sendKeys(password);
    };

    this.login = function() {
        this.loginButton.click();
    };
};
module.exports = LoginPage;