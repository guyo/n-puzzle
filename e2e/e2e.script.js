const GamePage = require('./GamePage.js');
const utils = require('./DriverUtils.js');

require('chromedriver');

const __URL__ = 'http://localhost:5000/';

// wrap test so we can save status and name
global.yCurrentTest;
test.wrap = (name, fn, timeout) => {
    test(name, async () => {
        global.yCurrentTest = name;
        const result = await fn();
        global.yCurrentTest = null;
        return result;
    }, timeout);
};

test.y=()=>{};

let driver;

beforeEach(async () => {
    driver = await utils.createBrowser(__URL__);
});

afterEach(async () => {
    const currentTest=global.yCurrentTest;
    global.yCurrentTest=null;
    if (currentTest) {
        await utils.logAndSnapshotOnError(driver, currentTest);
    }
    await driver.quit(); // no need to wait for browser to quit
});

test.wrap('test base mechanics', async () => {
    const gamePage = await GamePage.initGame(driver, [1, 2, 3, 4, null, 6, 7, 5, 8]);

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

    await utils.validateNoLogs(driver);
}, 30000);

test.wrap('test solved', async () => {
    let solved, ngm;
    const gamePage = await GamePage.initGame(driver, [1, 2, null, 3]);

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

    await utils.validateNoLogs(driver);
}, 30000);

test.wrap('test reset and undo', async () => {
    const gamePage = await GamePage.initGame(driver, [1, 2, 3, 4, 5, 6, 7, null, 8]);

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

    await utils.validateNoLogs(driver);
}, 30000);

test.wrap('full 3x3 game play', async () => {
    let ngm, solved;
    const gamePage = await GamePage.initGame(driver, [1, 2, null, 5, 6, 3, 4, 7, 8]);

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

    await utils.validateNoLogs(driver);
}, 30000);
