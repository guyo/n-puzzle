module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "jest": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
            //"experimentalObjectRestSpread": true
            // "ecmaVersion": 6,
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": ["off", 4],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error","single"],
        "semi": ["error","always"],
        "eqeqeq": ["error","always"],
        "no-template-curly-in-string": "warn",
        "for-direction": "error",
        "consistent-return": "error",
        "default-case": "error",
        "no-fallthrough":"warn",
        "no-alert":"error",
        "no-empty-function" : "error",
        "react/jsx-uses-vars": "error",
        "react/prop-types": [
            "error",
            { "skipUndeclared": true }
        ],
        
    
    }
};