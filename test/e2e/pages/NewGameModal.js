const { By } = require('selenium-webdriver');

const Modal = require('./Modal');
const SizeInput = require('./SizeInput');

class NewGameModal extends Modal {
    constructor() {
        super();
        const _button = (locator, waitForPage) => ({
            isEnabled: () => this.driver.findElement(locator).then((e) => e.isEnabled()),
            click: () => this.driver.findElement(locator)
                .then(b => b.click())
                .then(() => this.waitForClose(waitForPage)),
            exists: () => this.driver.findElements(locator).then(arr => arr.length > 0)
        });
        this.formLocator = By.css('div[class*=has-feedback');
        this.startButton = _button(By.id('newgamestart'), true);
        this.cancelButton = _button(By.id('newgamecancel'), false);
        this.topCloseButton = _button(By.className('close'));
        this.sizeInputLocator = By.tagName('input');
    }
    getButtonsStatus() {
        return Promise.all([this.startButton.isEnabled(),
            this.cancelButton.isEnabled(), this.topCloseButton.isEnabled()]);
    }
    getSizeInput() {
        return this.driver.findElement(this.sizeInputLocator)
            .then(e => new SizeInput(e));
    }
    setSize(size) {
        return this.getSizeInput()
            .then(i => i.clear())
            .then(i => i.write(size, true))
            .then(() => this.waitForClose(true));
    }
    hasError() {
        return this.driver.findElement(this.formLocator)
            .then(e => e.getAttribute('class'))
            .then(s => s.includes('has-error'));
    }
}
module.exports = NewGameModal;
