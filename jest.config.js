module.exports = {
    'verbose': true,
    'setupFilesAfterEnv': [
        '<rootDir>test/enzyme.config.js'
    ],
    'collectCoverageFrom': [
        'src/**/*.{js,jsx}'
    ],
    'roots': [
        '<rootDir>/test'
    ]
};