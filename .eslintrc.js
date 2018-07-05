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
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "no-var": "error",
        "eqeqeq": ["error", "always"],
        "prefer-const": "error",
        "no-template-curly-in-string": "warn",
        "for-direction": "error",
        "consistent-return": "error",
        "default-case": "error",
        "no-fallthrough": "warn",
        "no-alert": "error",
        "no-empty-function": "error",
        "no-return-assign": "error",
        "prefer-template": "warn",
        "no-multiple-empty-lines":[
            "warn", {
                "max":2,
                "maxBOF":0
            }],
        "arrow-spacing": "error",
        "no-multi-spaces": ["error", {"ignoreEOLComments": true}],
        "no-trailing-spaces":["error", {"ignoreComments": true}],

        "react/jsx-uses-vars": "error",
        "react/jsx-wrap-multilines": "error",
        "react/prop-types": [
            "error",
            { "skipUndeclared": true }
        ],


    }
};