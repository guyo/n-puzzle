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

function expectTiles(tiles) {
    return expect(gamePage.getTiles()).resolves.toEqual(tiles);
}

test('simple 3x3 game play', () => {
    return gamePage.setBoard([1, 2, null, 5, 6, 3, 4, 7, 8])
        .then(() => gamePage.getNewGameModal())
        .then(ngm => ngm.setSize(3))
        .then(() => expectTiles([['1', '2'], ['5', '6', '3'], ['4', '7', '8']]))
        .then(() => gamePage.clickTile('2'))
        .then(() => expectTiles([['1', undefined, '2'], ['5', '6', '3'], ['4', '7', '8']]))
        .then(() => gamePage.clickTile('2'))
        .then(() => expectTiles([['1', '2'], ['5', '6', '3'], ['4', '7', '8']]))
        .then(() => gamePage.clickTile('3'))
        .then(() => expectTiles([['1', '2', '3'], ['5', '6'], ['4', '7', '8']]))
        .then(() => gamePage.clickTile('6'))
        .then(() => expectTiles([['1', '2', '3'], ['5', undefined, '6'], ['4', '7', '8']]))
        .then(() => gamePage.clickTile('5'))
        .then(() => expectTiles([['1', '2', '3'], [undefined, '5', '6'], ['4', '7', '8']]))
        .then(() => gamePage.clickTile('4'))
        .then(() => expectTiles([['1', '2', '3'], ['4', '5', '6'], [undefined, '7', '8']]))
        .then(() => gamePage.clickTile('7'))
        .then(() => expectTiles([['1', '2', '3'], ['4', '5', '6'], ['7', undefined, '8']]))
        .then(() => gamePage.waitForSolvedToClose())
        .then(() => gamePage.clickTile('8'))
        .then(() => gamePage.getSolvedModal())
        .then(solved => solved.clickYes())
        .then(ngm => ngm.clickCancel())
        .then(() => gamePage.getSolvedModal())
        .then(solved => solved.clickNo())
        .then(() => gamePage.clickNewGame())
        .then(ngm => ngm.clickStart())
        .then(() => expectTiles([['1', '2'], ['5', '6', '3'], ['4', '7', '8']]));
}, 20000);
    // check solved and not yet solved
    // see why we fail
    // click on irrelvant tile 
    // replace bpard before invoking new
