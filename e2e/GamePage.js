const { By, Key, until } = require('selenium-webdriver');

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
const waitTimeMS = 3000;

function GamePage(driver) {
    this.clickTile = (tileId) => driver.findElement(gridLocator)
        .then(grid => grid.findElement(getTileLocator(tileId)))
        .then(tile => tile.click())
        .then(() => driver.sleep(ANIMATION_TIME_MS));

    this.clickNewGame = () => driver.findElement(newGameButtonLocator)
        .then(b => b.click())
        .then(() => this.getNewGameModal());

    this._getModal = (locator, modalClass, name) =>
        driver.wait(until.elementLocated(locator), waitTimeMS, `${name} Modal is not opened`)
            .then(modal => new modalClass(driver, modal, this, name));

    this.getNewGameModal = () => this._getModal(newGameModalLocator, NewGameModal, 'New Game');

    this.getSolvedModal = () => this._getModal(solvedModalLocator, SolvedModal, 'Solved');

    this.waitForSolvedToClose = () => driver.wait(() => driver.findElements(solvedModalLocator)
        .then(elements => elements.length === 0), waitTimeMS, 'solvedModal not closed');

    this.waitFor = () => Promise.resolve(this);

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

        return Promise.all(tileElements.map(t =>
            Promise.all([t.getText(), t.getRect(), t.getCssValue('border-left-width'), t.getCssValue('border-top-width')]).then(
                ([val, rect, leftBorder, topBorder]) => ({
                    val,
                    y: Math.round((rect.y - gridRect.y - GRID_Y_PADDING) / (rect.height + parseInt(topBorder) * 2)),
                    x: Math.round((rect.x - gridRect.x - GRID_X_PADDING) / (rect.width + parseInt(leftBorder) * 2)),
                })
            )
        )
        ).then(Tiles);
    };

    this.setBoard = (board) => {
        board.forEach((e) => {
            if (e !== null && !Number.isInteger(e))
                throw new Error(`invalid board recieved ${board}`);
        });

        return driver.executeScript(`window.${GLOBAL_FUNCTION_HOOKS}.${SHUFFLE_FUNCTION}=()=>${JSON.stringify(board)}`)
            .then(() => this);
    };

    this.unsetBoard = () =>
        driver.executeScript(`delete window.${GLOBAL_FUNCTION_HOOKS}["${SHUFFLE_FUNCTION}"]`)
            .then(() => this);
}

class Modal {
    constructor(driver, modal, page, name) {
        this.driver = driver;
        if (modal === null)
            throw Error('modal is not open');
        this.modal = modal;
        this.page = page;
        this.name = name;
    }

    // wait until modal is closed.  return page or promise for 
    // page to be ready depending on the paramter
    waitForClose(waitForPage = false) {
        return this.driver.wait(until.stalenessOf(this.modal), waitTimeMS, `${this.name} Modal is not closed`)
            .then(() => waitForPage ? this.page.waitFor() : this.page);
    }
}

class NewGameModal extends Modal {
    constructor(driver, modal, page, name) {
        super(driver, modal, page, name);

        this.sizeInputLocator = By.tagName('input');
        this.startButtonLocator = By.id('newgamestart');
        this.cancelButtonLocator = By.id('newgamecancel');
    }

    getSizeInput() {
        return this.driver.findElement(this.sizeInputLocator);
    }

    setSize(size) {
        return this.getSizeInput()
            .then(e => new SizeInput(e))
            .then(i => i.clear())
            .then(i => i.write(size, true))
            .then(() => this.waitForClose(true));
    }


    clickCancel() {
        return this.driver.findElement(this.cancelButtonLocator)
            .then(b => b.click())
            .then(() => this.waitForClose());
    }

    isCancelable() {
        return this.driver.findElement(this.cancelButtonLocator).then(e => e.isEnabled());
    }

    clickStart() {
        return this.driver.findElement(this.startButtonLocator)
            .then(b => b.click())
            .then(() => this.waitForClose(true));
    }

    isStartable() {
        return this.driver.findElement(this.startButtonLocator).then(e => e.isEnabled());
    }
}

class SizeInput {
    constructor(input) {
        this.input = input;
    }

    clear() {
        return this.input.getAttribute('value')
            .then(v => v && v.length > 0 ?
                this.input.sendKeys.apply(this.input, new Array(v.length).fill(Key.BACK_SPACE)) :
                null)
            .then(() => this);
    }

    write(text, clickReturn = false) {
        return this.input.sendKeys.apply(this.input, clickReturn ? [text, Key.RETURN] : [text]);
    }

}

class SolvedModal extends Modal {
    constructor(driver, modal, page, name) {
        super(driver, modal, page, name);

        this.yesButtonLocator = By.id('solvedstart');
        this.noButtonLocator = By.id('solvedcancel');
    }

    clickYes() {
        return this.driver.findElement(this.yesButtonLocator)
            .then((b) => b.click())
            //    .then(() => this.waitForClose(true)) - doesnt close anymore on Yes
            .then(() => this.page.getNewGameModal());
    }

    clickNo() {
        return this.driver.findElement(this.noButtonLocator)
            .then((b) => b.click())
            .then(() => this.waitForClose());
    }
}

function Tiles(tiles) {
    return tiles.reduce((accu, tile) => {
        (accu[tile.y] || (accu[tile.y] = []))[tile.x] = tile.val;
        return accu;
    }, []);
}

module.exports = GamePage;