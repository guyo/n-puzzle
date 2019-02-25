const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const GamePage = require('./GamePage.js');

require('chromedriver');

let driver;
let gamePage;


beforeEach(async () => {
    driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().addArguments('incognito', 'headless','disable-gpu'))
        .build();

    await driver.manage().window().maximize();
    await driver.navigate().to('http://localhost:5000');
    gamePage = new GamePage(driver);
});

afterEach(async () => {
    await driver.quit();
});

test('simple 3x3 game play',async () => {
    let ngm, solved;
    await gamePage.setBoard([1, 2, null, 5, 6, 3, 4, 7, 8]);
    ngm=await gamePage.getNewGameModal();
    await ngm.setSize(3);

    // check moving tile back and forth
    await expect(gamePage.getTiles()).resolves.toEqual([['1', '2'], ['5', '6', '3'], ['4', '7', '8']]);
    await gamePage.clickTile('2');
    await expect(gamePage.getTiles()).resolves.toEqual([['1', undefined, '2'], ['5', '6', '3'], ['4', '7', '8']]);
    await gamePage.clickTile('2');

    // solve puzzle
    await expect(gamePage.getTiles()).resolves.toEqual([['1', '2'], ['5', '6', '3'], ['4', '7', '8']]);
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
    solved=await gamePage.getSolvedModal();
    ngm=await solved.clickYes();
    await ngm.clickCancel();
    solved=await gamePage.getSolvedModal();
    await solved.clickNo();
    ngm=await gamePage.clickNewGame();
    await ngm.clickStart();
    await expect(gamePage.getTiles()).resolves.toEqual([['1', '2'], ['5', '6', '3'], ['4', '7', '8']]);
}, 20000);
    // see why we fail
    // click on irrelvant tile 
    // replace bpard before invoking new
