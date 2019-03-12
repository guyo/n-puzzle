module.exports = {
    'bail': 1,
    'verbose': true,
    'testMatch': ['**/*.script.js'],
    'testEnvironment': 'node',
    'transform': {},
    'globals': {
        '__E2E_CONFIG__': {
            'url': 'http://localhost:5000/',
            'logThreshold': 'ALL',
            'screenshotsDir': './test-results/screenshots'
        }
    }
};