const { Builder, logging } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

require('chromedriver'); // needed to set chromedriver path

/*eslint no-console: "off"*/

const snapshotDir = path.join(__dirname, 'screenshots');
const logThreshold = logging.Level.ALL;

// set logging to ALL
const PREF = new logging.Preferences();
PREF.setLevel(logging.Type.BROWSER, logging.Level.ALL);

async function createBrowser(url) {
    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options()
            .addArguments('incognito', 'headless', 'disable-gpu')
            .setLoggingPrefs(PREF))
        .build();

    await driver.manage().window().maximize();

    if (url)
        await driver.navigate().to(url);

    return driver;
}


async function validateNoLogs(driver) {
    const entries = await driver.manage().logs().get(logging.Type.BROWSER);
    entries.forEach(entry => console.log('[%s] %s', entry.level.name, entry.message));

    return entries.filter(entry => entry.level.value > logThreshold.value) === 0;
}

async function logAndSnapshotOnError(driver, testName) {
    const entries = await driver.manage().logs().get(logging.Type.BROWSER);
    entries.forEach(entry => console.log('%s: [%s] %s', testName, entry.level.name, entry.message));

    const image = await driver.takeScreenshot();
    // create dir and no need to wait for the last promise as it can be run async
    const snapshotFile = path.join(snapshotDir, `${testName}.png`);

    await (fs.existsSync(snapshotDir) ? Promise.resolve() : fsPromises.mkdir(snapshotDir))
        .then(() => fsPromises.writeFile(snapshotFile, image, 'base64'))
        .then(() => console.log(`created snapshot file ${snapshotFile}`))
        .catch((e) => console.log(`failed creating snapshot file ${snapshotFile}:`, e));
}

module.exports = {
    createBrowser, validateNoLogs, logAndSnapshotOnError
};

