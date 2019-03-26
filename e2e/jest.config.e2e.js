// in dev mode - default port is webpack default and log level is info. 
const [defaultPort, logThreshold] =
    process.env.NPUZZLE_E2E_MODE === 'dev' ? [3000, 'INFO'] : [5000, 'ALL'];

module.exports = {
    'bail': 1,
    'verbose': true,
    'testMatch': ['**/*.script.js'],
    'testEnvironment': 'node',
    'transform': {}, // disable babel as we want to use newest node
    'globals': {
        '__E2E_CONFIG__': {
            'url': process.env.NPUZZLE_E2E_URL || `http://localhost:${defaultPort}`,
            logThreshold,
            'screenshotsDir': './test-results/screenshots'
        }
    }
};