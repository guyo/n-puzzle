module.exports = {
    'bail': 1,
    'verbose': false,
    'setupFilesAfterEnv': ['<rootDir>test/enzyme.config.js'],
    'roots': ['<rootDir>/test/', '<rootDir>/src'],
    'testMatch': ['<rootDir>/test/app/**/*.test.js'],
    'modulePaths': ['<rootDir>/src'],
    'collectCoverageFrom': ['src/**/*.{js,jsx}'],
    'coverageDirectory': '<rootDir>/test-results/coverage',
    'moduleNameMapper': {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/mockModule.js',
        '\\.(css|scss)$': '<rootDir>/test/mockModule.js'
    }
};