const { Builder, logging } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const GamePage = require('./GamePage.js');
const fs=require('fs');

require('chromedriver');

const __URL__ = 'http://localhost:5000/';
const __MAXIMAL_ALLOWED_LOG_LEVEL = logging.Level.INFO;

let driver;
let gamePage;
let snapshot = 0;

async function startGame(tiles) {
    await gamePage.setBoard(tiles);
    const ngm = await gamePage.getNewGameModal();
    await ngm.setSize(Math.round(Math.sqrt(tiles.length)));
}

async function validateLogs() {
    let entries = await driver.manage().logs().get(logging.Type.BROWSER);
    entries.forEach(entry => console.log('[%s] %s', entry.level.name, entry.message));
    entries = entries.filter(entry => entry.level.value > __MAXIMAL_ALLOWED_LOG_LEVEL.value);

    expect(entries.length).toEqual(0);
}

async function onFail() {
    const entries = await driver.manage().logs().get(logging.Type.BROWSER);
    entries.forEach(entry => console.log('[%s] %s', entry.level.name, entry.message));

    const image = await driver.takeScreenshot();
    await fs.writeFile(`./sc${snapshot++}.png`, image, 'base64', (e) => { if (e) console.log(e); });
}

const pref = new logging.Preferences();
pref.setLevel(logging.Type.BROWSER, logging.Level.ALL);

beforeEach(async () => {
    driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options()
            .addArguments('incognito', 'headless', 'disable-gpu')
            .setLoggingPrefs(pref))
        .build();

    gamePage = new GamePage(driver);

    await driver.manage().window().maximize();
    await driver.navigate().to(__URL__);
});

afterEach(async () => {
    await onFail();
    await driver.quit();
});



test('test base mechanics', async () => {
    await startGame([1, 2, 3, 4, null, 6, 7, 5, 8]);

    await gamePage.clickTile('2');
    await expect(gamePage.getTiles()).resolves.toEqual([['1', undefined, '3'], ['4', '2', '6'], ['7', '5', '8']]);

    await gamePage.clickTile('5');
    await gamePage.clickTile('7');
    await gamePage.clickTile('4');
    await gamePage.clickTile('6');
    await expect(gamePage.getTiles()).resolves.toEqual([['1', undefined, '3'], ['4', '2', '6'], ['7', '5', '8']]);

    await gamePage.clickTile('2');
    await gamePage.clickTile('5');
    await expect(gamePage.getTiles()).resolves.toEqual([['1', '2', '3'], ['4', '5', '6'], ['7', undefined, '8']]);
    await gamePage.clickTile('5');
    await gamePage.clickTile('4');
    await expect(gamePage.getTiles()).resolves.toEqual([['1', '2', '3'], [undefined, '4', '6'], ['7', '5', '8']]);
    await gamePage.clickTile('4');
    await gamePage.clickTile('6');
    await expect(gamePage.getTiles()).resolves.toEqual([['1', '2', '3'], ['4', '6'], ['7', '5', '8']]);

    await validateLogs();
}, 30000);

test('test solved', async () => {
    let solved, ngm;
    await startGame([1, 2, null, 3]);

    // check that modal is closed
    await gamePage.waitForSolvedToClose();

    // check clicking yes and starting a new game
    await gamePage.clickTile('3');
    solved = await gamePage.getSolvedModal();
    ngm = await solved.clickYes();
    await ngm.clickStart();
    await gamePage.waitForSolvedToClose();

    // check clicking yes, cancel twice and then no
    await gamePage.clickTile('3');
    solved = await gamePage.getSolvedModal();
    ngm = await solved.clickYes();
    await ngm.clickCancel();
    solved = await gamePage.getSolvedModal();
    ngm = await solved.clickYes();
    await ngm.clickCancel();
    solved = await gamePage.getSolvedModal();
    solved.clickNo();
    await gamePage.waitForSolvedToClose();

    // check that buttons and tiles are not available after solved
    await expect(gamePage.getButtonsStatus()).resolves.toEqual([false, false]);
    await gamePage.clickTile('3');
    await expect(gamePage.getTiles()).resolves.toEqual([['1', '2'], ['3']]);

    await validateLogs();
}, 30000);

test('test reset and undo', async () => {
    await startGame([1, 2, 3, 4, 5, 6, 7, null, 8]);

    // disabled on start
    await expect(gamePage.getButtonsStatus()).resolves.toEqual([false, false]);

    await gamePage.clickTile('7');
    await expect(gamePage.getButtonsStatus()).resolves.toEqual([true, true]);

    await gamePage.clickTile('4');
    await expect(gamePage.getTiles()).resolves.toEqual([['1', '2', '3'], [undefined, '5', '6'], ['4', '7', '8']]);
    await expect(gamePage.getButtonsStatus()).resolves.toEqual([true, true]);

    await gamePage.undo.click();
    await expect(gamePage.getTiles()).resolves.toEqual([['1', '2', '3'], ['4', '5', '6'], [undefined, '7', '8']]);
    await expect(gamePage.getButtonsStatus()).resolves.toEqual([true, true]);

    await gamePage.undo.click();
    await expect(gamePage.getTiles()).resolves.toEqual([['1', '2', '3'], ['4', '5', '6'], ['7', undefined, '8']]);
    await expect(gamePage.getButtonsStatus()).resolves.toEqual([false, false]);

    // test reset
    await gamePage.clickTile('7');
    await gamePage.clickTile('4');
    await expect(gamePage.getTiles()).resolves.toEqual([['1', '2', '3'], [undefined, '5', '6'], ['4', '7', '8']]);
    await gamePage.reset.click();
    await expect(gamePage.getTiles()).resolves.toEqual([['1', '2', '3'], ['4', '5', '6'], ['7', undefined, '8']]);
    await expect(gamePage.getButtonsStatus()).resolves.toEqual([false, false]);

    await validateLogs();
}, 30000);

test('full 3x3 game play', async () => {
    let ngm, solved;
    await startGame([1, 2, null, 5, 6, 3, 4, 7, 8]);

    // check moving tile back and forth
    await expect(gamePage.getTiles()).resolves.toEqual([['1', '2'], ['5', '6', '3'], ['4', '7', '8']]);
    await gamePage.clickTile('2');
    await expect(gamePage.getTiles()).resolves.toEqual([['1', undefined, '2'], ['5', '6', '3'], ['4', '7', '8']]);
    await gamePage.clickTile('2');
    await expect(gamePage.getTiles()).resolves.toEqual([['1', '2'], ['5', '6', '3'], ['4', '7', '8']]);
    await gamePage.clickTile('7'); // no move
    await expect(gamePage.getTiles()).resolves.toEqual([['1', '2'], ['5', '6', '3'], ['4', '7', '8']]);

    // solve puzzle
    await gamePage.clickTile('3');
    await expect(gamePage.getTiles()).resolves.toEqual([['1', '2', '3'], ['5', '6'], ['4', '7', '8']]);
    await gamePage.clickTile('6');
    await expect(gamePage.getTiles()).resolves.toEqual([['1', '2', '3'], ['5', undefined, '6'], ['4', '7', '8']]);
    await gamePage.clickTile('5');
    await expect(gamePage.getTiles()).resolves.toEqual([['1', '2', '3'], [undefined, '5', '6'], ['4', '7', '8']]);
    await gamePage.clickTile('4');
    await expect(gamePage.getTiles()).resolves.toEqual([['1', '2', '3'], ['4', '5', '6'], [undefined, '7', '8']]);
    await gamePage.clickTile('7');
    await expect(gamePage.getTiles()).resolves.toEqual([['1', '2', '3'], ['4', '5', '6'], ['7', undefined, '8']]);
    await gamePage.waitForSolvedToClose(); // check that puzzle wasnt solved yet

    // play with solved modal
    await gamePage.clickTile('8');
    await expect(gamePage.getTiles()).resolves.toEqual([['1', '2', '3'], ['4', '5', '6'], ['7', '8']]);
    solved = await gamePage.getSolvedModal();
    ngm = await solved.clickYes();
    await ngm.clickCancel();
    solved = await gamePage.getSolvedModal();
    await solved.clickNo();
    await gamePage.waitForSolvedToClose();
    await gamePage.clickTile('8'); // nothing should move
    await expect(gamePage.getTiles()).resolves.toEqual([['1', '2', '3'], ['4', '5', '6'], ['7', '8']]);

    // start new game
    await gamePage.setBoard([1, 2, 3, 4, 5, 6, 7, null, 8]);
    ngm = await gamePage.clickNewGame();
    await ngm.clickStart();
    await expect(gamePage.getTiles()).resolves.toEqual([['1', '2', '3'], ['4', '5', '6'], ['7', undefined, '8']]);

    await validateLogs();
}, 30000);
