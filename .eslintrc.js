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
            // "ecmaVersion": 6,
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-hooks"
    ],
    "settings": {
        "react": {
            "version":"detect"
        }
    },
    "rules": {
        "indent": ["warn", 4],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "no-var": "error",
        "eqeqeq": ["error", "always"],
        "no-eq-null":"error",
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
        "dot-location": ["warn", "property"],
        "no-multiple-empty-lines": [
            "warn", {
                "max": 2,
                "maxBOF": 0
            }],
        "arrow-spacing": "warn",
        "no-multi-spaces": ["warn", { "ignoreEOLComments": true }],
        "no-trailing-spaces": ["warn", { "ignoreComments": true }],
        "no-unused-vars" : ["error", { "varsIgnorePattern": "^_$"} ],
        "no-dupe-else-if":"warn",
        "no-return-await":"warn",
        "react/jsx-uses-vars": "error",
        "react/jsx-wrap-multilines": "error",
        "react/prop-types": [
            "error",
            { "skipUndeclared": true }
        ],
        "react/jsx-indent": ["warn", 4],
        "react/jsx-indent-props": "warn",
        "react/jsx-tag-spacing": ["warn", {
            "closingSlash": "never",
            "beforeSelfClosing": "allow",
            "afterOpening": "never",
            "beforeClosing": "allow"
        }],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "react/jsx-no-useless-fragment":"error",
    }
};
