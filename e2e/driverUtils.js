const { Builder, logging } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

require('chromedriver'); // needed to set chromedriver path

module.exports = function (config) {
    const snapshotDir = path.resolve(config.screenshotsDir);
    const logThreshold = logging.Level[config.logThreshold];
    const url = config.url;

    // set logging to ALL
    const PREF = new logging.Preferences();
    PREF.setLevel(logging.Type.BROWSER, logging.Level.ALL);

    async function createBrowser() {
        const driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options()
                .addArguments('incognito', 'headless', 'disable-gpu')
                .setLoggingPrefs(PREF))
            .build();

        await driver.manage().window().maximize();

        await driver.navigate().to(url);

        return driver;
    }

    /*eslint no-console: "off"*/

    async function validateNoLogs(driver) {
        const entries = await driver.manage().logs().get(logging.Type.BROWSER);
        return entries.filter(entry => entry.level.value > logThreshold.value)
            .map(entry => `[${entry.level.name}] ${entry.message}`);
    }

    async function logAndSnapshotOnError(driver, testName) {
        try {
            const entries = await driver.manage().logs().get(logging.Type.BROWSER);
            entries.forEach(entry => console.log('%s: [%s] %s', testName, entry.level.name, entry.message));

            const image = await driver.takeScreenshot();
            // create dir and no need to wait for the last promise as it can be run async

            const snapshotFile = path.join(snapshotDir, `${testName}.png`);

            await (fs.existsSync(snapshotDir) ? Promise.resolve() : fsPromises.mkdir(snapshotDir, { recursive: true }))
                .then(() => fsPromises.writeFile(snapshotFile, image, 'base64'))
                .then(() => console.log(`created snapshot file ${snapshotFile}`));
        } catch (e) {
            console.log(`failed logging errror for test '${testName}':`, e);
        }
    }

    return { createBrowser, validateNoLogs, logAndSnapshotOnError };
};


