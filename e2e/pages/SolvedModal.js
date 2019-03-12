const { By } = require('selenium-webdriver');
const Modal = require('./Modal');

class SolvedModal extends Modal {
    constructor() {
        super();
        this.yesButtonLocator = By.id('solvedstart');
        this.noButtonLocator = By.id('solvedcancel');
    }
    clickYes() {
        return this.driver.findElement(this.yesButtonLocator)
            .then((b) => b.click())
            //    .then(() => this.waitForClose(true)) - doesnt close anymore on Yes
            .then(() => this.page.getNewGameModal());
    }
    clickNo() {
        return this.driver.findElement(this.noButtonLocator)
            .then((b) => b.click())
            .then(() => this.waitForClose());
    }
}
module.exports = SolvedModal;
