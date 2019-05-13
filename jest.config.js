module.exports = {
    'bail': 1,
    'verbose': false,
    'setupFilesAfterEnv': ['<rootDir>test/enzyme.config.js'],
    'roots': ['<rootDir>/test/', '<rootDir>/src'],
    'testMatch': ['<rootDir>/test/app/**/*.test.js'],
    'modulePaths': ['<rootDir>/src'],
    'collectCoverageFrom': ['src/**/*.{js,jsx}'],
    'coverageDirectory': '<rootDir>/test-results/coverage',
};