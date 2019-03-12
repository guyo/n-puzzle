const { By, until } = require('selenium-webdriver');

const SolvedModal = require('./SolvedModal');
const NewGameModal = require('./NewGameModal');

// locators
const GRID_X_PADDING = 2;
const GRID_Y_PADDING = 2;
const gridLocator = By.id('grid');
const getTileLocator = (tileId) => By.xpath(`div[text()="${tileId}"]`);

const newGameModalLocator = By.id('newGameModal');
const newGameButtonLocator = By.id('newgame');
const resetButtonLocator = By.id('reset');
const undoButtonLocator = By.id('undo');
const solvedModalLocator = By.id('solvedModal');

const GLOBAL_FUNCTION_HOOKS = '__GLOBAL_FUNCTION_HOOKS__';
const SHUFFLE_FUNCTION = 'shuffle';

const ANIMATION_TIME_MS = 300;
const WAIT_TIME_MS = 3000;

class GamePage {
    constructor(driver) {
        this.clickTile = (tileId) => driver.findElement(gridLocator)
            .then(grid => grid.findElement(getTileLocator(tileId)))
            .then(tile => tile.click())
            .then(() => driver.sleep(ANIMATION_TIME_MS));

        this.clickNewGame = () => driver.findElement(newGameButtonLocator)
            .then(b => b.click())
            .then(() => this.getNewGameModal());

        this._getModal = (locator, modalClass, name) => driver.wait(until.elementLocated(locator), WAIT_TIME_MS, `${name} Modal is not opened`)
            .then(e => new modalClass(e).init(driver, e, this, name, WAIT_TIME_MS));

        this.getNewGameModal = () => this._getModal(newGameModalLocator, NewGameModal, 'New Game');

        this.getSolvedModal = () => this._getModal(solvedModalLocator, SolvedModal, 'Solved');

        this.waitForSolvedToClose = () => driver.wait(() => driver.findElements(solvedModalLocator)
            .then(elements => elements.length === 0), WAIT_TIME_MS, 'solvedModal not closed');

        this.waitFor = () => driver.sleep(ANIMATION_TIME_MS).then(() => this);

        this._button = (locator) => ({
            isEnabled: () => driver.findElement(locator).then((e) => e.isEnabled()),
            click: () => driver.findElement(locator)
                .then((b) => b.click())
                .then(() => this.waitFor())
        });

        this.reset = this._button(resetButtonLocator);

        this.undo = this._button(undoButtonLocator);

        this.getButtonsStatus = () => Promise.all([this.undo.isEnabled(), this.reset.isEnabled()]);

        this.getTiles = async () => {
            const grid = await driver.findElement(gridLocator);
            const gridRect = await grid.getRect();
            const tileElements = await grid.findElements(By.tagName('div'));
            return Promise.all(tileElements.map(t => Promise.all([t.getText(), t.getRect(), t.getCssValue('border-left-width'), t.getCssValue('border-top-width')]).then(([val, rect, leftBorder, topBorder]) => ({
                val,
                y: Math.round((rect.y - gridRect.y - GRID_Y_PADDING) / (rect.height + parseInt(topBorder) * 2)),
                x: Math.round((rect.x - gridRect.x - GRID_X_PADDING) / (rect.width + parseInt(leftBorder) * 2)),
            })))).then(tiles => tiles.reduce((accu, tile) => {
                (accu[tile.y] || (accu[tile.y] = []))[tile.x] = tile.val;
                return accu;
            }, []));
        };

        this.setBoard = (board) => {
            board.forEach((e) => {
                if (e !== null && !Number.isInteger(e))
                    throw new Error(`invalid board recieved ${board}`);
            });
            return driver.executeScript(`${GLOBAL_FUNCTION_HOOKS}.${SHUFFLE_FUNCTION}=()=>${JSON.stringify(board)}`)
                .then(() => this);
        };

        this.unsetBoard = () => driver.executeScript(`delete window.${GLOBAL_FUNCTION_HOOKS}["${SHUFFLE_FUNCTION}"]`)
            .then(() => this);

    }

    static initGame(driver, tiles) {
        return new GamePage(driver).setBoard(tiles)
            .then(gamePage => gamePage.getNewGameModal())
            .then(ngm => ngm.setSize(Math.round(Math.sqrt(tiles.length))));
    }
}

module.exports = GamePage;