const { Key } = require('selenium-webdriver');

class SizeInput {
    constructor(input) {
        this.input = input;
    }
    clear() {
        return this.input.getAttribute('value')
            .then(v => v && v.length > 0 ?
                this.input.sendKeys.apply(this.input, new Array(v.length).fill(Key.BACK_SPACE)) :
                null)
            .then(() => this);
    }
    write(text, clickReturn = false) {
        return this.input.sendKeys.apply(this.input, clickReturn ? [text, Key.RETURN] : [text]);
    }
    delete() {
        return this.input.sendKeys(Key.RETURN);
    }
}

module.exports = SizeInput;
