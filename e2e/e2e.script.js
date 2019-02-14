const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

describe('run selenium', () => {
    it('should be able to open a browser', async () => {
        const driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options().addArguments('incognito','headless','disable-gpu'))
            .build();

        await driver.manage().window().maximize();
        await driver.quit();
    });
});