const { until } = require('selenium-webdriver');

class Modal {
    constructor() {
        // do nothing
    }

    // replace ctor so we can call without passing all params through super 
    init(driver, modal, page, name, waitTimeMS) {
        this.driver = driver;
        if (modal === null)
            throw Error('modal is not open');
        this.modal = modal;
        this.page = page;
        this.name = name;
        this.waitTimeMS = waitTimeMS;

        return this;
    }

    // wait until modal is closed.  return page or promise for 
    // page to be ready depending on the paramter
    waitForClose(waitForPage = false) {
        return this.driver.wait(until.stalenessOf(this.modal), this.waitTimeMS, `${this.name} Modal is not closed`)
            .then(() => waitForPage ? this.page.waitFor() : this.page);
    }
}
module.exports = Modal;
