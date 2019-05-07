const GamePage = require('./pages/GamePage');
const utils = require('./driverUtils')(global.__E2E_CONFIG__);

// wrap test so we can save status and name
// also added before() and after() as there is a problem with jest
// before and after not properly waiting for finish before running the test itself
let currentTest;
test.wrap = (name, fn, timeout) => {
    if (!timeout)
        timeout = 30000;
    test(name, async () => {
        await before();
        let result;
        try {
            currentTest = name;
            result = await fn();
            currentTest = null;
        } catch (e) {
            throw e;
        } finally {
            await after();
        }
        return result;

    }, timeout);
};

let driver = null;

async function before() {
    driver = await utils.createBrowser();
}

async function after() {
    const failedTest = currentTest;
    currentTest = null;
    if (failedTest) {
        await utils.logAndSnapshotOnError(driver, failedTest);
    }
    await driver.quit();
    driver = null;
}

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

    expect(await utils.validateNoLogs(driver)).toEqual([]);
});

test.wrap('test solved', async () => {
    let solved, ngm;
    const gamePage = await GamePage.initGame(driver, [1, 2, null, 3]);

    // check that modal is closed
    await gamePage.waitForSolvedToClose();

    // check clicking yes and starting a new game
    await gamePage.clickTile('3');
    solved = await gamePage.getSolvedModal();
    ngm = await solved.clickYes();
    await ngm.startButton.click();
    await gamePage.waitForSolvedToClose();

    // check clicking yes, cancel twice and then no
    await gamePage.clickTile('3');
    solved = await gamePage.getSolvedModal();
    ngm = await solved.clickYes();
    await ngm.cancelButton.click();
    solved = await gamePage.getSolvedModal();
    ngm = await solved.clickYes();
    await ngm.cancelButton.click();
    solved = await gamePage.getSolvedModal();
    solved.clickNo();
    await gamePage.waitForSolvedToClose();

    // check that buttons and tiles are not available after solved
    await expect(gamePage.getButtonsStatus()).resolves.toEqual([false, false]);
    await gamePage.clickTile('3');
    await expect(gamePage.getTiles()).resolves.toEqual([['1', '2'], ['3']]);

    expect(await utils.validateNoLogs(driver)).toEqual([]);
});

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

    expect(await utils.validateNoLogs(driver)).toEqual([]);
});

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
    await ngm.cancelButton.click();
    solved = await gamePage.getSolvedModal();
    await solved.clickNo();
    await gamePage.waitForSolvedToClose();
    await gamePage.clickTile('8'); // nothing should move
    await expect(gamePage.getTiles()).resolves.toEqual([['1', '2', '3'], ['4', '5', '6'], ['7', '8']]);

    // start new game
    await gamePage.setBoard([1, 2, 3, 4, 5, 6, 7, null, 8]);
    ngm = await gamePage.clickNewGame();
    await ngm.startButton.click();
    await expect(gamePage.getTiles()).resolves.toEqual([['1', '2', '3'], ['4', '5', '6'], ['7', undefined, '8']]);

    expect(await utils.validateNoLogs(driver)).toEqual([]);
});

test.wrap('new game modal', async () => {
    const gamePage = await GamePage.initGame(driver, [1, 2, null, 3]);
    let ngm = await gamePage.clickNewGame();

    await Promise.all([
        expect(ngm.topCloseButton.exists()).resolves.toEqual(true),
        expect(ngm.cancelButton.exists()).resolves.toEqual(true),
        expect(ngm.getButtonsStatus()).resolves.toEqual([true, true, true]),
        expect(ngm.hasError()).resolves.toEqual(false)
    ]);

    let input = await ngm.getSizeInput();
    await input.clear();
    await expect(ngm.getButtonsStatus()).resolves.toEqual([false, true, true]);
    await expect(ngm.hasError()).resolves.toEqual(true);

    await input.write('2');
    await expect(ngm.getButtonsStatus()).resolves.toEqual([true, true, true]);
    await expect(ngm.hasError()).resolves.toEqual(false);

    // 21 is invalid
    await input.write('1');
    await expect(ngm.getButtonsStatus()).resolves.toEqual([false, true, true]);
    await expect(ngm.hasError()).resolves.toEqual(true);

    // back to 2  - valid
    await input.delete();
    await expect(ngm.getButtonsStatus()).resolves.toEqual([false, true, true]);
    await expect(ngm.hasError()).resolves.toEqual(true);

    // NAN
    await input.clear();
    await input.write('nanstr');
    await expect(ngm.getButtonsStatus()).resolves.toEqual([false, true, true]);
    await expect(ngm.hasError()).resolves.toEqual(true);
    await input.write('', true); // test that enter doesn't close the modal
    await gamePage.getNewGameModal();

    // close, reopen, fix and submit
    await ngm.cancelButton.click();
    ngm = await gamePage.clickNewGame();
    input = await ngm.getSizeInput();
    await input.clear();
    await input.write(2);
    await ngm.startButton.click();

    // test top close button, reopen, fix and submit with enter
    ngm = await gamePage.clickNewGame();
    input = await ngm.getSizeInput();
    await input.clear();
    await input.write('nanstr');
    await ngm.topCloseButton.click();
    ngm = await gamePage.clickNewGame();
    input = await ngm.getSizeInput();
    await input.clear();
    await input.write(2, true);
    await ngm.waitForClose(true);
});

test.wrap('init modal', async () => {
    const gamePage = new GamePage(driver);
    let ngm = await gamePage.getNewGameModal();

    // validate initial state
    await Promise.all([
        expect(ngm.topCloseButton.exists()).resolves.toEqual(false),
        expect(ngm.cancelButton.exists()).resolves.toEqual(false),
        expect(ngm.hasError()).resolves.toEqual(false),
        expect(ngm.startButton.isEnabled()).resolves.toEqual(true)
    ]);

    // check wrong input shows error and doesnt allow to submit
    const input = await ngm.getSizeInput();
    await input.write('a');
    await Promise.all([
        expect(ngm.hasError()).resolves.toEqual(true),
        expect(ngm.startButton.isEnabled()).resolves.toEqual(false)
    ]);

    // check that enter on wrong input doesn't work or change the modal
    await input.write('', true);
    ngm = await gamePage.getNewGameModal();
    await Promise.all([
        expect(ngm.topCloseButton.exists()).resolves.toEqual(false),
        expect(ngm.cancelButton.exists()).resolves.toEqual(false),
        expect(ngm.startButton.isEnabled()).resolves.toEqual(false)
    ]);

});
